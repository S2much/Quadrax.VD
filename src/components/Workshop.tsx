import { useState } from 'react';
import { Plus, Terminal as TerminalIcon, Code, Play, Settings, Database, Brain } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Workshop() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const workstations = [
    {
      id: 1,
      name: 'quadro-ml-v_2',
      dateCreated: '17/06/2025',
      age: '253ds',
      status: 'Active',
      description: 'Main ML development environment with TensorFlow and PyTorch',
      resources: { cpu: '8 cores', memory: '32GB', storage: '500GB' }
    },
    {
      id: 2,
      name: 'data-processing-env',
      dateCreated: '15/06/2025',
      age: '255ds',
      status: 'Stopped',
      description: 'Dedicated environment for large-scale data processing',
      resources: { cpu: '16 cores', memory: '64GB', storage: '1TB' }
    }
  ];

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/20';
      case 'Stopped': return 'text-red-400 bg-red-400/20';
      case 'Starting': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <>
      {/* Main Component Content */}
      <section className="p-6 min-h-screen">
        <div className="text-white mb-6">
          <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
            Workshop
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg shadow-2xl">
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h4 className="text-2xl text-white font-normal flex-1 border-r-2 border-b-2 border-[#00699a] p-2">
              Workstations
            </h4>
            
            {/* Development Tools */}
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditorOpen(true)}
                className="text-[#00beef] border-2 border-[#00beef] px-4 py-2 rounded bg-black/50 flex items-center gap-2 hover:bg-[#00699a] hover:text-white transition-all duration-300"
              >
                <Code size={20} /> Open Editor
              </button>
              <button 
                onClick={() => openTerminal('bash')}
                className="text-[#00beef] border-2 border-[#00beef] px-4 py-2 rounded bg-black/50 flex items-center gap-2 hover:bg-[#00699a] hover:text-white transition-all duration-300"
              >
                <TerminalIcon size={20} /> Open Terminal
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="text-white border border-[#00699a] px-4 py-2 bg-black/50 rounded hover:bg-[#00699a] transition-colors duration-300">
                Import
              </button>
              <button className="text-white border border-[#00699a] px-4 py-2 bg-black/50 rounded hover:bg-[#00699a] transition-colors duration-300">
                Export
              </button>
            </div>
          </div>

          {/* CLI Command Examples */}
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
            <h5 className="text-white font-semibold mb-3">Quick CLI Commands</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#00beef] font-mono">quadrax init</span>
                <span className="text-gray-300 ml-2">- Initialize new workstation</span>
              </div>
              <div>
                <span className="text-[#00beef] font-mono">quadrax list</span>
                <span className="text-gray-300 ml-2">- List all workstations</span>
              </div>
              <div>
                <span className="text-[#00beef] font-mono">quadrax start {'<name>'}</span>
                <span className="text-gray-300 ml-2">- Start workstation</span>
              </div>
              <div>
                <span className="text-[#00beef] font-mono">quadrax stop {'<name>'}</span>
                <span className="text-gray-300 ml-2">- Stop workstation</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <ul id="ws-options" className="flex flex-row gap-2 p-1 mb-4">
              {['Edit', 'Train', 'Evaluate', 'Extract', 'Delete', 'Start', 'Stop', 'Configure'].map((action) => (
                <li key={action} className="px-4 py-2 border border-[#00beef] rounded-lg text-white hover:bg-[#00699a] cursor-pointer transition-colors duration-300">
                  {action}
                </li>
              ))}
            </ul>

            <div className="bg-black/50 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="p-3 bg-[#004667] text-white">#</th>
                    <th className="p-3 bg-[#004667] text-white">Name</th>
                    <th className="p-3 bg-[#004667] text-white">Description</th>
                    <th className="p-3 bg-[#004667] text-white">Resources</th>
                    <th className="p-3 bg-[#004667] text-white">Date Created</th>
                    <th className="p-3 bg-[#004667] text-white">Age</th>
                    <th className="p-3 bg-[#004667] text-white">Status</th>
                    <th className="p-3 bg-[#004667] text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workstations.map(ws => (
                    <tr key={ws.id} className="hover:bg-[#00699a]/20 transition-colors duration-300">
                      <td className="p-3 text-white">{ws.id}</td>
                      <td className="p-3 text-white font-medium">{ws.name}</td>
                      <td className="p-3 text-gray-300 text-sm">{ws.description}</td>
                      <td className="p-3 text-gray-300 text-sm">
                        <div>{ws.resources.cpu}</div>
                        <div>{ws.resources.memory}</div>
                        <div>{ws.resources.storage}</div>
                      </td>
                      <td className="p-3 text-white">{ws.dateCreated}</td>
                      <td className="p-3 text-white">{ws.age}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(ws.status)}`}>
                          {ws.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button className="p-1 bg-[#00699a] hover:bg-[#00beef] text-white rounded transition-colors duration-300">
                            <Play size={14} />
                          </button>
                          <button className="p-1 bg-black/50 hover:bg-[#005778] text-white rounded border border-[#00699a] transition-colors duration-300">
                            <Settings size={14} />
                          </button>
                          <button 
                            onClick={() => setIsEditorOpen(true)}
                            className="p-1 bg-[#00beef] hover:bg-[#00699a] text-black rounded transition-colors duration-300"
                          >
                            <Code size={14} />
                          </button>
                          <button 
                            onClick={() => openTerminal('bash')}
                            className="p-1 bg-[#00beef] hover:bg-[#00699a] text-black rounded transition-colors duration-300"
                          >
                            <TerminalIcon size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {[...Array(2)].map((_, i) => (
                    <tr key={`empty-${i}`} className="opacity-50">
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                      <td className="p-3 text-gray-400">---</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-b from-black via-black to-[#005778] mt-8 p-6 rounded-lg">
            <h4 className="text-2xl text-white font-normal mb-6 border-b-2 border-[#00699a] pb-2">
              Create a Workstation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form className="bg-gradient-to-b from-[#005778] via-black to-black border border-[#00beef] rounded-lg p-6">
                <div className="text-center mb-4">
                  <button 
                    type="button"
                    className="w-20 h-20 text-4xl font-medium text-white border-2 border-[#00beef] bg-black rounded-lg hover:bg-[#00699a] transition-all duration-300 flex items-center justify-center"
                  >
                    <Plus />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Workstation Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g., ml-training-env"
                      className="w-full px-3 py-2 bg-black border border-[#00699a] text-white rounded focus:outline-none focus:border-[#00beef]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Template</label>
                    <select className="w-full px-3 py-2 bg-black border border-[#00699a] text-white rounded focus:outline-none focus:border-[#00beef]">
                      <option>ML Development</option>
                      <option>Data Processing</option>
                      <option>Deep Learning</option>
                      <option>Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Resources</label>
                    <div className="grid grid-cols-3 gap-2">
                      <select className="px-2 py-1 bg-black border border-[#00699a] text-white rounded text-sm">
                        <option>2 CPU</option>
                        <option>4 CPU</option>
                        <option>8 CPU</option>
                        <option>16 CPU</option>
                      </select>
                      <select className="px-2 py-1 bg-black border border-[#00699a] text-white rounded text-sm">
                        <option>8GB RAM</option>
                        <option>16GB RAM</option>
                        <option>32GB RAM</option>
                        <option>64GB RAM</option>
                      </select>
                      <select className="px-2 py-1 bg-black border border-[#00699a] text-white rounded text-sm">
                        <option>100GB</option>
                        <option>250GB</option>
                        <option>500GB</option>
                        <option>1TB</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded transition-colors duration-300"
                  >
                    Create Workstation
                  </button>
                </div>
              </form>

              <div className="space-y-4">
                <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="text-[#00beef]" size={24} />
                    <h5 className="text-white font-semibold">Data Integration</h5>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Connect to DataKits, external databases, and cloud storage for seamless data access.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <Brain className="text-[#00beef]" size={24} />
                    <h5 className="text-white font-semibold">ML Frameworks</h5>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Pre-configured environments with TensorFlow, PyTorch, Scikit-learn, and more.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                  <div className="flex items-center gap-3 mb-3">
                    <TerminalIcon className="text-[#00beef]" size={24} />
                    <h5 className="text-white font-semibold">Development Tools</h5>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Integrated code editor and terminal access with Bash and PowerShell for advanced operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="workshop"
          workingDirectory="/workspace"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/workspace"
          context="workshop"
        />
      )}
    </>
  );
}

export default Workshop;