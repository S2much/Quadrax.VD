import { useState } from 'react';
import { Upload, Download, Eye, BarChart3, Database, Search, Filter, Plus, FileSpreadsheet, Zap, Wrench, Shield, Bolt, Terminal as TerminalIcon, Code } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Datakits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
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
            Datakits
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef]"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-6 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
            >
              <option value="all">All Types</option>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
              <option value="txt">Text</option>
            </select>
            
            <button className="px-4 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Filter size={16} />
              Filter
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
            
            <button className="px-16 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-left gap-2">
              <Plus size={16} />
              Create DataKit
            </button>
          </div>
        </div>

        {/* CLI Command Examples */}
        <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
          <h5 className="text-white font-semibold mb-3">Data CLI Commands</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-[#00beef] font-mono">data upload {`<file>`}</span>
              <span className="text-gray-300 block">Upload dataset to DataKits</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">data validate {`<dataset>`}</span>
              <span className="text-gray-300 block">Validate data quality</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">data transform {`<dataset>`}</span>
              <span className="text-gray-300 block">Apply transformations</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">data export {`<dataset>`}</span>
              <span className="text-gray-300 block">Export processed data</span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
            <Database size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No DataKits Available</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Upload your first dataset to start building data science and engineering workflows.
            </p>
            
            <button className="px-8 py-4 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Create Your First DataKit
            </button>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mt-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group">
              <Upload className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Upload Data</h4>
              <p className="text-gray-300 text-sm">Import datasets from various sources</p>
            </button>
            
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group">
              <Zap className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Auto-Clean</h4>
              <p className="text-gray-300 text-sm">Automatically clean and preprocess data</p>
            </button>
            
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group">
              <BarChart3 className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Visualize</h4>
              <p className="text-gray-300 text-sm">Create interactive data visualizations</p>
            </button>
            
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group">
              <Download className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Export</h4>
              <p className="text-gray-300 text-sm">Export processed data in multiple formats</p>
            </button>
          </div>
        </div>
      </section>

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="datakits"
          workingDirectory="/datakits"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/datakits"
          context="datakits"
        />
      )}
    </>
  );
}

export default Datakits;