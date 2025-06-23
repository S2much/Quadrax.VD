import React from 'react';
import { usePlatformDetection } from '../hooks/usePlatformDetection';
import { AlertTriangle, Smartphone, Monitor } from 'lucide-react';

interface PlatformWrapperProps {
  children: React.ReactNode;
  requiredFeatures?: string[];
  fallbackComponent?: React.ReactNode;
}

function PlatformWrapper({ children, requiredFeatures = [], fallbackComponent }: PlatformWrapperProps) {
  const platform = usePlatformDetection();

  // Check if all required features are supported
  const hasRequiredFeatures = requiredFeatures.every(feature => 
    platform.supportedFeatures.includes(feature)
  );

  // If features are not supported, show fallback or restriction message
  if (!hasRequiredFeatures) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>;
    }

    const missingFeatures = requiredFeatures.filter(feature => 
      !platform.supportedFeatures.includes(feature)
    );

    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {platform.isAndroid ? (
              <Smartphone className="w-8 h-8 text-yellow-400" />
            ) : (
              <Monitor className="w-8 h-8 text-yellow-400" />
            )}
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Feature Not Available</h3>
          
          <div className="text-gray-300 mb-6">
            <p className="mb-3">
              {platform.isAndroid 
                ? 'This feature is not available in the Android version.'
                : 'This feature requires an expansion pack.'
              }
            </p>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-400" size={16} />
                <span className="text-yellow-400 font-semibold text-sm">Missing Features:</span>
              </div>
              <ul className="text-yellow-300 text-sm space-y-1">
                {missingFeatures.map(feature => (
                  <li key={feature} className="capitalize">• {feature.replace('_', ' ')}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            {platform.isAndroid ? (
              <p className="text-sm text-gray-400">
                Android version includes DataKits and CodeSheets only. 
                Use the web version for full functionality.
              </p>
            ) : (
              <div>
                <p className="text-sm text-gray-400 mb-3">
                  Download expansion packs to unlock additional features.
                </p>
                <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300">
                  Browse Expansion Packs
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default PlatformWrapper;