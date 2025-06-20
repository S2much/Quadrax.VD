import { useState } from 'react';
import { Plus, Terminal as TerminalIcon, Code, Play, Settings, Database, Brain } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';
import NewWorkstationModal from './NewWorkstationModal';

interface WorkstationData {
  name: string;
  function: string;
  nature: string[];
  description: string;
}

function Workshop() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isNewWorkstationOpen, setIsNewWorkstationOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const handleCreateWorkstation = (workstationData: WorkstationData) => {
    console.log('Creating workstation:', workstationData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    
    // You could add the new workstation to your state here
    // setWorkstations(prev => [...prev, newWorkstation]);
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

          {/* Empty State */}
          <div className="text-center py-16">
            <TerminalIcon size={64} className="mx-auto text-gray-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">No Workstations Yet</h3>
            <p className="text-gray-300 mb-8 text-lg">
              Create your first workstation to start developing, training models, or processing data.
            </p>
            
            <button
              onClick={() => setIsNewWorkstationOpen(true)}
              className="px-8 py-4 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Initialize First Workstation
            </button>
          </div>

          {/* Empty Table Structure */}
          <div className="bg-black/50 rounded-lg overflow-hidden mt-8">
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
                {[...Array(5)].map((_, i) => (
                  <tr key={`empty-${i}`} className="opacity-30">
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

          <div className="bg-gradient-to-b from-black via-black to-[#005778] mt-8 p-6 rounded-lg">
            <h4 className="text-2xl text-white font-normal mb-6 border-b-2 border-[#00699a] pb-2">
              Create a Workstation
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-b from-[#005778] via-black to-black border border-[#00beef] rounded-lg p-6">
                <div className="text-center mb-4">
                  <button 
                    type="button"
                    onClick={() => setIsNewWorkstationOpen(true)}
                    className="w-20 h-20 text-4xl font-medium text-white border-2 border-[#00beef] bg-black rounded-lg hover:bg-[#00699a] transition-all duration-300 flex items-center justify-center group"
                  >
                    <Plus className="group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={() => setIsNewWorkstationOpen(true)}
                    className="w-full py-3 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Initialize Workstation
                  </button>
                  <p className="text-gray-300 text-sm mt-2">
                    Create a new development environment with custom configuration
                  </p>
                </div>
              </div>

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

      {/* Modals and Overlays */}
      <NewWorkstationModal
        isOpen={isNewWorkstationOpen}
        onClose={() => setIsNewWorkstationOpen(false)}
        onCreateWorkstation={handleCreateWorkstation}
        triggerSource="workshop"
      />

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