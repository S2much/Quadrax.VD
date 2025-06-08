import { Plus, Terminal, Code } from 'lucide-react';

function Workshop() {
  const workstations = [
    {
      id: 1,
      name: 'quadro-ml-v_2',
      dateCreated: '17/06/2025',
      age: '253ds',
      status: 'Active'
    }
  ];

  return (
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
          <div className="flex gap-2">
            <button className="text-white border border-[#00699a] px-4 py-2 bg-black/50 rounded hover:bg-[#00699a] transition-colors duration-300">
              Import
            </button>
            <button className="text-white border border-[#00699a] px-4 py-2 bg-black/50 rounded hover:bg-[#00699a] transition-colors duration-300">
              Export
            </button>
          </div>
          <div className="flex gap-2">
            <button className="text-[#00beef] border-2 border-[#00beef] px-4 py-2 rounded bg-black/50 flex items-center gap-2 hover:bg-[#00699a] hover:text-white transition-all duration-300">
              <Code size={20} /> VSCode
            </button>
            <button className="text-[#00beef] border-2 border-[#00beef] px-4 py-2 rounded bg-black/50 flex items-center gap-2 hover:bg-[#00699a] hover:text-white transition-all duration-300">
              <Terminal size={20} /> Terminal
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <ul id="ws-options" className="flex-row gap-2 p-2 mb-4">
            {['Edit', 'Train', 'Evaluate', 'Extract', 'Delete'].map((action) => (
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
                  <th className="p-3 bg-[#004667] text-white">Date Created</th>
                  <th className="p-3 bg-[#004667] text-white">Age</th>
                  <th className="p-3 bg-[#004667] text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                {workstations.map(ws => (
                  <tr key={ws.id} className="hover:bg-[#00699a]/20 transition-colors duration-300">
                    <td className="p-3 text-white">{ws.id}</td>
                    <td className="p-3 text-white font-medium">{ws.name}</td>
                    <td className="p-3 text-white">{ws.dateCreated}</td>
                    <td className="p-3 text-white">{ws.age}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-green-600 text-white rounded-full text-sm">
                        {ws.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {[...Array(3)].map((_, i) => (
                  <tr key={`empty-${i}`} className="opacity-50">
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

          <form className="max-w-md mx-auto bg-gradient-to-b from-[#005778] via-black to-black border border-[#00beef] rounded-lg p-6 flex flex-col items-center">
            <button 
              type="button"
              className="w-20 h-20 text-4xl font-medium text-white border-2 border-[#00beef] bg-black rounded-lg mb-4 hover:bg-[#00699a] transition-all duration-300 flex items-center justify-center"
            >
              <Plus />
            </button>
            <label className="text-xl text-white mb-3">Initialize Workstation</label>
            <p className="text-white text-center text-sm leading-relaxed">
              Create and setup a dataset configuration tool, database, pipeline, training environment, model and more.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Workshop;