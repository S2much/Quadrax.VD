import { useState } from 'react';
import { Play, Pause, Square, Settings, Plus, GitBranch, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Database, Brain, Upload, Terminal as TerminalIcon, Code } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Pipelines() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const pipelineTemplates = [
    { name: 'Data Processing', icon: Database, description: 'ETL pipeline template' },
    { name: 'Model Training', icon: Brain, description: 'ML training pipeline' },
    { name: 'Real-time Inference', icon: Zap, description: 'Streaming pipeline' },
    { name: 'Batch Processing', icon: Upload, description: 'Batch job template' }
  ];

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
            Pipelines
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        {/* Action Bar */}
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Plus size={16} />
              Create Pipeline
            </button>
            <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
              <GitBranch size={16} />
              Templates
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
          
          <div className="flex gap-2 opacity-50">
            <button className="px-3 py-2 bg-green-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-1 cursor-not-allowed">
              <Play size={16} />
              Run All
            </button>
            <button className="px-3 py-2 bg-yellow-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-1 cursor-not-allowed">
              <Pause size={16} />
              Pause All
            </button>
            <button className="px-3 py-2 bg-red-600 text-white rounded-lg transition-colors duration-300 flex items-center gap-1 cursor-not-allowed">
              <Square size={16} />
              Stop All
            </button>
          </div>
        </div>

        {/* CLI Command Examples */}
        <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
          <h5 className="text-white font-semibold mb-3">Pipeline CLI Commands</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[#00beef] font-mono">pipeline run {'<name>'}</span>
              <span className="text-gray-300 block">Execute pipeline</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">pipeline status</span>
              <span className="text-gray-300 block">Check pipeline status</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">pipeline logs {'<name>'}</span>
              <span className="text-gray-300 block">View pipeline logs</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">pipeline stop {'<name>'}</span>
              <span className="text-gray-300 block">Stop running pipeline</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
            <GitBranch size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Pipelines Available</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Create your first automation pipeline to streamline your ML workflows and data processing tasks.
            </p>
            
            <button className="px-8 py-4 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Create Your First Pipeline
            </button>
          </div>
        </div>

        {/* Pipeline Templates */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Pipeline Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipelineTemplates.map((template) => (
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

        {/* Pipeline Monitoring Dashboard */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">System Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Active Pipelines</span>
                <Play className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">No pipelines running</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Success Rate</span>
                <CheckCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">--</div>
              <div className="text-sm text-gray-400">No data available</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Avg Duration</span>
                <Clock className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">--</div>
              <div className="text-sm text-gray-400">No data available</div>
            </div>
            
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Failed Runs</span>
                <XCircle className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-white">0</div>
              <div className="text-sm text-gray-400">No failures</div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="pipelines"
          workingDirectory="/pipelines"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/pipelines"
          context="pipelines"
        />
      )}
    </>
  );
}

export default Pipelines;