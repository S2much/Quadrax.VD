
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
    <section className="h-[90vh] p-6">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-[#00000055] p-2">
          Workshop
        </h2>
        <hr className="border-none bg-black h-[2px] w-full my-4" />
      </div>

      <div className="bg-black p-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-2xl text-white font-normal w-3/5 border-r-2 border-b-2 border-[#00699a] p-2">
            Workstations
          </h4>
          <div className="space-x-2">
            <button className="text-white  border-white p-2 bg-black italic">
              Import
            </button>
            <button className="text-white  border-white p-2 bg-black italic">
              Export
            </button>
          </div>
          <div className="space-x-2">
              <button className="text-[#15b0f8] border-2 border-[#00beef] p-2 rounded bg-black italic flex items-center gap-2">
                <Code size={20} /> Open VScode
              </button>
              <button className="text-[#15b0f8] border-2 border-[#00beef] p-2 rounded bg-black italic flex items-center gap-2">
                <Terminal size={20} /> Open Terminal
              </button>
            </div>
        </div>

        <div className="w-4/5">
          <ul className="flex gap-2 p-2 mb-4">
            {['Edit', 'Train', 'Evaluate', 'Extract', 'Delete'].map((action) => (
              <li key={action} className="px-5 py-2 border border-[#00beef] rounded-lg text-white">
                {action}
              </li>
            ))}
          </ul>

          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="p-2 bg-[#004667]">#</th>
                <th className="p-2 bg-[#004667] w-1/2">Name</th>
                <th className="p-2 bg-[#004667] w-1/4">Date created</th>
                <th className="p-2 bg-[#004667]">Age</th>
                <th className="p-2 bg-[#004667]">Status</th>
              </tr>
            </thead>
            <tbody>
              {workstations.map(ws => (
                <tr key={ws.id}>
                  <td className="p-2 bg-[#00151f]">{ws.id}</td>
                  <td className="p-2 bg-[#00151f]">{ws.name}</td>
                  <td className="p-2 bg-[#00151f]">{ws.dateCreated}</td>
                  <td className="p-2 bg-[#00151f]">{ws.age}</td>
                  <td className="p-2 bg-[#00151f]">{ws.status}</td>
                </tr>
              ))}
              {[...Array(3)].map((_, i) => (
                <tr key={`empty-${i}`}>
                  <td className="p-2 bg-[#00151f]">---</td>
                  <td className="p-2 bg-[#00151f]">---</td>
                  <td className="p-2 bg-[#00151f]">---</td>
                  <td className="p-2 bg-[#00151f]">---</td>
                  <td className="p-2 bg-[#00151f]">---</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-gradient-to-b from-black via-black to-[#005778] mt-6 p-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-2xl text-white font-normal w-3/5 border-r-2 border-b-2 border-[#00699a] p-2">
              Create a workstation
            </h4>
          </div>

          <form className="w-1/2 mx-auto bg-gradient-to-b from-[#005778] via-black to-black border border-[#00beef] rounded-lg p-5 flex flex-col items-center mt-5">
            <button 
              type="button"
              className="w-24 text-4xl font-medium text-white border-2 border-[#00beef] bg-black rounded-lg mb-3"
            >
              <Plus />
            </button>
            <label className="text-2xl text-white">Initialize workstation</label>
            <p className="text-white text-center mt-2">
              Create and setup a dataset configuration tool, database, pipeline, training environment, model and more.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Workshop;