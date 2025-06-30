import { useState, useRef, useEffect } from 'react';
import { X, Save, Play, FileText, Folder, Search, Code, BookOpen, Plus, Trash2, TerminalIcon, DatabaseIcon } from 'lucide-react';
import Terminal from './Terminal';

interface CodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
  context: string;
  workingDirectory?: string;
  mode?: 'notebook' | 'script' | 'dataset';
}

interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
  type: 'notebook' | 'script' | 'dataset';
}

interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  content: string;
  output?: string;
  executed: boolean;
}

// Add types for context files and notebook cells
interface ContextFile {
  name: string;
  language: string;
  type: string;
  content: string;
}
interface RawNotebookCell {
  cell_type: string;
  source: string[] | string;
  outputs?: unknown[];
}

function CodeEditor({ isOpen, onClose, context, workingDirectory = '~', mode = 'notebook' }: CodeEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('');
  const [tabs, setTabs] = useState<FileTab[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editorMode, setEditorMode] = useState<'notebook' | 'script' | 'dataset'>(mode);
  const [notebookCells, setNotebookCells] = useState<NotebookCell[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const terminalShell = 'bash';
  
  // Get the currently active tab data
  const activeTabData = tabs.find(tab => tab.id === activeTab);
  
  // Dataset tool definitions
  const datasetTools = [
    { key: 'aiSearch', label: 'AI Search Service' },
    { key: 'databases', label: 'Databases' },
    { key: 'sql', label: 'SQL' },
    { key: 'json', label: 'JSON' },
    { key: 'tables', label: 'Tables' },
    { key: 'schema', label: 'Schema' },
    { key: 'visualization', label: 'Visualization' },
    { key: 'functions', label: 'Data Science Functions' }
  ];

  // Sample files based on context and mode
  const getContextFiles = () => {
    const baseFiles = {
      notebook: [
        { 
          name: 'data_analysis.ipynb', 
          language: 'jupyter', 
          type: 'notebook' as const,
          content: JSON.stringify({
            cells: [
              {
                cell_type: "markdown",
                source: ["# Data Analysis Notebook\n", "\n", "This notebook demonstrates data analysis workflows using Python."]
              },
              {
                cell_type: "code",
                source: ["import pandas as pd\n", "import numpy as np\n", "import matplotlib.pyplot as plt\n", "\n", "# Load sample data\n", "df = pd.read_csv('sample_data.csv')\n", "print(f'Dataset shape: {df.shape}')"],
                outputs: []
              }
            ],
            metadata: {
              kernelspec: {
                display_name: "Python 3",
                language: "python",
                name: "python3"
              }
            }
          }, null, 2)
        },
        { 
          name: 'ml_experiment.ipynb', 
          language: 'jupyter', 
          type: 'notebook' as const,
          content: JSON.stringify({
            cells: [
              {
                cell_type: "markdown",
                source: ["# Machine Learning Experiment\n", "\n", "Training and evaluating different ML models."]
              },
              {
                cell_type: "code",
                source: ["from sklearn.model_selection import train_test_split\n", "from sklearn.ensemble import RandomForestClassifier\n", "from sklearn.metrics import accuracy_score\n", "\n", "# Model training pipeline\n", "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\n", "model = RandomForestClassifier()\n", "model.fit(X_train, y_train)"],
                outputs: []
              }
            ]
          }, null, 2)
        }
      ],
      script: [
        { 
          name: 'data_processor.py', 
          language: 'python', 
          type: 'script' as const,
          content: '# Data Processing Script\nimport pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import StandardScaler\n\ndef process_dataset(file_path):\n    """Process and clean dataset"""\n    df = pd.read_csv(file_path)\n    \n    # Data cleaning\n    df = df.dropna()\n    \n    # Feature scaling\n    scaler = StandardScaler()\n    numeric_cols = df.select_dtypes(include=[np.number]).columns\n    df[numeric_cols] = scaler.fit_transform(df[numeric_cols])\n    \n    return df\n\nif __name__ == "__main__":\n    processed_data = process_dataset("dataset.csv")\n    print(f"Processed {len(processed_data)} records")'
        },
        { 
          name: 'model_trainer.py', 
          language: 'python', 
          type: 'script' as const,
          content: '# Model Training Script\nimport tensorflow as tf\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import classification_report\nimport numpy as np\n\nclass ModelTrainer:\n    def __init__(self, model_config):\n        self.config = model_config\n        self.model = None\n        \n    def build_model(self, input_shape, num_classes):\n        """Build neural network model"""\n        self.model = tf.keras.Sequential([\n            tf.keras.layers.Dense(128, activation="relu", input_shape=input_shape),\n            tf.keras.layers.Dropout(0.2),\n            tf.keras.layers.Dense(64, activation="relu"),\n            tf.keras.layers.Dense(num_classes, activation="softmax")\n        ])\n        \n        self.model.compile(\n            optimizer="adam",\n            loss="sparse_categorical_crossentropy",\n            metrics=["accuracy"]\n        )\n        \n    def train(self, X, y, validation_split=0.2, epochs=10):\n        """Train the model"""\n        history = self.model.fit(\n            X, y,\n            validation_split=validation_split,\n            epochs=epochs,\n            batch_size=32,\n            verbose=1\n        )\n        return history'
        }
      ],
      dataset: [
        {
          name: 'SQL',
          language: 'sql',
          type: 'query',
          content: ''
        },
        {
          name: 'Table',
          language: 'tbl',
          type: 'table',
          content: ''
        },
        {
          name: 'Schema',
          language: 'schema',
          type: 'schema',
          content: ''
        }
      ]
    };
    if (editorMode === 'notebook' || editorMode === 'script') {
      return baseFiles[editorMode] as ContextFile[];
    } else if (editorMode === 'dataset') {
      return baseFiles.dataset as ContextFile[];
    }
    return [];
  };

  // Initialize with context files
  useEffect(() => {
    if (isOpen && tabs.length === 0) {
      const contextFiles = getContextFiles();
      const newTabs = contextFiles.map((file: ContextFile, index: number) => ({
        id: `file-${index}`,
        name: file.name,
        content: file.content,
        language: file.language,
        modified: false,
        type: file.type as 'notebook' | 'script' | 'dataset'
      }));
      setTabs(newTabs);
      if (newTabs.length > 0) {
        setActiveTab(newTabs[0].id);
        if (newTabs[0].type === 'notebook') {
          initializeNotebook(newTabs[0].content);
        }
      }
    }
  }, [isOpen, context, editorMode]);

  // Initialize notebook cells from content
  const initializeNotebook = (content: string) => {
    try {
      const notebook = JSON.parse(content);
      const cells: NotebookCell[] = notebook.cells?.map((cell: RawNotebookCell, index: number) => ({
        id: `cell-${index}`,
        type: cell.cell_type === 'markdown' ? 'markdown' : 'code',
        content: Array.isArray(cell.source) ? cell.source.join('') : cell.source || '',
        output: cell.outputs && cell.outputs.length > 0 ? JSON.stringify(cell.outputs, null, 2) : '',
        executed: false
      })) || [];
      setNotebookCells(cells);
    } catch {
      // If parsing fails, create a default notebook
      setNotebookCells([
        {
          id: 'cell-0',
          type: 'markdown',
          content: '# New Notebook\n\nWelcome to your new Jupyter notebook!',
          executed: false
        },
        {
          id: 'cell-1',
          type: 'code',
          content: 'print("Hello, QUADRAX•ML!")',
          executed: false
        }
      ]);
    }
  };

  const updateTabContent = (content: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === activeTab 
        ? { ...tab, content, modified: true }
        : tab
    ));
  };

  const updateCellContent = (cellId: string, content: string) => {
    setNotebookCells(prev => prev.map(cell =>
      cell.id === cellId ? { ...cell, content, executed: false } : cell
    ));
  };

  const addCell = (type: 'code' | 'markdown', afterCellId?: string) => {
    const newCell: NotebookCell = {
      id: `cell-${Date.now()}`,
      type,
      content: type === 'markdown' ? '# New Cell' : 'print("New cell")',
      executed: false
    };

    if (afterCellId) {
      const index = notebookCells.findIndex(cell => cell.id === afterCellId);
      setNotebookCells(prev => [
        ...prev.slice(0, index + 1),
        newCell,
        ...prev.slice(index + 1)
      ]);
    } else {
      setNotebookCells(prev => [...prev, newCell]);
    }
  };

  const deleteCell = (cellId: string) => {
    if (notebookCells.length > 1) {
      setNotebookCells(prev => prev.filter(cell => cell.id !== cellId));
    }
  };

  const executeCell = async (cellId: string) => {
    const cell = notebookCells.find(c => c.id === cellId);
    if (!cell || cell.type !== 'code') return;

    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      const mockOutput = `Executed: ${cell.content.split('\n')[0]}\nOutput: Success`;
      setNotebookCells(prev => prev.map(c =>
        c.id === cellId ? { ...c, output: mockOutput, executed: true } : c
      ));
      setIsRunning(false);
    }, 1000);
  };

  const runAllCells = async () => {
    setIsRunning(true);
    for (const cell of notebookCells) {
      if (cell.type === 'code') {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockOutput = `Executed: ${cell.content.split('\n')[0]}\nOutput: Success`;
        setNotebookCells(prev => prev.map(c =>
          c.id === cell.id ? { ...c, output: mockOutput, executed: true } : c
        ));
      }
    }
    setIsRunning(false);
  };

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
      if (newTabs[0].type === 'notebook') {
        initializeNotebook(newTabs[0].content);
      }
    } else if (newTabs.length === 0) {
      setActiveTab('');
      setNotebookCells([]);
    }
  };

  const saveFile = () => {
    if (activeTabData) {
      if (activeTabData.type === 'notebook') {
        // Save notebook with cells
        const notebookContent = {
          cells: notebookCells.map(cell => ({
            cell_type: cell.type,
            source: cell.content.split('\n').map(line => line + '\n'),
            outputs: cell.output ? [{ output_type: 'stream', text: cell.output }] : []
          })),
          metadata: {
            kernelspec: {
              display_name: "Python 3",
              language: "python",
              name: "python3"
            }
          }
        };
        updateTabContent(JSON.stringify(notebookContent, null, 2));
      }
      
      setTabs(prev => prev.map(tab => 
        tab.id === activeTab 
          ? { ...tab, modified: false }
          : tab
      ));
      console.log(`Saved ${activeTabData.name}`);
    }
  };

  const createNewFile = (type: 'notebook' | 'script' | 'dataset' = (editorMode === 'notebook' || editorMode === 'script' || editorMode === 'dataset' ? editorMode : 'notebook')) => {
    const extension = type === 'notebook' ? '.ipynb' : '.py';
    const newTab: FileTab = {
      id: `file-${Date.now()}`,
      name: `untitled${extension}`,
      content: type === 'notebook' 
        ? JSON.stringify({
            cells: [
              {
                cell_type: "markdown",
                source: ["# New Notebook"]
              },
              {
                cell_type: "code",
                source: ["print('Hello, World!')"],
                outputs: []
              }
            ]
          }, null, 2)
        : '# New Python script\nprint("Hello, World!")',
      language: type === 'notebook' ? 'jupyter' : 'python',
      modified: false,
      type
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
    if (type === 'notebook') {
      initializeNotebook(newTab.content);
    }
  };

  const switchMode = (newMode: 'notebook' | 'script' | 'dataset') => {
    setEditorMode(newMode);
    setIsTerminalOpen(false);
    if (newMode === 'notebook' || newMode === 'script') {
    setTabs([]);
    setActiveTab('');
    setNotebookCells([]);
    }
  };

  // Open terminal overlay
  const openTerminal = () => setIsTerminalOpen(true);

  // When switching to dataset mode, set tabs to dataset tools
  useEffect(() => {
    if (isOpen && editorMode === 'dataset') {
      const toolTabs = datasetTools.map(tool => ({
        id: `tool-${tool.key}`,
        name: tool.label,
        content: '',
        language: tool.key,
        modified: false,
        type: 'dataset' as const
      }));
      setTabs(toolTabs);
      if (toolTabs.length > 0) setActiveTab(toolTabs[0].id);
    }
  }, [isOpen, editorMode]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-[6%] left-[4%] w-[95.1%] h-[94%] bg-black z-40 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-[20vw]'} bg-gradient-to-b from-black to-[#005778] border-r border-[#00699a] flex flex-col transition-all duration-300`}>


        {!sidebarCollapsed && (
          <>
            {/* Mode Switcher */}
            <div className="p-0 border-b border-[#00699a] flex flex-col">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Editor Mode</h4>
              <div className="p-0">
                <button
                  onClick={() => switchMode('notebook')}
                  className={`flex-1 px-3 py-2 text-sm transition-colors duration-300 flex items-center gap-2 ${
                    editorMode === 'notebook' 
                      ? 'bg-[#00beef] text-black' 
                      : 'bg-black text-white hover:text-[#00beef]'
                  }`}
                >
                  <BookOpen size={14} />
                  Notebook
                </button>
                <button
                  onClick={() => switchMode('script')}
                  className={`px-3 py-2 text-sm transition-colors duration-300 items-center gap-2 ${
                    editorMode === 'script' 
                      ? 'bg-[#00beef] text-black' 
                      : 'bg-black text-white hover:bg-gray-500'
                  }`}
                >
                  <Code size={14} />
                  Script
                </button>
                <button
                  onClick={() => switchMode('dataset')}
                  className={`px-3 py-2 text-sm transition-colors duration-300 items-center gap-2 ${
                    editorMode === 'dataset' 
                      ? 'bg-[#00beef] text-black' 
                      : 'bg-black text-white hover:bg-gray-500'
                  }`}
                >
                  <DatabaseIcon size={14} />
                  Dataset
                </button>
                <button
                  onClick={openTerminal}
                  className={`px-3 py-2 text-sm transition-colors duration-300 items-center gap-2 bg-black text-white hover:text-[#00beef]`}
                >
                  <TerminalIcon size={14} />
                  Terminal
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-[#00699a]">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button
                  onClick={() => createNewFile('notebook')}
                  className="w-full flex items-center gap-3 p-2 text-white hover:bg-[#00699a] rounded transition-colors duration-300"
                >
                  <BookOpen size={16} className="text-[#00beef]" />
                  <span className="text-sm">New Notebook</span>
                </button>
                <button
                  onClick={() => createNewFile('script')}
                  className="w-full flex items-center gap-3 p-2 text-white hover:bg-[#00699a] rounded transition-colors duration-300"
                >
                  <Code size={16} className="text-[#00beef]" />
                  <span className="text-sm">New Script</span>
                </button>
                {editorMode === 'notebook' && (
                  <button
                    onClick={runAllCells}
                    disabled={isRunning}
                    className="w-full flex items-center gap-3 p-2 text-white hover:bg-[#00699a] disabled:opacity-50 rounded transition-colors duration-300"
                  >
                    <Play size={16} className="text-[#00beef]" />
                    <span className="text-sm">Run All Cells</span>
                  </button>
                )}
              </div>
            </div>

            {/* File Explorer */}
            <div className="flex-1 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-gray-300">Files</h4>
                <button
                  onClick={() => createNewFile()}
                  className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                  title="New File"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="space-y-1">
                {tabs.map(tab => (
                  <div
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      if (tab.type === 'notebook') {
                        initializeNotebook(tab.content);
                      }
                    }}
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors duration-300 ${
                      activeTab === tab.id ? 'bg-[#00699a] text-white' : 'text-gray-300 hover:bg-[#005778]'
                    }`}
                  >
                    {tab.type === 'notebook' ? <BookOpen size={14} /> : <FileText size={14} />}
                    <span className="text-sm flex-1">{tab.name}</span>
                    {tab.modified && <div className="w-2 h-2 bg-[#00beef] rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="h-16 bg-gradient-to-r from-black to-[#005778] border-b border-[#00699a] flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {editorMode === 'notebook' ? <BookOpen size={24} className="text-[#00beef]" /> : <Code size={24} className="text-[#00beef]" />}
            <h2 className="text-xl font-bold text-white">
              {editorMode === 'notebook' ? 'Jupyter Notebook Editor' : 'Script Editor'} - {context}
            </h2>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 mr-4">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-1 bg-black border border-[#00699a] text-white text-sm rounded focus:outline-none focus:border-[#00beef]"
              />
            </div>
            
            <button
              onClick={saveFile}
              className="p-2 bg-[#00beef] hover:bg-[#00699a] text-black rounded transition-colors duration-300"
              title="Save File"
            >
              <Save size={16} />
            </button>
            {editorMode === 'script' && (
              <button
                onClick={() => console.log('Run script')}
                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors duration-300"
                title="Run Script"
              >
                <Play size={16} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-300"
              title="Close Editor"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        {tabs.length > 0 && (
          <div className="flex bg-[#005778] border-b border-[#00699a] overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`flex items-center gap-2 px-4 py-2 border-r border-[#00699a] cursor-pointer transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-black text-white' : 'text-gray-300 hover:bg-[#00699a]'
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (tab.type === 'notebook') {
                    initializeNotebook(tab.content);
                  }
                }}
              >
                {editorMode === 'dataset' ? <DatabaseIcon size={14} /> : tab.type === 'notebook' ? <BookOpen size={14} /> : <FileText size={14} />}
                <span className="text-sm">{tab.name}</span>
                {tab.modified && <div className="w-1 h-1 bg-[#00beef] rounded-full"></div>}
                {editorMode !== 'dataset' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={12} />
                </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Editor Content */}
        <div className="flex-1 flex flex-col relative">
          {editorMode === 'dataset' ? (
            <div className="flex-1 bg-black overflow-y-auto p-6">
              {/* Dataset Tools as Tabs */}
              {(() => {
                const activeTool = datasetTools.find(tool => `tool-${tool.key}` === activeTab);
                if (!activeTool) return null;
                switch (activeTool.key) {
                  case 'aiSearch':
                    return (
                      <div>
                        <h3 className="text-xl font-bold text-white mb-4">AI Search Service</h3>
                        <input type="text" placeholder="Ask AI to find data, tables, or insights..." className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white rounded-lg mb-2" />
                        <div className="text-gray-400 text-sm">AI-powered search results will appear here.</div>
                      </div>
                    );
                  case 'databases':
                    return <div className="text-gray-400 text-sm">List and connect to databases here.</div>;
                  case 'sql':
                    return <div className="text-gray-400 text-sm">SQL query editor and results.</div>;
                  case 'json':
                    return <div className="text-gray-400 text-sm">JSON data viewer/editor.</div>;
                  case 'tables':
                    return <div className="text-gray-400 text-sm">Table data preview and manipulation.</div>;
                  case 'schema':
                    return <div className="text-gray-400 text-sm">Schema explorer and editor.</div>;
                  case 'visualization':
                    return <div className="text-gray-400 text-sm">Data visualization tools and charts.</div>;
                  case 'functions':
                    return <div className="text-gray-400 text-sm">Data science related functions and utilities.</div>;
                  default:
                    return null;
                }
              })()}
            </div>
          ) : activeTabData ? (
            <div className="flex-1 bg-black">
              {activeTabData.type === 'notebook' ? (
                /* Jupyter Notebook Interface */
                <div className="h-full overflow-y-auto custom-scrollbar">
                  <div className="p-4 space-y-4">
                    {notebookCells.map((cell, index) => (
                      <div key={cell.id} className="border border-[#00699a]/30 rounded-lg overflow-hidden">
                        {/* Cell Header */}
                        <div className="flex items-center justify-between p-2 bg-[#005778] border-b border-[#00699a]/30">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-300">
                              {cell.type === 'code' ? `In [${cell.executed ? index + 1 : ' '}]:` : 'Markdown'}
                            </span>
                            {cell.type === 'code' && (
                              <button
                                onClick={() => executeCell(cell.id)}
                                disabled={isRunning}
                                className="p-1 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 text-black disabled:text-gray-400 rounded text-xs"
                              >
                                <Play size={12} />
                              </button>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => addCell('code', cell.id)}
                              className="p-1 text-gray-400 hover:text-white"
                              title="Add Code Cell"
                            >
                              <Plus size={12} />
                            </button>
                            <button
                              onClick={() => deleteCell(cell.id)}
                              className="p-1 text-gray-400 hover:text-red-400"
                              title="Delete Cell"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                        
                        {/* Cell Content */}
                        <div className="p-4">
                          {cell.type === 'code' ? (
                          <textarea
                            value={cell.content}
                            onChange={(e) => updateCellContent(cell.id, e.target.value)}
                            className="w-full bg-transparent text-white font-mono text-sm resize-none outline-none min-h-[60px]"
                            style={{ lineHeight: '1.5' }}
                            spellCheck={false}
                          />
                          ) : (
                            <div className="text-white text-base whitespace-pre-line">
                              {cell.content}
                            </div>
                          )}
                        </div>
                        
                        {/* Cell Output */}
                        {cell.output && (
                          <div className="border-t border-[#00699a]/30 p-4 bg-black/50">
                            <div className="text-xs text-gray-400 mb-2">Output:</div>
                            <pre className="text-green-400 text-sm whitespace-pre-wrap font-mono">
                              {cell.output}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Add Cell Button */}
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => addCell('code')}
                        className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded transition-colors duration-300 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Code Cell
                      </button>
                      <button
                        onClick={() => addCell('markdown')}
                        className="px-4 py-2 bg-[#005778] hover:bg-[#00699a] text-white rounded border border-[#00699a] transition-colors duration-300 flex items-center gap-2"
                      >
                        <Plus size={16} />
                        Add Markdown Cell
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Script Editor Interface */
                <textarea
                  ref={editorRef}
                  value={activeTabData.content}
                  onChange={(e) => updateTabContent(e.target.value)}
                  className="flex-1 p-4 bg-black text-white font-mono text-sm w-[100%] h-full resize-none outline-none custom-scrollbar"
                  style={{ 
                    lineHeight: '1.5',
                    tabSize: 2
                  }}
                  spellCheck={false}
                />
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="text-center text-gray-400">
                {editorMode === 'notebook' ? <BookOpen size={48} className="mx-auto mb-4" /> : <FileText size={48} className="mx-auto mb-4" />}
                <p className="text-lg">No file selected</p>
                <p className="text-sm">Create a new {editorMode} or select one from the sidebar</p>
              </div>
            </div>
          )}
          {/* Terminal overlay for all modes */}
          {isTerminalOpen && (
            <div className="absolute left-0 bottom-0 w-full min-h-[40%] max-h-[60%] z-10">
              <Terminal 
                isOpen={isTerminalOpen}
                onClose={() => setIsTerminalOpen(false)}
                shell={terminalShell}
                workingDirectory={workingDirectory}
                context={context}
              />
            </div>
          )}
        </div>

        {/* Editor Footer */}
        <div className="h-8 bg-gradient-to-r from-[#005778] to-black border-t border-[#00699a] flex items-center justify-between px-4 text-xs text-gray-400">
          <span>
            {activeTabData ? `${activeTabData.type} | ${activeTabData.language} | ${activeTabData.content.split('\n').length} lines` : 'No file open'}
          </span>
          
          <span>Working Directory: {workingDirectory} | Mode: {editorMode}</span>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
