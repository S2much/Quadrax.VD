import React, { useState } from 'react';
import { Maximize2, Minimize2, Power, Info, Play, Share2, BarChart3, Clock, User, Settings, HelpCircle, Cpu, Database, Brain, Zap, Activity, Monitor } from 'lucide-react';

interface DeviceInterfaceProps {
  name: string;
  variant: 'alpha' | 'beta' | 'gamma';
  isOn: boolean;
  details?: React.ReactNode;
  topRightButton?: React.ReactNode;
  children: React.ReactNode;
  onDeviceClick?: () => void;
}

const DeviceInterface: React.FC<DeviceInterfaceProps> = ({
  name,
  variant,
  isOn,
  details,
  topRightButton,
  children,
  onDeviceClick
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const getVariantStyles = () => {
    switch (variant) {
      case 'alpha':
        return {
          container: 'w-80 h-96',
          border: 'border-cyan-400',
          glow: 'shadow-cyan-500/30',
          accent: 'text-cyan-300',
          bg: 'from-slate-900 via-cyan-900/20 to-slate-900',
          buttonGrid: 'grid-cols-3 gap-3'
        };
      case 'beta':
        return {
          container: 'w-96 h-[28rem]',
          border: 'border-blue-400',
          glow: 'shadow-blue-500/30',
          accent: 'text-blue-300',
          bg: 'from-slate-900 via-blue-900/20 to-slate-900',
          buttonGrid: 'grid-cols-3 gap-4'
        };
      case 'gamma':
        return {
          container: 'w-[28rem] h-[32rem]',
          border: 'border-purple-400',
          glow: 'shadow-purple-500/30',
          accent: 'text-purple-300',
          bg: 'from-slate-900 via-purple-900/20 to-slate-900',
          buttonGrid: 'grid-cols-3 gap-4'
        };
      default:
        return {
          container: 'w-80 h-96',
          border: 'border-gray-400',
          glow: 'shadow-gray-500/20',
          accent: 'text-gray-300',
          bg: 'from-slate-900 via-gray-900/20 to-slate-900',
          buttonGrid: 'grid-cols-3 gap-3'
        };
    }
  };

  const styles = getVariantStyles();

  const getDeviceIcons = () => {
    switch (variant) {
      case 'alpha':
        return [
          { icon: Play, label: 'Execute' },
          { icon: Share2, label: 'Share' },
          { icon: BarChart3, label: 'Analytics' },
          { icon: Clock, label: 'Schedule' },
          { icon: Database, label: 'Data' },
          { icon: Info, label: 'Info' },
          { icon: User, label: 'Profile' },
          { icon: Settings, label: 'Settings' },
          { icon: HelpCircle, label: 'Help' }
        ];
      case 'beta':
        return [
          { icon: Brain, label: 'AI Core' },
          { icon: Zap, label: 'Process' },
          { icon: Activity, label: 'Monitor' },
          { icon: Database, label: 'Storage' },
          { icon: BarChart3, label: 'Metrics' },
          { icon: Share2, label: 'Export' },
          { icon: Cpu, label: 'Compute' },
          { icon: Settings, label: 'Config' },
          { icon: Info, label: 'Status' }
        ];
      case 'gamma':
        return [
          { icon: Brain, label: 'Neural' },
          { icon: Monitor, label: 'Vision' },
          { icon: Activity, label: 'Pulse' },
          { icon: Zap, label: 'Quantum' },
          { icon: Database, label: 'Memory' },
          { icon: BarChart3, label: 'Analysis' },
          { icon: Cpu, label: 'Matrix' },
          { icon: Share2, label: 'Network' },
          { icon: Settings, label: 'Core' }
        ];
      default:
        return [];
    }
  };

  const deviceIcons = getDeviceIcons();

  const handleDeviceClick = () => {
    if (onDeviceClick) {
      onDeviceClick();
    }
  };

  return (
    <div className="relative">
      <div id="device-case"
        className={`
          ${isMaximized ? 'm-0' : styles.container}
          bg-gradient-to-br ${styles.bg}
          ${styles.border} border-2 rounded-2xl
          ${isOn ? styles.glow + ' shadow-2xl' : 'shadow-lg'}
          transition-all duration-500 ease-in-out
          cursor-pointer
          backdrop-blur-sm
        `}
        onClick={handleDeviceClick}
      >
        {/* Device Header - Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 backdrop-blur-sm rounded-t-2xl flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="text-white text-sm font-mono">
              {new Date().toLocaleDateString('en-GB', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
              }).toUpperCase()} {new Date().toLocaleTimeString('en-GB', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isOn ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className={`p-1 ${styles.accent} hover:text-white transition-colors duration-300`}
              title="Device Info"
            >
              <Info size={14} />
            </button>
          </div>
        </div>

        {/* Notification Area */}
        <div className="absolute top-12 left-4 right-4 mt-2">
          <div className="bg-teal-600/80 backdrop-blur-sm rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-white text-sm">
              <div className="w-2 h-2 bg-white rounded-full" />
              <span>1 New notification</span>
            </div>
            <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
              <Clock size={12} />
              <span>Free 30 day subscription active!</span>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="absolute top-32 left-4 right-4">
          <div className="text-center text-white mb-4">
            <h3 className="text-lg font-semibold mb-2">Welcome! How can I assist you today?</h3>
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Write a message..." 
                className="flex-1 bg-transparent text-white placeholder-white/60 text-sm outline-none px-2"
                onClick={(e) => e.stopPropagation()}
              />
              <button className="text-white/80 hover:text-white">
                <Play size={16} className="rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Device Interface Grid */}
        <div className="relative self-center">
          <div className={`grid ${styles.buttonGrid}`}>
            {deviceIcons.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={index}
                  className="w-12 h-12 bg-teal-600/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-teal-500/70 transition-all duration-300 hover:scale-105"
                  title={item.label}
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconComponent size={25} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Top Right Button */}
        {topRightButton && (
          <div className="absolute top-2 right-2 z-10">
            {topRightButton}
          </div>
        )}

        {/* Main Content Area */}
        <div className="pt-16 pb-24 h-full relative">
          <div className="relative z-10 h-full p-4">
            {children}
          </div>
        </div>

        {/* Device Name Badge */}
        <div className="absolute bottom-2 left-2">
          <span className={`text-xs font-mono ${styles.accent} opacity-60 bg-black/30 px-2 py-1 rounded`}>
            QML-{variant.toUpperCase()}
          </span>
        </div>

        {/* Power Effect */}
        {isOn && (
          <div className="absolute inset-0 pointer-events-none rounded-2xl">
            <div className={`absolute inset-0 ${styles.border.replace('border-', 'bg-').replace('-400', '-400/5')} animate-pulse rounded-2xl`} />
          </div>
        )}

        {/* Subtle Circuit Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.5" fill="none"/>
                <circle cx="10" cy="10" r="1" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Details Panel */}
      {showDetails && details && (
        <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-black/90 backdrop-blur-sm border border-gray-600 rounded-lg p-4 z-50">
          <div className="text-white text-sm">
            {details}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceInterface;
