import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNavigation, NavTab } from './components/BottomNavigation';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { RouteFinderScreen } from './components/screens/RouteFinderScreen';
import { TerminalsScreen } from './components/screens/TerminalsScreen';
import { AssistedNavigationScreen } from './components/screens/AssistedNavigationScreen';
import { SavedRoutesScreen } from './components/screens/SavedRoutesScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { AdminDashboardScreen } from './components/screens/AdminDashboardScreen';
import { RouteDetailsModal } from './components/RouteDetailsModal';
import { TerminalDetailsModal } from './components/TerminalDetailsModal';
import { AndroidProjectGuideModal } from './components/AndroidProjectGuideModal';
import { OfficialDeploymentModal } from './components/OfficialDeploymentModal';
import { User, Route, Terminal, SavedRoute } from './types';
import {
  getCurrentUser,
  signOut,
} from './services/authService';
import {
  getTerminals,
  getRoutes,
  getSavedRoutes,
} from './services/dbService';
import { Wifi, BatteryMedium, SignalHigh } from 'lucide-react';
import { supabase } from './services/supabaseClient';

export default function App() {
  // Session & User State
  const [currentUser, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (e) {
        console.error('Auth init error:', e);
      } finally {
        setIsInitializing(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const user = await getCurrentUser();
        setUser(user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);

  const [finderOrigin, setFinderOrigin] = useState('');
  const [finderDestination, setFinderDestination] = useState('');

  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isDeploymentModalOpen, setIsDeploymentModalOpen] = useState(false);

  const [isMobileFrame, setIsMobileFrame] = useState(true);

  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>([]);

  const refreshSavedRoutes = async () => {
    if (currentUser && currentUser.id) {
      try {
        const data = await getSavedRoutes(currentUser.id);
        setSavedRoutes(data);
      } catch (e) {
        console.error('Error fetching saved routes:', e);
        setSavedRoutes([]);
      }
    } else {
      setSavedRoutes([]);
    }
  };

  const refreshAllData = async () => {
    try {
      const t = await getTerminals();
      const r = await getRoutes();
      setTerminals(t);
      setRoutes(r);
      await refreshSavedRoutes();
    } catch (e) {
      console.error('Error refreshing app data:', e);
    }
  };

  useEffect(() => {
    refreshAllData();
  }, [currentUser]);

  const handleLoginSuccess = (user: User) => {
    setUser(user);
    setActiveTab('home');
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setAuthView('login');
  };

  const handleQuickSearchFromHome = (origin: string, destination: string) => {
    setFinderOrigin(origin);
    setFinderDestination(destination);
    setActiveTab('finder');
  };

  const handleTabChange = (tab: NavTab) => {
    setIsAdminConsoleOpen(false);
    setActiveTab(tab);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-3">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {authView === 'login' ? (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onNavigateRegister={() => setAuthView('register')}
            />
          ) : (
            <RegisterScreen
              onRegisterSuccess={handleLoginSuccess}
              onNavigateLogin={() => setAuthView('login')}
            />
          )}
        </div>
      </div>
    );
  }

  const renderScreenContent = () => {
    if (isAdminConsoleOpen && currentUser.role === 'ADMIN') {
      return (
        <AdminDashboardScreen
          terminals={terminals}
          routes={routes}
          onDataChanged={refreshAllData}
          onBack={() => setIsAdminConsoleOpen(false)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen
            currentUser={currentUser}
            onNavigateTab={handleTabChange}
            onQuickSearch={handleQuickSearchFromHome}
            savedRoutes={savedRoutes}
            routes={routes}
            onSelectRoute={setSelectedRoute}
          />
        );
      case 'finder':
        return (
          <RouteFinderScreen
            currentUser={currentUser}
            routes={routes}
            initialOrigin={finderOrigin}
            initialDestination={finderDestination}
            onSelectRoute={setSelectedRoute}
            onRouteSavedChange={refreshSavedRoutes}
          />
        );
      case 'terminals':
        return (
          <TerminalsScreen
            terminals={terminals}
            routes={routes}
            onSelectTerminal={setSelectedTerminal}
          />
        );
      case 'assistant':
        return <AssistedNavigationScreen />;
      case 'saved':
        return (
          <SavedRoutesScreen
            currentUser={currentUser}
            savedRoutes={savedRoutes}
            onSelectRoute={setSelectedRoute}
            onRoutesChanged={refreshSavedRoutes}
            onNavigateFinder={() => handleTabChange('finder')}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            currentUser={currentUser}
            onLogout={handleLogout}
            onOpenAdminDashboard={() => setIsAdminConsoleOpen(true)}
            onOpenAndroidGuide={() => setIsGuideModalOpen(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col antialiased text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar
        currentUser={currentUser}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        onOpenProjectGuide={() => setIsGuideModalOpen(true)}
        onOpenDeploymentHub={() => setIsDeploymentModalOpen(true)}
        onNavigateToProfile={() => {
          setIsAdminConsoleOpen(false);
          setActiveTab('profile');
        }}
      />

      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6">
        {isMobileFrame ? (
          <div className="w-full max-w-[430px] h-[860px] max-h-[calc(100vh-80px)] bg-slate-900 rounded-[44px] p-2.5 shadow-2xl ring-1 ring-slate-800 flex flex-col relative transition-all">
            <div className="h-6 w-full flex items-center justify-between px-6 text-white text-[11px] font-medium shrink-0 select-none">
              <span>9:41</span>
              <div className="w-20 h-4 bg-black rounded-full mx-auto -mt-1 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900/90 ml-auto mr-1.5" />
              </div>
              <div className="flex items-center gap-1.5">
                <SignalHigh className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 bg-slate-50 rounded-[34px] overflow-hidden flex flex-col shadow-inner relative">
              <div className="flex-1 overflow-y-auto px-4 pt-3.5 pb-2">
                {renderScreenContent()}
              </div>

              <BottomNavigation
                activeTab={activeTab}
                onTabChange={handleTabChange}
                savedCount={savedRoutes.length}
              />
            </div>

            <div className="h-4 flex items-center justify-center shrink-0">
              <div className="w-32 h-1 bg-slate-600 rounded-full" />
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col min-h-[750px]">
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {renderScreenContent()}
            </div>
            <BottomNavigation
              activeTab={activeTab}
              onTabChange={handleTabChange}
              savedCount={savedRoutes.length}
            />
          </div>
        )}
      </main>

      <RouteDetailsModal
        route={selectedRoute}
        currentUser={currentUser}
        onClose={() => setSelectedRoute(null)}
        onRouteSavedChange={refreshSavedRoutes}
      />

      <TerminalDetailsModal
        terminal={selectedTerminal}
        routes={routes}
        onClose={() => setSelectedTerminal(null)}
        onSelectRoute={(route) => {
          setSelectedTerminal(null);
          setSelectedRoute(route);
        }}
      />

      <AndroidProjectGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />

      <OfficialDeploymentModal
        isOpen={isDeploymentModalOpen}
        onClose={() => setIsDeploymentModalOpen(false)}
      />
    </div>
  );
}
