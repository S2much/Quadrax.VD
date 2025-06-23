import { useState } from 'react';
import { Brain, Zap, Play, Pause, Settings, Download, Upload, BarChart3, Clock, CheckCircle, AlertCircle, Star, Users, Terminal as TerminalIcon, Code, Plus, Gauge, Cpu, Monitor, Volume2, VolumeX, RotateCcw, Power, Sliders, Target, Activity, TrendingUp, Eye, EyeOff, Maximize2, Minimize2, Layers, Shield, Save, X, Sparkles, Zap as Lightning, Trash2, Wrench, Cog } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

interface QMLDevice {
  id: string;
  name: string;
  type: 'compact' | 'standard' | 'complex';
  status: 'active' | 'idle' | 'processing' | 'error';
  accuracy: number;
  uptime: number;
  requests: number;
  description: string;
  detailedDescription: string;
  controls: any;
  isOn: boolean;
  isMaximized: boolean;
}

function Models() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'usage'>('overview');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);
  const [showDeveloperTools, setShowDeveloperTools] = useState(false);
  const [activeQML, setActiveQML] = useState<string | null>(null);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [pendingQML, setPendingQML] = useState<string | null>(null);

  // QML Device States
  const [qmlDevices, setQmlDevices] = useState<QMLDevice[]>([
    {
      id: 'qml-compact-001',
      name: 'Sentiment Analyzer Pro',
      type: 'compact',
      status: 'active',
      accuracy: 96.8,
      uptime: 99.2,
      requests: 15420,
      description: 'Real-time sentiment analysis for customer feedback',
      detailedDescription: 'Advanced sentiment analysis QML device featuring real-time emotion detection, multi-language support, and contextual understanding. Perfect for customer service automation, social media monitoring, and feedback analysis. Built with transformer-based architecture for superior accuracy and lightning-fast processing speeds.',
      controls: {
        threshold: 0.85,
        batchSize: 32,
        autoScale: true,
        volume: 75
      },
      isOn: false,
      isMaximized: false
    },
    {
      id: 'qml-standard-002',
      name: 'Fraud Detection Engine',
      type: 'standard',
      status: 'processing',
      accuracy: 94.2,
      uptime: 97.8,
      requests: 8750,
      description: 'Advanced fraud detection with real-time monitoring',
      detailedDescription: 'Enterprise-grade fraud detection QML with advanced pattern recognition, anomaly detection, and risk assessment capabilities. Features real-time transaction monitoring, behavioral analysis, and adaptive learning algorithms that improve over time. Includes comprehensive dashboard with customizable alerts and detailed reporting.',
      controls: {
        sensitivity: 0.92,
        alertThreshold: 0.7,
        monitoringEnabled: true,
        processingSpeed: 'high',
        riskLevel: 'medium'
      },
      isOn: false,
      isMaximized: false
    },
    {
      id: 'qml-complex-003',
      name: 'Multi-Modal AI Assistant',
      type: 'complex',
      status: 'idle',
      accuracy: 98.1,
      uptime: 99.9,
      requests: 32100,
      description: 'Advanced AI system with vision, language, and reasoning',
      detailedDescription: 'State-of-the-art multi-modal AI QML combining computer vision, natural language processing, and advanced reasoning capabilities. Supports text, image, audio, and video inputs with sophisticated decision-making algorithms and contextual understanding. Features extensive customization options and enterprise-grade security.',
      controls: {
        visionEnabled: true,
        languageModel: 'advanced',
        reasoningDepth: 5,
        creativityLevel: 0.7,
        safetyFilter: true,
        multiModal: true,
        contextWindow: 32000,
        temperature: 0.3
      },
      isOn: false,
      isMaximized: false
    }
  ]);

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const updateDeviceControl = (deviceId: string, control: string, value: any) => {
    setQmlDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { ...device, controls: { ...device.controls, [control]: value } }
        : device
    ));
  };

  const toggleDevicePower = (deviceId: string) => {
    const device = qmlDevices.find(d => d.id === deviceId);
    if (!device) return;

    // If turning on and another QML is active, show confirmation
    if (!device.isOn && activeQML && activeQML !== deviceId) {
      setPendingQML(deviceId);
      setShowSaveConfirm(true);
      return;
    }

    setQmlDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            isOn: !device.isOn,
            isMaximized: !device.isOn ? true : false // Auto-maximize when turning on
          }
        : device
    ));

    if (!device.isOn) {
      setActiveQML(deviceId);
      setShowDeveloperTools(false);
    } else {
      setActiveQML(null);
      setShowDeveloperTools(false);
    }
  };

  const handleTrainClick = (deviceId: string) => {
    if (activeQML === deviceId) {
      setShowDeveloperTools(true);
    }
  };

  const handleTuneClick = (deviceId: string) => {
    if (activeQML === deviceId) {
      setShowDeveloperTools(true);
    }
  };

  const handleDeployClick = (deviceId: string) => {
    // Simulate deployment
    console.log(`Deploying QML device: ${deviceId}`);
  };

  const handleDeleteClick = (deviceId: string) => {
    setQmlDevices(prev => prev.filter(device => device.id !== deviceId));
    if (activeQML === deviceId) {
      setActiveQML(null);
      setShowDeveloperTools(false);
    }
  };

  const handleSaveAndSwitch = () => {
    if (pendingQML) {
      // Turn off current QML
      setQmlDevices(prev => prev.map(device => 
        device.id === activeQML 
          ? { ...device, isOn: false, isMaximized: false }
          : device.id === pendingQML
          ? { ...device, isOn: true, isMaximized: true }
          : device
      ));
      setActiveQML(pendingQML);
      setShowDeveloperTools(false);
    }
    setShowSaveConfirm(false);
    setPendingQML(null);
  };

  const handleDontSaveAndSwitch = () => {
    if (pendingQML) {
      // Turn off current QML without saving
      setQmlDevices(prev => prev.map(device => 
        device.id === activeQML 
          ? { ...device, isOn: false, isMaximized: false }
          : device.id === pendingQML
          ? { ...device, isOn: true, isMaximized: true }
          : device
      ));
      setActiveQML(pendingQML);
      setShowDeveloperTools(false);
    }
    setShowSaveConfirm(false);
    setPendingQML(null);
  };

  const handleCancelSwitch = () => {
    setShowSaveConfirm(false);
    setPendingQML(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const CompactQMLDevice = ({ device }: { device: QMLDevice }) => (
    <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-2xl border-2 border-[#00699a] shadow-2xl max-w-sm">
      {/* Header Display */}
      <div className="bg-black/50 p-3 rounded-lg mb-4 border border-[#00beef]/30">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-[#00beef]">{device.name}</h3>
          <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`} />
        </div>
        <div className="text-sm text-gray-300">{device.description}</div>
      </div>

      {/* Main Display */}
      <div className="bg-gradient-to-b from-[#00beef]/20 to-black/50 p-4 rounded-lg mb-4 border border-[#00beef]/50">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#00beef] mb-1">{device.accuracy}%</div>
          <div className="text-sm text-gray-300">Accuracy</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-semibold text-white">{device.uptime}%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-white">{device.requests.toLocaleString()}</div>
            <div className="text-gray-400">Requests</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Threshold Slider */}
        <div className="bg-black/30 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Threshold</span>
            <span className="text-sm text-[#00beef]">{device.controls.threshold}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={device.controls.threshold}
            onChange={(e) => updateDeviceControl(device.id, 'threshold', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Volume Control */}
        <div className="bg-black/30 p-3 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Volume</span>
            <div className="flex items-center gap-2">
              <Volume2 size={14} className="text-[#00beef]" />
              <span className="text-sm text-[#00beef]">{device.controls.volume}%</span>
            </div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={device.controls.volume}
            onChange={(e) => updateDeviceControl(device.id, 'volume', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Auto Scale Toggle */}
        <div className="flex items-center justify-between bg-black/30 p-3 rounded-lg">
          <span className="text-sm text-gray-300">Auto Scale</span>
          <button
            onClick={() => updateDeviceControl(device.id, 'autoScale', !device.controls.autoScale)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              device.controls.autoScale ? 'bg-[#00beef]' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                device.controls.autoScale ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const StandardQMLDevice = ({ device }: { device: QMLDevice }) => (
    <div className="bg-gradient-to-b from-black to-[#005778] p-8 rounded-2xl border-2 border-[#00699a] shadow-2xl max-w-lg">
      {/* Header with Status */}
      <div className="bg-black/50 p-4 rounded-lg mb-6 border border-[#00beef]/30">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-[#00beef]">{device.name}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-400' : device.status === 'processing' ? 'bg-yellow-400' : 'bg-gray-400'} animate-pulse`} />
            <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
              {device.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="text-sm text-gray-300">{device.description}</div>
      </div>

      {/* Main Dashboard */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Accuracy Gauge */}
        <div className="bg-gradient-to-b from-[#00beef]/20 to-black/50 p-4 rounded-lg border border-[#00beef]/50">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-2">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="#374151"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  stroke="#00beef"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={`${(device.accuracy / 100) * 188.4} 188.4`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-[#00beef]">{device.accuracy}%</span>
              </div>
            </div>
            <div className="text-sm text-gray-300">Accuracy</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-black/30 p-4 rounded-lg space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Uptime</span>
            <span className="text-sm text-green-400">{device.uptime}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Requests</span>
            <span className="text-sm text-[#00beef]">{device.requests.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-300">Risk Level</span>
            <span className={`text-sm ${device.controls.riskLevel === 'low' ? 'text-green-400' : device.controls.riskLevel === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
              {device.controls.riskLevel.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="space-y-4">
        {/* Processing Speed */}
        <div>
          <label className="block text-sm text-gray-300 mb-2">Processing Speed</label>
          <select
            value={device.controls.processingSpeed}
            onChange={(e) => updateDeviceControl(device.id, 'processingSpeed', e.target.value)}
            className="w-full py-3 px-4 bg-black/50 border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
          >
            <option value="low">Low Speed</option>
            <option value="medium">Medium Speed</option>
            <option value="high">High Speed</option>
          </select>
        </div>

        {/* Sensitivity Control */}
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-300">Sensitivity</span>
            <span className="text-sm text-[#00beef]">{device.controls.sensitivity}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={device.controls.sensitivity}
            onChange={(e) => updateDeviceControl(device.id, 'sensitivity', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Alert Threshold */}
        <div className="bg-black/30 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-gray-300">Alert Threshold</span>
            <span className="text-sm text-[#00beef]">{device.controls.alertThreshold}</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={device.controls.alertThreshold}
            onChange={(e) => updateDeviceControl(device.id, 'alertThreshold', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Monitoring Toggle */}
        <div className="flex items-center justify-between bg-black/30 p-4 rounded-lg">
          <span className="text-sm text-gray-300">Real-time Monitoring</span>
          <button
            onClick={() => updateDeviceControl(device.id, 'monitoringEnabled', !device.controls.monitoringEnabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
              device.controls.monitoringEnabled ? 'bg-[#00beef]' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                device.controls.monitoringEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const ComplexQMLDevice = ({ device }: { device: QMLDevice }) => (
    <div className="bg-gradient-to-b from-black to-[#005778] p-8 rounded-2xl border-2 border-[#00699a] shadow-2xl max-w-2xl">
      {/* Header with Advanced Status */}
      <div className="bg-black/50 p-4 rounded-lg mb-6 border border-[#00beef]/30">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-2xl font-bold text-[#00beef]">{device.name}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${device.status === 'active' ? 'bg-green-400' : 'bg-gray-400'} animate-pulse`} />
              <span className={`text-sm font-medium ${getStatusColor(device.status)}`}>
                {device.status.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-300">
              Context: {device.controls.contextWindow.toLocaleString()} tokens
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-300">{device.description}</div>
      </div>

      {/* Advanced Dashboard */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Performance Metrics */}
        <div className="bg-gradient-to-b from-[#00beef]/20 to-black/50 p-4 rounded-lg border border-[#00beef]/50">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#00beef] mb-1">{device.accuracy}%</div>
            <div className="text-sm text-gray-300">Accuracy</div>
            <div className="mt-2 text-xs text-green-400">↑ +2.3% this week</div>
          </div>
        </div>

        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{device.uptime}%</div>
            <div className="text-sm text-gray-300">Uptime</div>
            <div className="mt-2 text-xs text-green-400">99.9% SLA</div>
          </div>
        </div>

        <div className="bg-black/30 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">{(device.requests / 1000).toFixed(1)}K</div>
            <div className="text-sm text-gray-300">Requests</div>
            <div className="mt-2 text-xs text-blue-400">+15% today</div>
          </div>
        </div>
      </div>

      {/* Advanced Control Panel */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Panel - Core Controls */}
        <div className="space-y-4">
          {/* Language Model */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Language Model</label>
            <select
              value={device.controls.languageModel}
              onChange={(e) => updateDeviceControl(device.id, 'languageModel', e.target.value)}
              className="w-full py-3 px-3 bg-black/50 border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef] text-sm"
            >
              <option value="basic">Basic Model</option>
              <option value="advanced">Advanced Model</option>
              <option value="expert">Expert Model</option>
            </select>
          </div>

          {/* Temperature Control */}
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Temperature</span>
              <span className="text-sm text-[#00beef]">{device.controls.temperature}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={device.controls.temperature}
              onChange={(e) => updateDeviceControl(device.id, 'temperature', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Focused</span>
              <span>Creative</span>
            </div>
          </div>

          {/* Creativity Level */}
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Creativity Level</span>
              <span className="text-sm text-[#00beef]">{device.controls.creativityLevel}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={device.controls.creativityLevel}
              onChange={(e) => updateDeviceControl(device.id, 'creativityLevel', parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/* Right Panel - Advanced Features */}
        <div className="space-y-4">
          {/* Feature Toggles */}
          <div className="bg-black/30 p-4 rounded-lg space-y-3">
            <h4 className="text-sm font-semibold text-white mb-3">Advanced Features</h4>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-[#00beef]" />
                <span className="text-sm text-gray-300">Vision Processing</span>
              </div>
              <button
                onClick={() => updateDeviceControl(device.id, 'visionEnabled', !device.controls.visionEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  device.controls.visionEnabled ? 'bg-[#00beef]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    device.controls.visionEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-[#00beef]" />
                <span className="text-sm text-gray-300">Multi-Modal</span>
              </div>
              <button
                onClick={() => updateDeviceControl(device.id, 'multiModal', !device.controls.multiModal)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  device.controls.multiModal ? 'bg-[#00beef]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    device.controls.multiModal ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00beef]" />
                <span className="text-sm text-gray-300">Safety Filter</span>
              </div>
              <button
                onClick={() => updateDeviceControl(device.id, 'safetyFilter', !device.controls.safetyFilter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                  device.controls.safetyFilter ? 'bg-[#00beef]' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    device.controls.safetyFilter ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Context Window */}
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Context Window</span>
              <span className="text-sm text-[#00beef]">{device.controls.contextWindow.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={device.controls.contextWindow}
              onChange={(e) => updateDeviceControl(device.id, 'contextWindow', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1K</span>
              <span>100K</span>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-gradient-to-b from-[#00beef]/10 to-black/50 p-4 rounded-lg border border-[#00beef]/30">
            <h4 className="text-sm font-semibold text-white mb-3">System Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-300">CPU Usage</span>
                <span className="text-green-400">67%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Memory</span>
                <span className="text-yellow-400">82%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">GPU Utilization</span>
                <span className="text-green-400">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Network I/O</span>
                <span className="text-blue-400">1.2 GB/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QMLGridItem = ({ device }: { device: QMLDevice }) => (
    <div 
      className={`relative transition-all duration-300 ${
        device.isOn && device.isMaximized 
          ? 'h-8 bg-gradient-to-r from-black to-[#005778] border border-[#00699a]/50 rounded-lg flex items-center px-3' 
          : 'bg-gradient-to-b from-black to-[#005778] p-4 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] cursor-pointer'
      }`}
      onMouseEnter={() => !device.isOn && setHoveredDevice(device.id)}
      onMouseLeave={() => setHoveredDevice(null)}
    >
      {device.isOn && device.isMaximized ? (
        // Minimized state when QML is active
        <div className="flex justify-between items-center w-full">
          <span className="text-white text-sm font-medium truncate">{device.name}</span>
          <button
            onClick={() => toggleDevicePower(device.id)}
            className="w-6 h-6 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center transition-colors duration-300"
          >
            <Power size={12} />
          </button>
        </div>
      ) : (
        // Normal grid item
        <>
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold truncate flex-1 mr-2">{device.name}</h3>
            <button
              onClick={() => toggleDevicePower(device.id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                device.isOn 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <Power size={16} />
            </button>
          </div>

          {/* Hover Description - Magazine Style */}
          {hoveredDevice === device.id && !device.isOn && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-sm p-6 rounded-lg border border-[#00699a] z-20 shadow-2xl max-w-md">
              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-[#00699a]/30 pb-3">
                  <h4 className="text-xl font-bold text-white mb-1">{device.name}</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(device.status)} bg-black/50`}>
                      {device.status.toUpperCase()}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 capitalize">{device.type} QML</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed">{device.detailedDescription}</p>

                {/* Demo Display */}
                <div className="bg-gradient-to-b from-[#00beef]/10 to-black/50 p-4 rounded-lg border border-[#00beef]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain size={20} className="text-[#00beef]" />
                    <span className="text-white font-medium">Live Demo</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#00beef]">{device.accuracy}%</div>
                      <div className="text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{device.uptime}%</div>
                      <div className="text-gray-400">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-400">{(device.requests / 1000).toFixed(1)}K</div>
                      <div className="text-gray-400">Requests</div>
                    </div>
                  </div>
                  
                  {/* Mini Interface Preview */}
                  <div className="mt-3 p-2 bg-black/50 rounded border border-[#00699a]/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300">Interface Preview</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-gray-400">Type:</span>
                    <span className="text-purple-400 ml-1 capitalize">{device.type}</span>
                  </div>
                  <div className="bg-black/30 p-2 rounded">
                    <span className="text-gray-400">Status:</span>
                    <span className={`ml-1 ${getStatusColor(device.status)}`}>{device.status}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDevicePower(device.id);
                    }}
                    className="flex-1 px-3 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded transition-colors duration-300 flex items-center justify-center gap-1"
                  >
                    <Power size={14} />
                    Activate QML
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );

  const DeveloperTools = () => (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-gradient-to-b from-black to-[#005778] border-l border-[#00699a] shadow-2xl z-40 overflow-y-auto">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Developer Tools</h3>
          <button
            onClick={() => setShowDeveloperTools(false)}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Training Configuration */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Training Configuration</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Learning Rate</label>
                <input
                  type="range"
                  min="0.001"
                  max="0.1"
                  step="0.001"
                  defaultValue="0.01"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-400 mt-1">0.01</div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Batch Size</label>
                <select className="w-full px-3 py-2 bg-black border border-[#00699a] text-white rounded focus:outline-none focus:border-[#00beef]">
                  <option value="16">16</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value="128">128</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Epochs</label>
                <input
                  type="number"
                  defaultValue="100"
                  className="w-full px-3 py-2 bg-black border border-[#00699a] text-white rounded focus:outline-none focus:border-[#00beef]"
                />
              </div>
            </div>
          </div>

          {/* Training Progress */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Training Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Epoch 45/100</span>
                <span className="text-[#00beef]">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full w-[45%]" />
              </div>
              <div className="text-xs text-gray-400">
                Loss: 0.234 | Accuracy: 94.7%
              </div>
            </div>
          </div>

          {/* Model Metrics */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Model Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Validation Accuracy</span>
                <span className="text-green-400">96.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Training Loss</span>
                <span className="text-yellow-400">0.234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">F1 Score</span>
                <span className="text-blue-400">0.947</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Inference Time</span>
                <span className="text-purple-400">12ms</span>
              </div>
            </div>
          </div>

          {/* Hyperparameter Tuning */}
          <div className="bg-black/30 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-3">Hyperparameter Tuning</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-300 mb-1">Dropout Rate</label>
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.05"
                  defaultValue="0.2"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-400 mt-1">0.2</div>
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-1">Weight Decay</label>
                <input
                  type="range"
                  min="0"
                  max="0.01"
                  step="0.001"
                  defaultValue="0.005"
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-xs text-gray-400 mt-1">0.005</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <Play size={16} />
              Start Training
            </button>
            <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <Pause size={16} />
              Pause Training
            </button>
            <button className="w-full py-2 bg-[#00beef] hover:bg-[#00699a] text-black rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <Save size={16} />
              Save Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Component Content */}
      <section className="p-6 min-h-screen">
        <div className="text-white mb-6">
          <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
            QUADRAX•ML Virtual Devices
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        {/* Action Bar */}
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Upload size={16} />
              Deploy QML
            </button>
            <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Brain size={16} />
              Create New
            </button>
            
            {/* Development Tools */}
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-4 py-2 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Code size={16} />
              Open Editor
            </button>
            <button 
              onClick={() => openTerminal('bash')}
              className="px-4 py-2 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <TerminalIcon size={16} />
              Open Terminal
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                activeTab === 'overview' ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                activeTab === 'performance' ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
              }`}
            >
              Performance
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                activeTab === 'usage' ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
              }`}
            >
              Usage
            </button>
          </div>
        </div>

        {/* QML Grid View */}
        <div className={`bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6 transition-all duration-300 ${
          qmlDevices.some(device => device.isOn && device.isMaximized) ? 'h-auto' : ''
        }`}>
          <h3 className="text-2xl font-bold text-white mb-6">QML Devices</h3>
          <div className={`grid gap-4 transition-all duration-300 ${
            qmlDevices.some(device => device.isOn && device.isMaximized) 
              ? 'grid-cols-1' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {qmlDevices.map((device) => (
              <QMLGridItem key={device.id} device={device} />
            ))}
          </div>
        </div>

        {/* Detached Maximized QML Device */}
        {qmlDevices.some(device => device.isOn && device.isMaximized) && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30 p-4">
            {qmlDevices
              .filter(device => device.isOn && device.isMaximized)
              .map((device) => (
                <div key={device.id} className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                  {/* Action Buttons - Left Side */}
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 space-y-3 z-10">
                    <button
                      onClick={() => handleTrainClick(device.id)}
                      className="w-12 h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg"
                      title="Train"
                    >
                      <Brain size={20} />
                    </button>
                    <button
                      onClick={() => handleTuneClick(device.id)}
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg"
                      title="Tune"
                    >
                      <Wrench size={20} />
                    </button>
                    <button
                      onClick={() => handleDeployClick(device.id)}
                      className="w-12 h-12 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg"
                      title="Deploy"
                    >
                      <Upload size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(device.id)}
                      className="w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center shadow-lg"
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => toggleDevicePower(device.id)}
                    className="absolute -top-4 -right-4 w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center z-10 shadow-lg"
                  >
                    <X size={20} />
                  </button>

                  {/* QML Device */}
                  <div className="flex justify-center">
                    {device.type === 'compact' && <CompactQMLDevice device={device} />}
                    {device.type === 'standard' && <StandardQMLDevice device={device} />}
                    {device.type === 'complex' && <ComplexQMLDevice device={device} />}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Device Information */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">QML Device Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Monitor size={20} className="text-[#00beef]" />
                Compact QML
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Streamlined interface for single-purpose AI tasks. Perfect for focused applications with simple controls.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Single main display</li>
                <li>• Essential controls only</li>
                <li>• Power and threshold sliders</li>
                <li>• Auto-scaling toggle</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Gauge size={20} className="text-[#00beef]" />
                Standard QML
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Balanced interface with comprehensive monitoring and control capabilities for professional applications.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Performance dashboard</li>
                <li>• Advanced controls</li>
                <li>• Real-time monitoring</li>
                <li>• Risk level indicators</li>
              </ul>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-6 rounded-lg border border-[#00699a]">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Cpu size={20} className="text-[#00beef]" />
                Complex QML
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Enterprise-grade interface with extensive customization and multi-modal AI capabilities.
              </p>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Multi-panel dashboard</li>
                <li>• Advanced AI features</li>
                <li>• System monitoring</li>
                <li>• Extensive customization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Tools Sidebar */}
      {showDeveloperTools && activeQML && <DeveloperTools />}

      {/* Save Confirmation Modal */}
      {showSaveConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a] max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Save Current QML State?</h3>
            <p className="text-gray-300 mb-6">
              Another QML is currently active. Do you want to save the current state before switching?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSaveAndSwitch}
                className="flex-1 px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300"
              >
                Save & Switch
              </button>
              <button
                onClick={handleDontSaveAndSwitch}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
              >
                Don't Save
              </button>
              <button
                onClick={handleCancelSwitch}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="models"
          workingDirectory="/models"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/models"
          context="models"
        />
      )}

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #00beef;
          cursor: pointer;
          border: 2px solid #00699a;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #00beef;
          cursor: pointer;
          border: 2px solid #00699a;
        }
      `}</style>
    </>
  );
}

export default Models;