import { useState, useEffect } from 'react';

interface PlatformInfo {
  isElectron: boolean;
  isAndroid: boolean;
  isWeb: boolean;
  platform: string;
  hasTerminalAccess: boolean;
  supportedFeatures: string[];
}

export function usePlatformDetection(): PlatformInfo {
  const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
    isElectron: false,
    isAndroid: false,
    isWeb: true,
    platform: 'web',
    hasTerminalAccess: true,
    supportedFeatures: ['datakits', 'codesheets', 'workshop', 'manufacturing', 'models', 'ai_assistant']
  });

  useEffect(() => {
    const detectPlatform = () => {
      // Check if running in Electron
      const isElectron = !!(window as any).electronAPI;
      
      // Check if running on Android (Capacitor)
      const isAndroid = !!(window as any).Capacitor && 
                       (window as any).Capacitor.getPlatform() === 'android';
      
      // Determine platform
      let platform = 'web';
      let hasTerminalAccess = true;
      let supportedFeatures = ['datakits', 'codesheets', 'workshop', 'manufacturing', 'models', 'ai_assistant'];

      if (isElectron) {
        platform = 'electron';
        hasTerminalAccess = true;
        // Windows desktop has all features available as expansion packs
        supportedFeatures = ['datakits', 'codesheets'];
      } else if (isAndroid) {
        platform = 'android';
        hasTerminalAccess = false; // No terminal on mobile
        // Android is limited to core features only
        supportedFeatures = ['datakits', 'codesheets'];
      }

      setPlatformInfo({
        isElectron,
        isAndroid,
        isWeb: !isElectron && !isAndroid,
        platform,
        hasTerminalAccess,
        supportedFeatures
      });
    };

    detectPlatform();
  }, []);

  return platformInfo;
}