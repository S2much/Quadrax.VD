import { useState } from 'react';
import { Brain, Zap, MapPin, Play, Pause, Settings, Download, Upload, BarChart3, Clock, CheckCircle, AlertCircle, Star, Users, Terminal as TerminalIcon, Code, Plus } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Models() {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'usage'>('overview');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  return (
    <>
      {/* Main Component Content */}
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
              <span className="text-[#00beef] font-mono">model deploy {'<name>'}</span>
              <span className="text-gray-300 block">Deploy model to production</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">model train {'<config>'}</span>
              <span className="text-gray-300 block">Start model training</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">model evaluate {'<name>'}</span>
              <span className="text-gray-300 block">Evaluate model performance</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">model logs {'<name>'}</span>
              <span className="text-gray-300 block">View model logs</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
            <Brain size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Models Available</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Train your first AI model or deploy an existing one to start building intelligent applications.
            </p>
            
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <Brain size={20} />
                Train New Model
              </button>
              <button className="px-6 py-3 bg-[#00699a] hover:bg-[#00beef] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <Upload size={20} />
                Deploy Existing Model
              </button>
            </div>
          </div>
        </div>

        {/* Model Performance Dashboard */}
        {activeTab === 'performance' && (
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
            <h3 className="text-2xl font-bold text-white mb-6">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Avg Accuracy</span>
                  <Star className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white">--</div>
                <div className="text-sm text-gray-400">No models deployed</div>
              </div>
              
              <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Avg Latency</span>
                  <Clock className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white">--</div>
                <div className="text-sm text-gray-400">No data available</div>
              </div>
              
              <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">Total Deployments</span>
                  <CheckCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">No active instances</div>
              </div>
              
              <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300">API Requests</span>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white">0</div>
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
    </>
  );
}

export default Models;