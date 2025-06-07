function VirtualMachines() {
  return (
    <section className="h-[90vh] p-6">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000]">
          Virtual Machines
        </h2>
        <hr className="border-none bg-[#00beef] h-[1px] w-full my-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a]"
          >
            <h3 className="text-xl font-semibold mb-4">VM Instance {i}</h3>
            <p className="mb-4">Run your experiments on powerful virtual machines with dedicated resources.</p>
            <div className="flex justify-between items-center text-sm">
              <span>8 CPU • 16GB RAM</span>
              <span className="text-[#00beef]">Available</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default VirtualMachines