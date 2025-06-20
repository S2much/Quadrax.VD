import { useState } from 'react';
import { Play, Save, Share2, Plus, Code, FileText, BarChart3, Brain, Clock, Users, Star, GitBranch, Terminal as TerminalIcon } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Codesheets() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const templates = [
    { name: 'Data Exploration', icon: BarChart3, description: 'Basic EDA template' },
    { name: 'ML Classification', icon: Brain, description: 'Classification pipeline' },
    { name: 'Deep Learning', icon: Code, description: 'Neural network template' },
    { name: 'Time Series', icon: Clock, description: 'Forecasting template' }
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
            Codesheets
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        {/* Action Bar */}
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button className="px-8 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex flex-row items-center gap-2">
              <Plus size={16} />
              New Codesheet
            </button>
            <button className="px-4 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
              <FileText size={16} />
              Import
            </button>
            
            {/* Development Tools */}
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-4 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Code size={16} />
              Open Editor
            </button>
            <button 
              onClick={() => openTerminal('bash')}
              className="px-4 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <TerminalIcon size={16} />
              Open Terminal
            </button>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                viewMode === 'grid' ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                viewMode === 'list' ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* CLI Command Examples */}
        <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
          <h5 className="text-white font-semibold mb-3">Codesheet CLI Commands</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[#00beef] font-mono">jupyter notebook</span>
              <span className="text-gray-300 block">Start Jupyter server</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">python script.py</span>
              <span className="text-gray-300 block">Execute Python script</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">pip install package</span>
              <span className="text-gray-300 block">Install Python packages</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">git commit -m "message"</span>
              <span className="text-gray-300 block">Version control</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
            <FileText size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Codesheets Available</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Create your first interactive development environment for data analysis and model prototyping.
            </p>
            
            <button className="px-8 py-4 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Create Your First Codesheet
            </button>
          </div>
        </div>

        {/* Templates Section */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Start Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
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

        {/* Recent Activity */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="text-center py-8">
            <Clock size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-300">No recent activity. Start by creating your first codesheet.</p>
          </div>
        </div>
      </section>

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="codesheets"
          workingDirectory="/notebooks"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/notebooks"
          context="codesheets"
        />
      )}
    </>
  );
}

export default Codesheets;