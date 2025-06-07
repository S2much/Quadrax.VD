function VirtualMachines() {
  const vmInstances = [
    { id: 1, name: 'ML-Training-01', cpu: '8 CPU', ram: '16GB RAM', status: 'Available', usage: '23%' },
    { id: 2, name: 'Data-Processing-02', cpu: '16 CPU', ram: '32GB RAM', status: 'Running', usage: '87%' },
    { id: 3, name: 'Model-Inference-03', cpu: '4 CPU', ram: '8GB RAM', status: 'Available', usage: '12%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-400';
      case 'Running': return 'text-yellow-400';
      case 'Stopped': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          Virtual Machines
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vmInstances.map((vm) => (
          <div
            key={vm.id}
            className="bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a] border border-[#00699a]/30"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{vm.name}</h3>
              <span className={`text-sm font-medium ${getStatusColor(vm.status)}`}>
                {vm.status}
              </span>
            </div>
            
            <p className="mb-4 text-gray-300">
              Run your experiments on powerful virtual machines with dedicated resources.
            </p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-sm">
                <span>Configuration:</span>
                <span className="text-[#00beef]">{vm.cpu} • {vm.ram}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Usage:</span>
                <span className="text-[#00beef]">{vm.usage}</span>
              </div>
            </div>

            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                style={{ width: vm.usage }}
              ></div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-4 rounded transition-colors duration-300">
                Connect
              </button>
              <button className="flex-1 bg-black/50 hover:bg-[#005778] text-white py-2 px-4 rounded border border-[#00699a] transition-colors duration-300">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Create New VM Instance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <h4 className="text-lg font-semibold text-white mb-2">Basic</h4>
            <p className="text-gray-300 text-sm mb-3">Perfect for development and testing</p>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>• 2 CPU Cores</li>
              <li>• 4GB RAM</li>
              <li>• 50GB Storage</li>
            </ul>
            <button className="w-full bg-[#00699a] hover:bg-[#00beef] text-white py-2 rounded transition-colors duration-300">
              Launch Basic
            </button>
          </div>
          
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00beef] border-2">
            <h4 className="text-lg font-semibold text-white mb-2">Standard</h4>
            <p className="text-gray-300 text-sm mb-3">Ideal for ML training and processing</p>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>• 8 CPU Cores</li>
              <li>• 16GB RAM</li>
              <li>• 200GB Storage</li>
            </ul>
            <button className="w-full bg-[#00beef] hover:bg-[#00699a] text-black font-semibold py-2 rounded transition-colors duration-300">
              Launch Standard
            </button>
          </div>
          
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <h4 className="text-lg font-semibold text-white mb-2">Premium</h4>
            <p className="text-gray-300 text-sm mb-3">High-performance for complex models</p>
            <ul className="text-sm text-gray-300 space-y-1 mb-4">
              <li>• 16 CPU Cores</li>
              <li>• 64GB RAM</li>
              <li>• 500GB Storage</li>
            </ul>
            <button className="w-full bg-[#00699a] hover:bg-[#00beef] text-white py-2 rounded transition-colors duration-300">
              Launch Premium
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VirtualMachines;