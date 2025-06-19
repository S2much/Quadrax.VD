import { useState } from 'react';
import { Play, Save, Share2, Plus, Code, FileText, BarChart3, Brain, Clock, Users, Star, GitBranch, Terminal as TerminalIcon } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Codesheets() {
  const [selectedNotebook, setSelectedNotebook] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const notebooks = [
    {
      id: 1,
      name: 'Segmentation_Analysis',
      language: 'Python',
      framework: 'Pandas + Scikit-learn',
      lastModified: '2 hours ago',
      status: 'Running',
      runtime: '45 min',
      cells: 23,
      outputs: 18,
      collaborators: 3,
      starred: true,
      description: 'Advanced customer segmentation using K-means clustering and RFM analysis.',
      tags: ['clustering', 'marketing', 'analytics'],
      progress: 78
    },
    {
      id: 2,
      name: 'DL_Image_Classification',
      language: 'Python',
      framework: 'TensorFlow + Keras',
      lastModified: '1 day ago',
      status: 'Completed',
      runtime: '2h 15min',
      cells: 45,
      outputs: 42,
      collaborators: 2,
      starred: false,
      description: 'CNN model for medical image classification with transfer learning.',
      tags: ['deep-learning', 'computer-vision', 'medical'],
      progress: 100
    },
    {
      id: 3,
      name: 'Financial_Forecasting',
      language: 'R',
      framework: 'Prophet + Tidyverse',
      lastModified: '3 days ago',
      status: 'Draft',
      runtime: '12 min',
      cells: 15,
      outputs: 8,
      collaborators: 1,
      starred: true,
      description: 'Stock price prediction using Facebook Prophet and ARIMA models.',
      tags: ['time-series', 'finance', 'forecasting'],
      progress: 45
    },
    {
      id: 4,
      name: 'NLP_Analysis_Pipeline',
      language: 'Python',
      framework: 'Transformers + PyTorch',
      lastModified: '1 week ago',
      status: 'Completed',
      runtime: '1h 30min',
      cells: 32,
      outputs: 29,
      collaborators: 4,
      starred: false,
      description: 'BERT-based sentiment analysis for social media monitoring.',
      tags: ['nlp', 'sentiment', 'transformers'],
      progress: 100
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-yellow-400 bg-yellow-400/20';
      case 'Completed': return 'text-green-400 bg-green-400/20';
      case 'Draft': return 'text-blue-400 bg-blue-400/20';
      case 'Error': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getLanguageIcon = (language: string) => {
    switch (language) {
      case 'Python': return '🐍';
      case 'R': return '📊';
      case 'Julia': return '🔬';
      case 'Scala': return '⚡';
      default: return '💻';
    }
  };

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

  // If terminal or editor is open, show minimal layout
  if (isTerminalOpen || isEditorOpen) {
    return (
      <>
        {isEditorOpen && (
          <CodeEditor 
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            context="codesheets"
            workingDirectory="/notebooks"
          />
        )}
        
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/notebooks"
          context="codesheets"
        />
      </>
    );
  }

  return (
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
            New Notebook
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
        <h5 className="text-white font-semibold mb-3">Notebook CLI Commands</h5>
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

      {/* Notebooks Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8' : 'space-y-4 mb-8'}>
        {notebooks.map((notebook) => (
          <div
            key={notebook.id}
            onClick={() => setSelectedNotebook(notebook.id)}
            className={`bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a] border ${
              selectedNotebook === notebook.id ? 'border-[#00beef] border-2' : 'border-[#00699a]/30'
            } ${viewMode === 'list' ? 'flex items-center gap-6' : ''}`}
          >
            <div className={viewMode === 'list' ? 'flex-1' : ''}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getLanguageIcon(notebook.language)}</span>
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      {notebook.name}
                      {notebook.starred && <Star size={16} className="text-yellow-400 fill-current" />}
                    </h3>
                    <span className="text-sm text-gray-300">{notebook.framework}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notebook.status)}`}>
                  {notebook.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                {notebook.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {notebook.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-[#00699a]/30 text-[#00beef] rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Cells:</span>
                  <span className="text-[#00beef]">{notebook.cells}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Outputs:</span>
                  <span className="text-[#00beef]">{notebook.outputs}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Runtime:</span>
                  <span className="text-[#00beef]">{notebook.runtime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Progress:</span>
                  <span className="text-[#00beef]">{notebook.progress}%</span>
                </div>
              </div>

              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div 
                  className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${notebook.progress}%` }}
                ></div>
              </div>

              <div className="flex gap-2 mb-3">
                <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                  <Play size={16} />
                  Run
                </button>
                <button className="flex-1 bg-black/50 hover:bg-[#005778] text-white py-2 px-3 rounded border border-[#00699a] transition-colors duration-300 flex items-center justify-center gap-1">
                  <Code size={16} />
                  Edit
                </button>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>Modified {notebook.lastModified}</span>
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>{notebook.collaborators}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
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
        <div className="space-y-4">
          {[
            { action: 'Executed cell 15', notebook: 'Customer_Segmentation_Analysis', time: '5 min ago', icon: Play },
            { action: 'Saved notebook', notebook: 'Deep_Learning_Image_Classification', time: '1 hour ago', icon: Save },
            { action: 'Shared with team', notebook: 'NLP_Sentiment_Analysis_Pipeline', time: '2 hours ago', icon: Share2 },
            { action: 'Created branch', notebook: 'Financial_Time_Series_Forecasting', time: '1 day ago', icon: GitBranch }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gradient-to-r from-black to-[#005778] rounded-lg border border-[#00699a]/30">
              <activity.icon size={16} className="text-[#00beef]" />
              <div className="flex-1">
                <span className="text-white">{activity.action}</span>
                <span className="text-gray-300 ml-2">in {activity.notebook}</span>
              </div>
              <span className="text-gray-400 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Codesheets;