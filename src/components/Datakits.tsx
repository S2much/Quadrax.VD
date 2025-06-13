import { useState } from 'react';
import { Upload, Download, Eye, BarChart3, Database, Search, Filter,  Plus, FileSpreadsheet,  Zap, Wrench, Shield, Bolt } from 'lucide-react';
import { fastenersData } from '../data/fasteners';
import { handToolsData } from '../data/handTools';
import { ppeData } from '../data/ppe';
import { screwsData } from '../data/screws';

function Datakits() {
  const [selectedDataset, setSelectedDataset] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const datasets = [
    {
      id: 1,
      name: 'Bolts_Dataset',
      type: 'JSON',
      size: '1.2 MB',
      rows: '11',
      columns: 'Variants, Materials',
      lastModified: '2 hours ago',
      status: 'Ready',
      description: 'Comprehensive fastener dataset including bolts, nuts, and various fastening hardware with material specifications and applications.',
      icon: Bolt,
      quality: 96,
      data: fastenersData,
      category: 'Engineering'
    },
    {
      id: 2,
      name: 'Mechanical_Imaging',
      type: 'Images',
      size: '15.7 GB',
      rows: '50,000',
      columns: 'Types, Variants, Specifications',
      lastModified: '1 day ago',
      status: 'Ready',
      description: 'Detailed hand tools dataset covering screwdrivers, pliers, wrenches, and mechanical tools with specifications and usage guidelines.',
      icon: Wrench,
      quality: 94,
      data: handToolsData,
      category: 'Mechanical'
    },
    {
      id: 3,
      name: 'PPE_Safety_Dataset',
      type: 'JSON',
      size: '2.1 MB',
      rows: '25+',
      columns: 'Categories, Items, Safety Specs',
      lastModified: '3 days ago',
      status: 'Ready',
      description: 'Personal Protective Equipment dataset with safety categories, equipment specifications, and compliance standards.',
      icon: Shield,
      quality: 98,
      data: ppeData,
      category: 'Safety'
    },
    {
      id: 4,
      name: 'Screws_Dataset',
      type: 'JSON',
      size: '890 KB',
      rows: '18',
      columns: 'Types, Applications',
      lastModified: '5 days ago',
      status: 'Ready',
      description: 'Specialized screw types dataset including wood screws, machine screws, and specialized fastening solutions.',
      icon: FileSpreadsheet,
      quality: 92,
      data: screwsData,
      category: 'Engineering'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'text-green-400 bg-green-400/20';
      case 'Processing': return 'text-yellow-400 bg-yellow-400/20';
      case 'Error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || dataset.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const selectedDatasetData = selectedDataset ? datasets.find(d => d.id === selectedDataset) : null;

  return (
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
            className="px-4 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
          >
            <option value="all">All Types</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="txt">Text</option>
          </select>
          
          <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          
          <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
            <Plus size={16} />
            Upload Dataset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Dataset Grid */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredDatasets.map((dataset) => {
              const IconComponent = dataset.icon;
              return (
                <div
                  key={dataset.id}
                  onClick={() => setSelectedDataset(dataset.id)}
                  className={`bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a] border ${
                    selectedDataset === dataset.id ? 'border-[#00beef] border-2' : 'border-[#00699a]/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <IconComponent size={24} className="text-[#00beef]" />
                      <div>
                        <h3 className="text-lg font-semibold">{dataset.name}</h3>
                        <span className="text-sm text-gray-300">{dataset.category} • {dataset.type}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(dataset.status)}`}>
                      {dataset.status}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {dataset.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Size:</span>
                      <span className="text-[#00beef]">{dataset.size}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Records:</span>
                      <span className="text-[#00beef]">{dataset.rows}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quality Score:</span>
                      <span className="text-[#00beef]">{dataset.quality}%</span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${dataset.quality}%` }}
                    ></div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                      <Eye size={16} />
                      View
                    </button>
                    <button className="flex-1 bg-black/50 hover:bg-[#005778] text-white py-2 px-3 rounded border border-[#00699a] transition-colors duration-300 flex items-center justify-center gap-1">
                      <BarChart3 size={16} />
                      Analyze
                    </button>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-3 text-center">
                    Modified {dataset.lastModified}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dataset Details Panel */}
        <div className="xl:col-span-1">
          {selectedDatasetData ? (
            <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <selectedDatasetData.icon size={24} className="text-[#00beef]" />
                Dataset Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{selectedDatasetData.name}</h4>
                  <p className="text-gray-300 text-sm mb-3">{selectedDatasetData.description}</p>
                </div>

                <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                  <h5 className="text-white font-semibold mb-3">Data Preview</h5>
                  <div className="bg-black/50 p-3 rounded text-xs text-gray-300 max-h-60 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(selectedDatasetData.data, null, 2)}
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-b from-[#005778] to-black p-3 rounded-lg border border-[#00699a]/30">
                    <div className="text-xs text-gray-400">Type</div>
                    <div className="text-white font-semibold">{selectedDatasetData.type}</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#005778] to-black p-3 rounded-lg border border-[#00699a]/30">
                    <div className="text-xs text-gray-400">Category</div>
                    <div className="text-white font-semibold">{selectedDatasetData.category}</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#005778] to-black p-3 rounded-lg border border-[#00699a]/30">
                    <div className="text-xs text-gray-400">Size</div>
                    <div className="text-white font-semibold">{selectedDatasetData.size}</div>
                  </div>
                  <div className="bg-gradient-to-b from-[#005778] to-black p-3 rounded-lg border border-[#00699a]/30">
                    <div className="text-xs text-gray-400">Quality</div>
                    <div className="text-white font-semibold">{selectedDatasetData.quality}%</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                    <Download size={16} />
                    Export
                  </button>
                  <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                    <BarChart3 size={16} />
                    Analyze
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg text-center">
              <Database size={48} className="mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Select a Dataset</h4>
              <p className="text-gray-300">Click on a dataset to view detailed information and preview the data.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mt-8">
        <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group">
            <Upload className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Upload Data</h4>
            <p className="text-gray-300 text-sm">Import new datasets from various sources</p>
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
  );
}

export default Datakits;