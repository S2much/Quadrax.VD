import { useState } from 'react';
import { Brain, Zap, MapPin, Play, Pause, Settings, Download, Upload, BarChart3, Clock, CheckCircle, AlertCircle, Star, Users, Terminal as TerminalIcon, Code, Plus, Gauge, Cpu, Monitor, Volume2, VolumeX, RotateCcw, Power, Sliders, Target, Activity, TrendingUp, Eye, EyeOff, Maximize2, Minimize2 } from 'lucide-react';
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
  controls: any;
}

function Models() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'usage'>('overview');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

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
      controls: {
        threshold: 0.85,
        batchSize: 32,
        autoScale: true,
        volume: 75
      }
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
      controls: {
        sensitivity: 0.92,
        alertThreshold: 0.7,
        monitoringEnabled: true,
        processingSpeed: 'high',
        riskLevel: 'medium'
      }
    },
    {
      id: 'qml-complex-003',
      name: 'Multi-Modal AI Assistant',
      type: 'complex',
      status: 'idle',
      accuracy: 98.1,
      uptime: 99.9,
      requests: 32100,
      description: 'Advanced AI system with vision, language, and reasoning capabilities',
      controls: {
        visionEnabled: true,
        languageModel: 'advanced',
        reasoningDepth: 5,
        creativityLevel: 0.7,
        safetyFilter: true,
        multiModal: true,
        contextWindow: 32000,
        temperature: 0.3
      }
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

  const toggleDeviceStatus = (deviceId: string) => {
    setQmlDevices(prev => prev.map(device => 
      device.id === deviceId 
        ? { 
            ...device, 
            status: device.status === 'active' ? 'idle' : 'active' as any
          }
        : device
    ));
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
        {/* Power Button */}
        <button
          onClick={() => toggleDeviceStatus(device.id)}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
            device.status === 'active' 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-gray-600 hover:bg-gray-700 text-white'
          }`}
        >
          <Power size={16} />
          {device.status === 'active' ? 'ACTIVE' : 'STANDBY'}
        </button>

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
        {/* Power and Processing Speed */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => toggleDeviceStatus(device.id)}
            className={`py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              device.status === 'active' 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
          >
            <Power size={16} />
            {device.status === 'active' ? 'ACTIVE' : 'STANDBY'}
          </button>
          
          <select
            value={device.controls.processingSpeed}
            onChange={(e) => updateDeviceControl(device.id, 'processingSpeed', e.target.value)}
            className="py-3 px-4 bg-black/50 border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
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
          {/* Power and Language Model */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => toggleDeviceStatus(device.id)}
              className={`py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                device.status === 'active' 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <Power size={16} />
              {device.status === 'active' ? 'ACTIVE' : 'STANDBY'}
            </button>
            
            <select
              value={device.controls.languageModel}
              onChange={(e) => updateDeviceControl(device.id, 'languageModel', e.target.value)}
              className="py-3 px-3 bg-black/50 border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef] text-sm"
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

          {/* Reasoning Depth */}
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-300">Reasoning Depth</span>
              <span className="text-sm text-[#00beef]">{device.controls.reasoningDepth}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={device.controls.reasoningDepth}
              onChange={(e) => updateDeviceControl(device.id, 'reasoningDepth', parseInt(e.target.value))}
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

        {/* CLI Command Examples */}
        <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
          <h5 className="text-white font-semibold mb-3">QML Device CLI Commands</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[#00beef] font-mono">qml deploy {'<device>'}</span>
              <span className="text-gray-300 block">Deploy QML device</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">qml status {'<device>'}</span>
              <span className="text-gray-300 block">Check device status</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">qml control {'<device>'}</span>
              <span className="text-gray-300 block">Access device controls</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">qml monitor {'<device>'}</span>
              <span className="text-gray-300 block">Monitor performance</span>
            </div>
          </div>
        </div>

        {/* QML Devices Showcase */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Active QML Devices</h3>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 justify-items-center">
              {qmlDevices.map((device) => (
                <div key={device.id}>
                  {device.type === 'compact' && <CompactQMLDevice device={device} />}
                  {device.type === 'standard' && <StandardQMLDevice device={device} />}
                  {device.type === 'complex' && <ComplexQMLDevice device={device} />}
                </div>
              ))}
            </div>
          </div>

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
        </div>
      </section>

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