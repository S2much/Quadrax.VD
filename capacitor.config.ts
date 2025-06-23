import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.quadrax.ml',
  appName: 'QUADRAX•ML',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#00beef",
      showSpinner: true,
      spinnerColor: "#000000"
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: "#00beef"
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;