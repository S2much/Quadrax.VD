import { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Database, Brain, Zap, Clock, CheckCircle, AlertTriangle, Users, Plus, ArrowUp, ArrowDown, Play, Settings } from 'lucide-react';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
              Dashboard
            </h2>
            <h3 className="text-white text-xl mt-2 ml-4">Welcome to QUADRAX•ML</h3>
          </div>
          <div className="flex gap-2">
            {['1d', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-2 rounded-lg transition-colors duration-300 ${
                  timeRange === range ? 'bg-[#00699a] text-white' : 'bg-black/50 text-gray-300 hover:bg-[#005778]'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      {/* Empty State - No Data Yet */}
      <div className="text-center py-16">
        <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
          <BarChart3 size={64} className="mx-auto text-gray-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-4">No Data Available</h3>
          <p className="text-gray-300 mb-8 text-lg">
            Start by creating your first workstation, uploading datasets, or training models to see analytics and metrics here.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
              <Brain className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Create Workstation</h4>
              <p className="text-gray-300 text-sm">Set up your first development environment</p>
            </button>
            
            <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
              <Database className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">Upload Dataset</h4>
              <p className="text-gray-300 text-sm">Add your first dataset to get started</p>
            </button>
          </div>
        </div>
      </div>

      {/* Placeholder Metrics - All Zero */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Brain className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>--</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-gray-300 text-sm">Active Models</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Database className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>--</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-gray-300 text-sm">Datasets</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Activity className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>--</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-gray-300 text-sm">Pipelines</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span>--</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-gray-300 text-sm">Workstations</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Brain className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Initialize Workstation</h4>
            <p className="text-gray-300 text-sm">Create your first development environment</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Database className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Create DataKit</h4>
            <p className="text-gray-300 text-sm">Upload and manage your datasets</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Activity className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Setup Pipeline</h4>
            <p className="text-gray-300 text-sm">Configure automated workflows</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <TrendingUp className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">New Codesheet</h4>
            <p className="text-gray-300 text-sm">Start interactive development</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;