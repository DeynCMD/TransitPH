import React from 'react';
import { Bus, Smartphone, Monitor, Code2, Rocket, ShieldCheck } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentUser: User | null;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onOpenProjectGuide: () => void;
  onOpenDeploymentHub: () => void;
  onNavigateToProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  isMobileFrame,
  onToggleFrame,
  onOpenProjectGuide,
  onOpenDeploymentHub,
  onNavigateToProfile,
}) => {
  return (
    <header className="bg-emerald-800 text-white shadow-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-inner">
            <Bus className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white leading-none">TransitPH</span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 px-1.5 py-0.5 rounded">
                CALABARZON
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.5 rounded-full uppercase">
                <ShieldCheck className="w-3 h-3" />
                <span>v1.0.0 Official</span>
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 hidden sm:block">
              Official Multi-Modal Transit Navigation &amp; Commuter Safety Network
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Official Deployment & Compliance Hub Trigger */}
          <button
            onClick={onOpenDeploymentHub}
            className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-2.5 py-1.5 rounded-md transition-all shadow-sm hover:shadow"
            title="Open Official Deployment Hub & LTFRB Compliance"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Deployment &amp; Status</span>
            <span className="md:hidden">Release</span>
          </button>

          {/* Android Code Info Badge */}
          <button
            onClick={onOpenProjectGuide}
            className="flex items-center gap-1.5 text-xs font-medium bg-emerald-700 hover:bg-emerald-600 text-emerald-100 px-2.5 py-1.5 rounded-md transition-colors border border-emerald-600/60"
            title="View Native Android Studio Project Info"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden md:inline">Android Studio Source</span>
            <span className="md:hidden">Android</span>
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={onToggleFrame}
            className="flex items-center gap-1.5 text-xs font-medium bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 px-2.5 py-1.5 rounded-md transition-colors border border-emerald-700/60"
            title={isMobileFrame ? 'Switch to responsive view' : 'Switch to mobile app frame'}
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Phone Frame</span>
              </>
            )}
          </button>

          {/* User Profile Pill */}
          {currentUser && (
            <button
              onClick={onNavigateToProfile}
              className="flex items-center gap-2 bg-emerald-900/80 hover:bg-emerald-900 text-white pl-2 pr-3 py-1 rounded-full border border-emerald-600/50 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-emerald-950">
                {currentUser.fullName.charAt(0)}
              </div>
              <div className="text-left hidden sm:block leading-tight">
                <span className="text-xs font-medium block max-w-[100px] truncate">{currentUser.fullName}</span>
                <span className="text-[10px] text-emerald-300 font-bold block">{currentUser.role}</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
