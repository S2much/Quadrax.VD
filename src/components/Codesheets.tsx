import { useState } from 'react';
import { Play, Save, Share2, Plus, Code, FileText, BarChart3, Brain, Clock, Users, Star, GitBranch, Terminal as TerminalIcon, Package, CheckCircle, AlertCircle, ExternalLink, Zap, X } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

interface CodeSheet {
  id: string;
  name: string;
  description: string;
  language: 'python' | 'r' | 'sql' | 'javascript';
  status: 'idle' | 'running' | 'completed' | 'error';
  lastRun?: Date;
  createdAt: Date;
  isExported?: boolean;
  exportNodeId?: string;
  cellCount: number;
  executionTime?: number;
}

function Codesheets() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');
  const [codesheets, setCodesheets] = useState<CodeSheet[]>([
    {
      id: '1',
      name: 'Customer Segmentation Analysis',
      description: 'Advanced clustering analysis for customer segmentation using K-means and DBSCAN',
      language: 'python',
      status: 'completed',
      lastRun: new Date(Date.now() - 3600000),
      createdAt: new Date(Date.now() - 86400000),
      isExported: true,
      exportNodeId: 'node_cs_001',
      cellCount: 12,
      executionTime: 45
    },
    {
      id: '2',
      name: 'Sales Forecasting Model',
      description: 'Time series forecasting using ARIMA and Prophet models',
      language: 'python',
      status: 'idle',
      createdAt: new Date(Date.now() - 172800000),
      isExported: false,
      cellCount: 8,
      executionTime: 23
    },
    {
      id: '3',
      name: 'Data Quality Assessment',
      description: 'Comprehensive data quality checks and validation scripts',
      language: 'python',
      status: 'running',
      createdAt: new Date(Date.now() - 7200000),
      isExported: false,
      cellCount: 6
    }
  ]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedCodesheet, setSelectedCodesheet] = useState<string | null>(null);
  const [exportName, setExportName] = useState('');
  const [exportDescription, setExportDescription] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const templates = [
    { name: 'Data Exploration', icon: BarChart3, description: 'Basic EDA template', language: 'python' },
    { name: 'ML Classification', icon: Brain, description: 'Classification pipeline', language: 'python' },
    { name: 'Deep Learning', icon: Code, description: 'Neural network template', language: 'python' },
    { name: 'Time Series', icon: Clock, description: 'Forecasting template', language: 'python' },
    { name: 'SQL Analytics', icon: FileText, description: 'Database analysis', language: 'sql' },
    { name: 'R Statistics', icon: BarChart3, description: 'Statistical analysis', language: 'r' }
  ];

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const handleExportAsNode = (codesheetId: string) => {
    const codesheet = codesheets.find(c => c.id === codesheetId);
    if (!codesheet) return;

    setSelectedCodesheet(codesheetId);
    setExportName(`${codesheet.name} Node`);
    setExportDescription(`Exported CodeSheet node for ${codesheet.description}`);
    setShowExportModal(true);
  };

  const confirmExport = async () => {
    if (!selectedCodesheet || !exportName.trim()) return;

    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      const exportNodeId = `node_cs_${Date.now()}`;
      
      setCodesheets(prev => prev.map(cs => 
        cs.id === selectedCodesheet 
          ? { ...cs, isExported: true, exportNodeId }
          : cs
      ));

      setIsExporting(false);
      setShowExportModal(false);
      setSelectedCodesheet(null);
      setExportName('');
      setExportDescription('');

      // Show success notification
      alert(`CodeSheet successfully exported as Manufacturing node: ${exportName}`);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'running': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Zap;
      case 'error': return AlertCircle;
      default: return FileText;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'python': return 'bg-blue-500';
      case 'r': return 'bg-purple-500';
      case 'sql': return 'bg-orange-500';
      case 'javascript': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
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
              <span className="text-[#00beef] font-mono">codesheet run {`<id>`}</span>
              <span className="text-gray-300 block">Execute codesheet</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">codesheet export-node {`<id>`}</span>
              <span className="text-gray-300 block">Export as Manufacturing node</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">pip install package</span>
              <span className="text-gray-300 block">Install Python packages</span>
            </div>
          </div>
        </div>

        {/* Codesheets Grid/List */}
        {codesheets.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8' : 'space-y-4 mb-8'}>
            {codesheets.map((codesheet) => {
              const StatusIcon = getStatusIcon(codesheet.status);
              return (
                <div
                  key={codesheet.id}
                  className={`bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300 ${
                    viewMode === 'list' ? 'flex items-center gap-6' : ''
                  }`}
                >
                  <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-white">{codesheet.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full text-white ${getLanguageColor(codesheet.language)}`}>
                            {codesheet.language.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">{codesheet.description}</p>
                      </div>
                      <div className={`flex items-center gap-1 ${getStatusColor(codesheet.status)}`}>
                        <StatusIcon size={16} />
                        <span className="text-sm capitalize">{codesheet.status}</span>
                      </div>
                    </div>

                    {/* CodeSheet Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Cells:</span>
                        <span className="text-[#00beef]">{codesheet.cellCount}</span>
                      </div>
                      {codesheet.executionTime && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">Last Runtime:</span>
                          <span className="text-[#00beef]">{codesheet.executionTime}s</span>
                        </div>
                      )}
                      {codesheet.lastRun && (
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-300">Last Run:</span>
                          <span className="text-[#00beef]">{codesheet.lastRun.toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Created:</span>
                        <span className="text-[#00beef]">{codesheet.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Export Status */}
                    {codesheet.isExported && (
                      <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Package size={14} />
                          <span>Exported as Manufacturing Node</span>
                        </div>
                        <div className="text-xs text-green-300 mt-1">
                          Node ID: {codesheet.exportNodeId}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col w-48' : ''}`}>
                    <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                      <Play size={14} />
                      Run
                    </button>
                    <button className="flex-1 bg-[#005778] hover:bg-[#00699a] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                      <Save size={14} />
                      Save
                    </button>
                    {!codesheet.isExported && (
                      <button
                        onClick={() => handleExportAsNode(codesheet.id)}
                        className="flex-1 bg-[#00beef] hover:bg-[#00699a] text-black py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1"
                      >
                        <Share2 size={14} />
                        Export Node
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
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
        )}

        {/* Templates Section */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Start Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.name}
                className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left"
              >
                <div className="flex items-center gap-3 mb-3">
                  <template.icon className="w-8 h-8 text-[#00beef] group-hover:scale-110 transition-transform duration-300" />
                  <span className={`px-2 py-1 text-xs rounded-full text-white ${getLanguageColor(template.language)}`}>
                    {template.language.toUpperCase()}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-2">{template.name}</h4>
                <p className="text-gray-300 text-sm">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Export Features Panel */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
          <h3 className="text-2xl font-bold text-white mb-6">Export & Integration Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
              <div className="flex items-center gap-3 mb-3">
                <Package className="text-[#00beef]" size={24} />
                <h4 className="text-white font-semibold">Manufacturing Nodes</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Export CodeSheets as reusable processing nodes with configurable parameters.
              </p>
              <div className="text-xs text-[#00beef]">
                • Parameterized execution
                • Input/output mapping
                • Error handling
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
              <div className="flex items-center gap-3 mb-3">
                <ExternalLink className="text-[#00beef]" size={24} />
                <h4 className="text-white font-semibold">Platform Export</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Export for Windows and Android with optimized runtime environments.
              </p>
              <div className="text-xs text-[#00beef]">
                • Standalone execution
                • Dependency bundling
                • Mobile optimization
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
              <div className="flex items-center gap-3 mb-3">
                <GitBranch className="text-[#00beef]" size={24} />
                <h4 className="text-white font-semibold">Version Control</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Track changes and manage versions of your CodeSheets with Git integration.
              </p>
              <div className="text-xs text-[#00beef]">
                • Automatic versioning
                • Change tracking
                • Rollback support
              </div>
            </div>
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

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a] max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Export as Manufacturing Node</h3>
              <button 
                onClick={() => setShowExportModal(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Node Name</label>
                <input
                  type="text"
                  value={exportName}
                  onChange={(e) => setExportName(e.target.value)}
                  className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef]"
                  placeholder="Enter node name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={exportDescription}
                  onChange={(e) => setExportDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] resize-none"
                  rows={3}
                  placeholder="Describe the node functionality..."
                />
              </div>

              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <h4 className="text-blue-400 font-semibold mb-2">Export Features</h4>
                <ul className="text-blue-300 text-sm space-y-1">
                  <li>• Parameterized execution</li>
                  <li>• Input/output port mapping</li>
                  <li>• Error handling and logging</li>
                  <li>• Performance monitoring</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={confirmExport}
                  disabled={!exportName.trim() || isExporting}
                  className="flex-1 px-4 py-2 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-colors duration-300"
                >
                  {isExporting ? 'Exporting...' : 'Export Node'}
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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