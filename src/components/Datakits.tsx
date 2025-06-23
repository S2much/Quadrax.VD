import { useState } from 'react';
import { Upload, Download, Eye, BarChart3, Database, Search, Filter, Plus, FileSpreadsheet, Zap, Wrench, Shield, Bolt, Terminal as TerminalIcon, Code, Share2, ExternalLink, Package, CheckCircle, AlertCircle } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

interface DataKit {
  id: string;
  name: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  qualityScore?: number;
  createdAt: Date;
  isExported?: boolean;
  exportNodeId?: string;
}

export default function Datakits() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');
  const [datakits, setDatakits] = useState<DataKit[]>([
    {
      id: '1',
      name: 'Customer Analytics Dataset',
      fileName: 'customer_data_2024.csv',
      fileSize: 2500000,
      fileType: 'csv',
      status: 'ready',
      qualityScore: 94,
      createdAt: new Date(Date.now() - 86400000),
      isExported: false
    },
    {
      id: '2', 
      name: 'Sales Performance Data',
      fileName: 'sales_q4_2024.json',
      fileSize: 1800000,
      fileType: 'json',
      status: 'ready',
      qualityScore: 87,
      createdAt: new Date(Date.now() - 172800000),
      isExported: true,
      exportNodeId: 'node_001'
    },
    {
      id: '3',
      name: 'Product Inventory',
      fileName: 'inventory_master.xlsx',
      fileSize: 950000,
      fileType: 'xlsx',
      status: 'processing',
      createdAt: new Date(Date.now() - 3600000),
      isExported: false
    }
  ]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedDatakit, setSelectedDatakit] = useState<string | null>(null);
  const [exportName, setExportName] = useState('');
  const [exportDescription, setExportDescription] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const handleExportAsNode = (datakitId: string) => {
    const datakit = datakits.find(d => d.id === datakitId);
    if (!datakit) return;

    setSelectedDatakit(datakitId);
    setExportName(`${datakit.name} Node`);
    setExportDescription(`Exported DataKit node for ${datakit.fileName}`);
    setShowExportModal(true);
  };

  const confirmExport = async () => {
    if (!selectedDatakit || !exportName.trim()) return;

    setIsExporting(true);

    // Simulate export process
    setTimeout(() => {
      const exportNodeId = `node_${Date.now()}`;
      
      setDatakits(prev => prev.map(dk => 
        dk.id === selectedDatakit 
          ? { ...dk, isExported: true, exportNodeId }
          : dk
      ));

      setIsExporting(false);
      setShowExportModal(false);
      setSelectedDatakit(null);
      setExportName('');
      setExportDescription('');

      // Show success notification
      alert(`DataKit successfully exported as Manufacturing node: ${exportName}`);
    }, 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return CheckCircle;
      case 'processing': return Zap;
      case 'error': return AlertCircle;
      default: return Database;
    }
  };

  const filteredDatakits = datakits.filter(datakit => {
    const matchesSearch = datakit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         datakit.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || datakit.fileType === filterType;
    return matchesSearch && matchesFilter;
  });

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

        {/* Action Bar */}
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
              <option value="xlsx">Excel</option>
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
              <span className="text-[#00beef] font-mono">data export-node {`<id>`}</span>
              <span className="text-gray-300 block">Export as Manufacturing node</span>
            </div>
            <div>
              <span className="text-[#00beef] font-mono">data transform {`<dataset>`}</span>
              <span className="text-gray-300 block">Apply transformations</span>
            </div>
          </div>
        </div>

        {/* DataKits Grid */}
        {filteredDatakits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredDatakits.map((datakit) => {
              const StatusIcon = getStatusIcon(datakit.status);
              return (
                <div
                  key={datakit.id}
                  className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{datakit.name}</h3>
                      <p className="text-gray-300 text-sm">{datakit.fileName}</p>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(datakit.status)}`}>
                      <StatusIcon size={16} />
                      <span className="text-sm capitalize">{datakit.status}</span>
                    </div>
                  </div>

                  {/* DataKit Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Size:</span>
                      <span className="text-[#00beef]">{formatFileSize(datakit.fileSize)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Type:</span>
                      <span className="text-[#00beef] uppercase">{datakit.fileType}</span>
                    </div>
                    {datakit.qualityScore && (
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Quality:</span>
                        <span className="text-[#00beef]">{datakit.qualityScore}%</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-300">Created:</span>
                      <span className="text-[#00beef]">{datakit.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Export Status */}
                  {datakit.isExported && (
                    <div className="mb-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 text-green-400 text-sm">
                        <Package size={14} />
                        <span>Exported as Manufacturing Node</span>
                      </div>
                      <div className="text-xs text-green-300 mt-1">
                        Node ID: {datakit.exportNodeId}
                      </div>
                    </div>
                  )}

                  {/* Quality Score Bar */}
                  {datakit.qualityScore && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Data Quality</span>
                        <span className="text-[#00beef]">{datakit.qualityScore}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${datakit.qualityScore}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                      <Eye size={14} />
                      View
                    </button>
                    <button className="flex-1 bg-[#005778] hover:bg-[#00699a] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                      <Download size={14} />
                      Export
                    </button>
                    {!datakit.isExported && datakit.status === 'ready' && (
                      <button
                        onClick={() => handleExportAsNode(datakit.id)}
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
        )}

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
                Export DataKits as reusable nodes for Manufacturing workflows with automatic configuration.
              </p>
              <div className="text-xs text-[#00beef]">
                • Drag-and-drop integration
                • Auto-validation setup
                • Version control
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
              <div className="flex items-center gap-3 mb-3">
                <ExternalLink className="text-[#00beef]" size={24} />
                <h4 className="text-white font-semibold">Platform Export</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Export for Windows and Android platforms with optimized data handling.
              </p>
              <div className="text-xs text-[#00beef]">
                • Cross-platform compatibility
                • Optimized file formats
                • Offline capabilities
              </div>
            </div>

            <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-[#00beef]" size={24} />
                <h4 className="text-white font-semibold">Secure Sharing</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Share DataKits securely with team members and external collaborators.
              </p>
              <div className="text-xs text-[#00beef]">
                • Encrypted transfers
                • Access controls
                • Audit logging
              </div>
            </div>
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
              <Share2 className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Export Nodes</h4>
              <p className="text-gray-300 text-sm">Export as Manufacturing workflow nodes</p>
            </button>
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
                  <li>• Automatic data validation</li>
                  <li>• Configurable input/output ports</li>
                  <li>• Reusable across workflows</li>
                  <li>• Version control support</li>
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