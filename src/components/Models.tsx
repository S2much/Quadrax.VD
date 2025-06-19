import { useState } from 'react';
import { Brain, Zap, MapPin, Play, Pause, Settings, Download, Upload, BarChart3, Clock, CheckCircle, AlertCircle, Star, Users, Terminal as TerminalIcon, Code } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Models() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'usage'>('overview');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const models = [
    {
      id: 1,
      name: 'mechano-tech_v1',
      type: 'Language Model',
      category: 'Mechanical Engineering',
      description: 'Advanced language model specialized in mechanical engineering terminology, calculations, and technical documentation. Trained on extensive engineering datasets including CAD specifications, material properties, and manufacturing processes.',
      status: 'Active',
      accuracy: 94.7,
      lastTrained: '2 days ago',
      version: 'v1.2.3',
      size: '2.4 GB',
      parameters: '7.2B',
      deployments: 12,
      apiCalls: '1.2M',
      icon: Brain,
      capabilities: [
        'Technical documentation generation',
        'Material property analysis',
        'CAD specification interpretation',
        'Manufacturing process optimization',
        'Quality control assessment'
      ],
      metrics: {
        precision: 95.2,
        recall: 94.1,
        f1Score: 94.6,
        latency: '120ms'
      }
    },
    {
      id: 2,
      name: 'mathix-v1',
      type: 'Calculation Model',
      category: 'Mathematics & Finance',
      description: 'Specialized model for geometric, trigonometric, logistics, and financial calculations. Provides accurate measurements, estimations, and complex mathematical computations with high precision.',
      status: 'Active',
      accuracy: 98.3,
      lastTrained: '1 week ago',
      version: 'v1.0.8',
      size: '1.8 GB',
      parameters: '5.1B',
      deployments: 8,
      apiCalls: '850K',
      icon: BarChart3,
      capabilities: [
        'Geometric calculations',
        'Trigonometric functions',
        'Financial modeling',
        'Logistics optimization',
        'Statistical analysis'
      ],
      metrics: {
        precision: 98.7,
        recall: 97.9,
        f1Score: 98.3,
        latency: '85ms'
      }
    },
    {
      id: 3,
      name: 'nearMe-v1',
      type: 'Geolocation Model',
      category: 'Location & Search',
      description: 'Advanced geolocation and search engine model that provides accurate location-based services, spatial analysis, and intelligent search capabilities with real-time data processing.',
      status: 'Training',
      accuracy: 91.5,
      lastTrained: '3 days ago',
      version: 'v1.1.0',
      size: '3.2 GB',
      parameters: '8.9B',
      deployments: 5,
      apiCalls: '420K',
      icon: MapPin,
      capabilities: [
        'Real-time location tracking',
        'Spatial data analysis',
        'Route optimization',
        'Point of interest detection',
        'Geographic search queries'
      ],
      metrics: {
        precision: 92.1,
        recall: 90.8,
        f1Score: 91.4,
        latency: '150ms'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/20';
      case 'Training': return 'text-yellow-400 bg-yellow-400/20';
      case 'Inactive': return 'text-gray-400 bg-gray-400/20';
      case 'Error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle size={16} className="text-green-400" />;
      case 'Training': return <Clock size={16} className="text-yellow-400 animate-spin" />;
      case 'Inactive': return <Pause size={16} className="text-gray-400" />;
      case 'Error': return <AlertCircle size={16} className="text-red-400" />;
      default: return <AlertCircle size={16} className="text-gray-400" />;
    }
  };

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  // If terminal or editor is open, show minimal layout
  if (isTerminalOpen || isEditorOpen) {
    return (
      <>
        {isEditorOpen && (
          <CodeEditor 
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            context="models"
            workingDirectory="/models"
          />
        )}
        
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/models"
          context="models"
        />
      </>
    );
  }

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          Models
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      {/* Action Bar */}
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
            <Upload size={16} />
            Deploy Model
          </button>
          <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
            <Brain size={16} />
            Train New
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
        <h5 className="text-white font-semibold mb-3">Model CLI Commands</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-[#00beef] font-mono">model deploy <name></name></span>
            <span className="text-gray-300 block">Deploy model to production</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">model train <config></config></span>
            <span className="text-gray-300 block">Start model training</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">model evaluate <name></name></span>
            <span className="text-gray-300 block">Evaluate model performance</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">model logs <name></name></span>
            <span className="text-gray-300 block">View model logs</span>
          </div>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mb-8">
        {models.map((model) => {
          const IconComponent = model.icon;
          return (
            <div
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a] border ${
                selectedModel === model.id ? 'border-[#00beef] border-2' : 'border-[#00699a]/30'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <IconComponent size={24} className="text-[#00beef]" />
                  <div>
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <span className="text-sm text-gray-300">{model.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(model.status)}
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(model.status)}`}>
                    {model.status}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {model.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Accuracy:</span>
                  <span className="text-[#00beef]">{model.accuracy}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Version:</span>
                  <span className="text-[#00beef]">{model.version}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Size:</span>
                  <span className="text-[#00beef]">{model.size}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Parameters:</span>
                  <span className="text-[#00beef]">{model.parameters}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>API Calls:</span>
                  <span className="text-[#00beef]">{model.apiCalls}</span>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${model.accuracy}%` }}
                ></div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2 text-gray-300">Key Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 3).map((capability, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-[#00699a]/30 text-[#00beef] rounded-full">
                      {capability}
                    </span>
                  ))}
                  {model.capabilities.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-gray-400/20 text-gray-400 rounded-full">
                      +{model.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                  <Play size={16} />
                  Deploy
                </button>
                <button className="flex-1 bg-black/50 hover:bg-[#005778] text-white py-2 px-3 rounded border border-[#00699a] transition-colors duration-300 flex items-center justify-center gap-1">
                  <Settings size={16} />
                  Configure
                </button>
              </div>
              
              <div className="text-xs text-gray-400 mt-3 text-center">
                Last trained {model.lastTrained}
              </div>
            </div>
          );
        })}
      </div>

      {/* Model Performance Dashboard */}
      {activeTab === 'performance' && (
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Avg Accuracy</span>
                <Star className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">94.8%</div>
              <div className="text-sm text-gray-400">Across all models</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Avg Latency</span>
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">118ms</div>
              <div className="text-sm text-gray-400">Response time</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Total Deployments</span>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">25</div>
              <div className="text-sm text-gray-400">Active instances</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">API Requests</span>
                <BarChart3 className="w-5 h-5 text-[#00beef]" />
              </div>
              <div className="text-2xl font-bold text-white">2.47M</div>
              <div className="text-sm text-gray-400">This month</div>
            </div>
          </div>
        </div>
      )}

      {/* Model Templates */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-6">Model Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Classification', icon: Brain, description: 'Multi-class classification template' },
            { name: 'Regression', icon: BarChart3, description: 'Linear and non-linear regression' },
            { name: 'NLP', icon: Brain, description: 'Natural language processing' },
            { name: 'Computer Vision', icon: Brain, description: 'Image recognition and analysis' }
          ].map((template) => (
            <button
              key={template.name}
              className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left"
            >
              <template.icon className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">{template.name}</h4>
              <p className="text-gray-300 text-sm">{template.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Models;