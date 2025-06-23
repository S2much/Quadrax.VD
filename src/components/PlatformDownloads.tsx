import { useState, useEffect } from 'react';
import { Download, Smartphone, Monitor, Globe, Package, Shield, Star, Clock, CheckCircle, AlertTriangle, ExternalLink, Zap, Brain, Database, FileCode, Settings, Users } from 'lucide-react';

interface DownloadPackage {
  id: string;
  name: string;
  description: string;
  platform: 'windows' | 'android' | 'web';
  packageType: 'core' | 'expansion';
  version: string;
  size: string;
  features: string[];
  requirements: string[];
  downloadUrl?: string;
  isAvailable: boolean;
  price: 'free' | 'premium' | 'enterprise';
  icon: any;
}

interface PlatformDownloadsProps {
  isOpen: boolean;
  onClose: () => void;
}

function PlatformDownloads({ isOpen, onClose }: PlatformDownloadsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<'windows' | 'android' | 'web'>('windows');
  const [downloadProgress, setDownloadProgress] = useState<{[key: string]: number}>({});
  const [isDownloading, setIsDownloading] = useState<{[key: string]: boolean}>({});

  const packages: DownloadPackage[] = [
    // Windows Packages
    {
      id: 'win-core',
      name: 'QUADRAX•ML Core (Windows)',
      description: 'Essential DataKits and Codesheets functionality for Windows desktop',
      platform: 'windows',
      packageType: 'core',
      version: '1.0.0',
      size: '125 MB',
      features: [
        'DataKits management and processing',
        'Codesheets with Python/R/SQL support',
        'Local data storage and caching',
        'Offline mode capabilities',
        'Basic visualization tools'
      ],
      requirements: [
        'Windows 10 or later (64-bit)',
        '4GB RAM minimum, 8GB recommended',
        '500MB free disk space',
        '.NET Framework 4.8 or later'
      ],
      isAvailable: true,
      price: 'free',
      icon: Monitor
    },
    {
      id: 'win-workshop',
      name: 'Workshop Pro (Windows)',
      description: 'Advanced workstation management with GPU acceleration',
      platform: 'windows',
      packageType: 'expansion',
      version: '1.0.0',
      size: '250 MB',
      features: [
        'GPU-accelerated computing',
        'Container orchestration',
        'Advanced monitoring tools',
        'Team collaboration features',
        'Enterprise integrations'
      ],
      requirements: [
        'QUADRAX•ML Core installed',
        'NVIDIA GPU (GTX 1060 or better)',
        'Docker Desktop',
        '16GB RAM recommended'
      ],
      isAvailable: true,
      price: 'premium',
      icon: Settings
    },
    {
      id: 'win-models',
      name: 'AI Models Suite (Windows)',
      description: 'Pre-trained models and advanced training capabilities',
      platform: 'windows',
      packageType: 'expansion',
      version: '1.0.0',
      size: '500 MB',
      features: [
        'Pre-trained model library',
        'Custom model training',
        'Model optimization tools',
        'Deployment automation',
        'Performance monitoring'
      ],
      requirements: [
        'QUADRAX•ML Core installed',
        'CUDA-compatible GPU',
        '32GB RAM for large models',
        '2GB free disk space'
      ],
      isAvailable: true,
      price: 'premium',
      icon: Brain
    },

    // Android Packages
    {
      id: 'android-core',
      name: 'QUADRAX•ML Mobile (Android)',
      description: 'DataKits and Codesheets for Android devices (No Terminal)',
      platform: 'android',
      packageType: 'core',
      version: '1.0.0',
      size: '85 MB',
      features: [
        'DataKits viewer and basic editing',
        'Codesheets with Python support',
        'Touch-optimized interface',
        'Cloud synchronization',
        'Offline data access'
      ],
      requirements: [
        'Android 8.0 (API level 26) or later',
        '3GB RAM minimum',
        '200MB free storage',
        'Internet connection for sync'
      ],
      isAvailable: true,
      price: 'free',
      icon: Smartphone
    },
    {
      id: 'android-ai',
      name: 'AI Assistant Mobile (Android)',
      description: 'Enhanced AI capabilities for mobile devices',
      platform: 'android',
      packageType: 'expansion',
      version: '1.0.0',
      size: '120 MB',
      features: [
        'Voice commands and interaction',
        'Advanced NLP capabilities',
        'Mobile-optimized AI models',
        'Offline AI processing',
        'Smart notifications'
      ],
      requirements: [
        'QUADRAX•ML Mobile installed',
        'Android 9.0 or later',
        '4GB RAM recommended',
        'Microphone access'
      ],
      isAvailable: true,
      price: 'premium',
      icon: Brain
    },

    // Web Packages (for reference)
    {
      id: 'web-full',
      name: 'QUADRAX•ML Web Platform',
      description: 'Complete web-based platform with all features',
      platform: 'web',
      packageType: 'core',
      version: '1.0.0',
      size: 'Cloud-based',
      features: [
        'All platform features',
        'Workshop management',
        'Manufacturing playground',
        'AI Models deployment',
        'Team collaboration',
        'Enterprise features'
      ],
      requirements: [
        'Modern web browser',
        'Stable internet connection',
        'WebGL support',
        'JavaScript enabled'
      ],
      isAvailable: true,
      price: 'free',
      icon: Globe
    }
  ];

  const handleDownload = async (packageId: string) => {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    setIsDownloading(prev => ({ ...prev, [packageId]: true }));
    setDownloadProgress(prev => ({ ...prev, [packageId]: 0 }));

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const currentProgress = prev[packageId] || 0;
        const newProgress = Math.min(currentProgress + Math.random() * 15, 100);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsDownloading(prevDownloading => ({ ...prevDownloading, [packageId]: false }));
          
          // Generate download URL and trigger download
          const downloadUrl = `https://downloads.quadrax-ml.com/${pkg.platform}/${pkg.name.replace(/\s+/g, '_')}_v${pkg.version}.zip`;
          
          // Create temporary download link
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `${pkg.name.replace(/\s+/g, '_')}_v${pkg.version}.zip`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          alert(`${pkg.name} download started! Check your downloads folder.`);
        }
        
        return { ...prev, [packageId]: newProgress };
      });
    }, 200);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'windows': return Monitor;
      case 'android': return Smartphone;
      case 'web': return Globe;
      default: return Package;
    }
  };

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'free': return 'text-green-400';
      case 'premium': return 'text-yellow-400';
      case 'enterprise': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getPriceLabel = (price: string) => {
    switch (price) {
      case 'free': return 'Free';
      case 'premium': return 'Premium';
      case 'enterprise': return 'Enterprise';
      default: return 'Unknown';
    }
  };

  const filteredPackages = packages.filter(pkg => pkg.platform === selectedPlatform);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-black via-black to-[#005778] rounded-2xl border border-[#00699a] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#00699a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00beef]/20 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-[#00beef]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Platform Downloads</h2>
              <p className="text-gray-300 text-sm">Download QUADRAX•ML for your platform</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#00699a]/20 rounded-lg transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Platform Selector */}
        <div className="p-6 border-b border-[#00699a]/30">
          <div className="flex gap-4">
            {['windows', 'android', 'web'].map((platform) => {
              const PlatformIcon = getPlatformIcon(platform);
              return (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform as any)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
                    selectedPlatform === platform
                      ? 'border-[#00beef] bg-[#00beef]/10 text-[#00beef]'
                      : 'border-[#00699a]/30 hover:border-[#00699a] text-gray-300 hover:text-white'
                  }`}
                >
                  <PlatformIcon size={24} />
                  <span className="font-semibold capitalize">{platform}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {/* Platform Info */}
          <div className="mb-6 p-4 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
            <h3 className="text-lg font-semibold text-white mb-2">
              {selectedPlatform === 'windows' && 'Windows Desktop Application'}
              {selectedPlatform === 'android' && 'Android Mobile Application'}
              {selectedPlatform === 'web' && 'Web Platform (Current)'}
            </h3>
            <p className="text-gray-300 text-sm">
              {selectedPlatform === 'windows' && 'Full-featured desktop application with DataKits and Codesheets. Expansion packs available for Workshop, Models, and Manufacturing features.'}
              {selectedPlatform === 'android' && 'Mobile-optimized version with DataKits and Codesheets support. Terminal functionality is not available on mobile devices.'}
              {selectedPlatform === 'web' && 'Complete web-based platform with all features accessible through your browser. No download required.'}
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPackages.map((pkg) => {
              const IconComponent = pkg.icon;
              const isDownloadingPkg = isDownloading[pkg.id];
              const progress = downloadProgress[pkg.id] || 0;
              
              return (
                <div
                  key={pkg.id}
                  className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-[#00beef]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent size={24} className="text-[#00beef]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-semibold text-white">{pkg.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriceColor(pkg.price)} bg-current/20`}>
                          {getPriceLabel(pkg.price)}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{pkg.description}</p>
                    </div>
                  </div>

                  {/* Package Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-400">Version:</span>
                      <span className="text-[#00beef] ml-2">{pkg.version}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Size:</span>
                      <span className="text-[#00beef] ml-2">{pkg.size}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <h5 className="text-white font-semibold mb-2 text-sm">Features:</h5>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {pkg.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-gray-400">+ {pkg.features.length - 3} more features</li>
                      )}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h5 className="text-white font-semibold mb-2 text-sm">Requirements:</h5>
                    <ul className="text-gray-300 text-xs space-y-1">
                      {pkg.requirements.slice(0, 2).map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <AlertTriangle size={12} className="text-yellow-400 flex-shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Download Progress */}
                  {isDownloadingPkg && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Downloading...</span>
                        <span className="text-[#00beef]">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(pkg.id)}
                    disabled={!pkg.isAvailable || isDownloadingPkg}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.isAvailable && !isDownloadingPkg
                        ? 'bg-[#00beef] hover:bg-[#00699a] text-black'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isDownloadingPkg ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        {pkg.isAvailable ? 'Download' : 'Coming Soon'}
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Platform Limitations */}
          {selectedPlatform === 'android' && (
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-yellow-400" size={20} />
                <h4 className="text-yellow-400 font-semibold">Android Limitations</h4>
              </div>
              <ul className="text-yellow-300 text-sm space-y-1">
                <li>• Terminal functionality is not available on mobile devices</li>
                <li>• Limited to DataKits and Codesheets components only</li>
                <li>• Workshop, Manufacturing, and Models require expansion packs</li>
                <li>• Some advanced features may have reduced functionality</li>
              </ul>
            </div>
          )}

          {/* Expansion Pack Info */}
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="text-blue-400" size={20} />
              <h4 className="text-blue-400 font-semibold">Expansion Packs</h4>
            </div>
            <p className="text-blue-300 text-sm">
              Core downloads include DataKits and Codesheets functionality. Additional features like Workshop management, 
              AI Models, Manufacturing playground, and enterprise tools are available as separate expansion packs.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#00699a] bg-black/30">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              All downloads are free for core functionality. Premium features require expansion packs.
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlatformDownloads;