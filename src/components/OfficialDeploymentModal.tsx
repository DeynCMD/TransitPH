import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Rocket,
  Server,
  FileText,
  PhoneCall,
  CheckCircle2,
  Copy,
  Check,
  Terminal as TerminalIcon,
  ExternalLink,
  ShieldAlert,
  BadgeCheck,
  RefreshCw,
  Cpu
} from 'lucide-react';

interface OfficialDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'deployment' | 'api' | 'fare_matrix' | 'hotlines' | 'privacy';

export const OfficialDeploymentModal: React.FC<OfficialDeploymentModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('deployment');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/health');
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  useEffect(() => {
    if (isOpen && activeTab === 'api') {
      fetchEndpoint(selectedEndpoint);
    }
  }, [isOpen, activeTab, selectedEndpoint]);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const fetchEndpoint = async (endpoint: string) => {
    setIsLoadingApi(true);
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: 'Failed to fetch endpoint', details: err.message }, null, 2));
    } finally {
      setIsLoadingApi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-500/40 flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  TransitPH Official Deployment &amp; Regulatory Hub
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500 text-emerald-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  v1.0.0 Official
                </span>
              </div>
              <p className="text-xs text-emerald-200">
                Production Release Readiness • LTFRB Compliance • REST API Service
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-3 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab('deployment')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'deployment'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Deployment &amp; Build</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'api'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Live REST API</span>
          </button>
          <button
            onClick={() => setActiveTab('fare_matrix')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'fare_matrix'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>LTFRB Fare Matrix 2026</span>
          </button>
          <button
            onClick={() => setActiveTab('hotlines')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'hotlines'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency Hotlines</span>
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-800 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Data Privacy (RA 10173)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
          {/* TAB 1: DEPLOYMENT */}
          {activeTab === 'deployment' && (
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-emerald-950 text-sm">
                    Release Production v1.0.0 Configured &amp; Verified
                  </p>
                  <p className="text-emerald-800 text-xs leading-relaxed">
                    TransitPH is fully configured with production-grade R8 code minification, resource shrinking, network security config, and signed APK/AAB build targets.
                  </p>
                </div>
              </div>

              {/* Build Commands */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-1.5">
                  <TerminalIcon className="w-4 h-4 text-emerald-600" />
                  <span>Production Android Gradle Build Commands</span>
                </h4>
                <div className="space-y-2">
                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-400 font-semibold uppercase">Generate Release APK:</div>
                      <div className="text-xs text-amber-300">./gradlew assembleRelease</div>
                    </div>
                    <button
                      onClick={() => handleCopy('./gradlew assembleRelease', 'apk')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedText === 'apk' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="bg-slate-900 text-slate-100 rounded-xl p-3 font-mono flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-400 font-semibold uppercase">Generate Google Play Bundle (AAB):</div>
                      <div className="text-xs text-amber-300">./gradlew bundleRelease</div>
                    </div>
                    <button
                      onClick={() => handleCopy('./gradlew bundleRelease', 'aab')}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedText === 'aab' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Release Checklist */}
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Pre-Deployment Verification Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>R8 / ProGuard Optimization</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">minifyEnabled true</code> with safe rules for Retrofit, Room, and Model DTOs in <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">proguard-rules.pro</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Network Security Config</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Enforces HTTPS across production endpoints, with explicit emulator/localhost domain whitelisting in <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">network_security_config.xml</code>.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Offline First Persistence</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      SQLite local caching enables full offline navigation, saved route lookups, and phrasebook access even without cellular reception.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Release Version Metadata</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Configured as <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">versionCode 1</code> and <code className="font-mono bg-slate-200 px-1 py-0.5 rounded">versionName "1.0.0"</code> with production application ID.
                    </p>
                  </div>
                </div>
              </div>

              {/* Keystore Signing Guide */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                <h5 className="font-bold text-slate-900">Release Keystore Generation (Standard Android Release)</h5>
                <div className="bg-slate-900 text-slate-100 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                  keytool -genkey -v -keystore transitph-release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias transitph
                </div>
                <p className="text-[11px] text-slate-600">
                  Place the generated <code className="font-mono bg-slate-200 px-1 rounded">transitph-release.jks</code> in <code className="font-mono bg-slate-200 px-1 rounded">/app</code> or configure CI/CD environment secrets for automatic Play Store publishing.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE REST API */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <p className="text-slate-600 mb-3">
                  TransitPH includes a full Node.js Express REST API backend running live on port 3000. Test the active endpoints directly below:
                </p>

                {/* Endpoint selector buttons */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {[
                    '/api/health',
                    '/api/v1/system-status',
                    '/api/v1/fare-matrix',
                    '/api/v1/routes',
                    '/api/v1/terminals',
                    '/api/v1/destinations',
                    '/api/v1/safety/reports',
                    '/api/v1/official-hotlines',
                  ].map((ep) => (
                    <button
                      key={ep}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`px-2.5 py-1 rounded-md font-mono text-[11px] transition-colors ${
                        selectedEndpoint === ep
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {ep}
                    </button>
                  ))}
                </div>

                {/* Endpoint bar */}
                <div className="flex items-center justify-between bg-slate-100 p-2 rounded-lg border border-slate-200 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">GET</span>
                    <span className="font-mono text-xs text-slate-800 font-semibold">{selectedEndpoint}</span>
                  </div>
                  <button
                    onClick={() => fetchEndpoint(selectedEndpoint)}
                    disabled={isLoadingApi}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white hover:bg-slate-50 border border-slate-300 text-xs font-medium text-slate-700 transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingApi ? 'animate-spin text-emerald-600' : ''}`} />
                    <span>Send Request</span>
                  </button>
                </div>

                {/* Response Area */}
                <div className="relative">
                  <pre className="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-[11px] max-h-72 overflow-y-auto leading-relaxed">
                    {isLoadingApi ? '// Fetching data from live backend...' : (apiResponse || '// Click Send Request to inspect response')}
                  </pre>
                  {apiResponse && (
                    <button
                      onClick={() => handleCopy(apiResponse, 'json')}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {copiedText === 'json' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LTFRB FARE MATRIX 2026 */}
          {activeTab === 'fare_matrix' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-950 text-sm">Official LTFRB Region IV-A Fare Schedule (2026)</h4>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Fares computed across all TransitPH routes comply with current Land Transportation Franchising and Regulatory Board (LTFRB) fare tables.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                      <th className="p-2.5">Vehicle Type</th>
                      <th className="p-2.5">Base Fare (First 4 km)</th>
                      <th className="p-2.5">Per Succ. KM</th>
                      <th className="p-2.5 text-emerald-700">Student/PWD/Senior (20% Off)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-semibold text-slate-900">Traditional PUJ (Jeepney)</td>
                      <td className="p-2.5 font-mono">₱13.00</td>
                      <td className="p-2.5 font-mono">₱1.80</td>
                      <td className="p-2.5 font-mono text-emerald-700 font-bold">₱10.40 (Base)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-semibold text-slate-900">Modern PUJ (Class 2 &amp; 3)</td>
                      <td className="p-2.5 font-mono">₱15.00</td>
                      <td className="p-2.5 font-mono">₱2.20</td>
                      <td className="p-2.5 font-mono text-emerald-700 font-bold">₱12.00 (Base)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-semibold text-slate-900">Regular Provincial Bus (Aircon)</td>
                      <td className="p-2.5 font-mono">₱15.00 (5 km)</td>
                      <td className="p-2.5 font-mono">₱2.65</td>
                      <td className="p-2.5 font-mono text-emerald-700 font-bold">₱12.00 (Base)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80">
                      <td className="p-2.5 font-semibold text-slate-900">UV Express Service</td>
                      <td className="p-2.5 font-mono">₱15.00 (2 km)</td>
                      <td className="p-2.5 font-mono">₱2.00</td>
                      <td className="p-2.5 font-mono text-emerald-700 font-bold">₱12.00 (Base)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-[11px] text-slate-500 italic">
                * Note: Students must present a valid school ID. Senior citizens must present their OSCA ID. Persons with Disabilities must present their National PWD ID.
              </div>
            </div>
          )}

          {/* TAB 4: EMERGENCY HOTLINES */}
          {activeTab === 'hotlines' && (
            <div className="space-y-3">
              <p className="text-slate-600">
                Official emergency contact hotlines serving public transport commuters across Laguna, Cavite, Batangas, Rizal, and Quezon:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>LTFRB Central &amp; Region IV-A</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-mono px-1.5 py-0.5 rounded font-bold">1342</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Complaints regarding overcharging, refusal of conveyance, or franchise violations. Direct hotline: (049) 545-0000.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Philippine National Police (PNP)</span>
                    <span className="text-[10px] bg-rose-100 text-rose-800 font-mono px-1.5 py-0.5 rounded font-bold">911 / 117</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Immediate emergency police assistance, commuter robbery reporting, and roadside emergency response.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>RDRRMC CALABARZON (OCD IV-A)</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-mono px-1.5 py-0.5 rounded font-bold">(049) 531-7266</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Typhoon advisories, road landslide closures, and emergency flood warnings along provincial corridors.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <div className="font-bold text-slate-900 flex items-center justify-between">
                    <span>Department of Transportation (DOTr)</span>
                    <span className="text-[10px] bg-purple-100 text-purple-800 font-mono px-1.5 py-0.5 rounded font-bold">7890</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    National commuter hotline for inter-regional bus standards, PITX transfer updates, and transport modernization queries.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: DATA PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Compliance with Republic Act No. 10173 (Data Privacy Act of 2012)</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  TransitPH is committed to protecting the privacy and personal data of all registered commuters. All passenger account details, travel bookmarks, and safety incident reports are processed under the following security standards:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  <li>Passwords are hashed with cryptographic SHA-256 and salted. Plaintext credentials are never stored.</li>
                  <li>Location coordinates are captured solely for route distance calculation and terminal proximity queries. Continuous background tracking is strictly disabled.</li>
                  <li>Saved itineraries are stored in private local SQLite/Room containers on the user's mobile device and are never shared with third-party advertisers.</li>
                  <li>Incident and safety advisories can be submitted anonymously or with commuter consent.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between shrink-0 text-[11px] text-slate-600">
          <span>TransitPH Official System • Republic of the Philippines</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-medium transition-colors"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
