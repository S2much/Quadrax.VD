import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Activity, Database, Brain, Zap, Clock, CheckCircle, AlertTriangle, Users, Plus, ArrowUp, ArrowDown, Play, Settings, Star, Target, Cpu, HardDrive, Gauge } from 'lucide-react';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState({
    modelsDeployed: 0,
    datasetsProcessed: 0,
    manufacturingJobs: 0,
    activeWorkstations: 0,
    cpuUsage: 0,
    memoryUsage: 0,
    storageUsage: 0,
    successRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading real metrics
  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics({
        modelsDeployed: 12,
        datasetsProcessed: 47,
        manufacturingJobs: 8,
        activeWorkstations: 3,
        cpuUsage: 67,
        memoryUsage: 45,
        storageUsage: 78,
        successRate: 94.7
      });
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [timeRange]);

  const chartData = [
    { name: 'Mon', models: 4, datasets: 8, jobs: 2 },
    { name: 'Tue', models: 3, datasets: 12, jobs: 4 },
    { name: 'Wed', models: 6, datasets: 15, jobs: 3 },
    { name: 'Thu', models: 8, datasets: 10, jobs: 6 },
    { name: 'Fri', models: 5, datasets: 18, jobs: 5 },
    { name: 'Sat', models: 2, datasets: 6, jobs: 1 },
    { name: 'Sun', models: 1, datasets: 4, jobs: 2 }
  ];

  const recentActivity = [
    { id: 1, type: 'model', action: 'deployed', name: 'Customer Classifier v2.1', time: '2 minutes ago', status: 'success' },
    { id: 2, type: 'manufacture', action: 'completed', name: 'Fine-tuning Job #47', time: '15 minutes ago', status: 'success' },
    { id: 3, type: 'dataset', action: 'processed', name: 'Sales Data Q4', time: '1 hour ago', status: 'success' },
    { id: 4, type: 'workstation', action: 'started', name: 'ML Training Environment', time: '2 hours ago', status: 'info' },
    { id: 5, type: 'model', action: 'training', name: 'Sentiment Analysis v3', time: '3 hours ago', status: 'warning' }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'model': return Brain;
      case 'manufacture': return Zap;
      case 'dataset': return Database;
      case 'workstation': return Activity;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Brain className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+23%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {isLoading ? '...' : metrics.modelsDeployed}
          </div>
          <div className="text-gray-300 text-sm">Models Deployed</div>
          <div className="mt-2 text-xs text-gray-400">This {timeRange}</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Database className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+15%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {isLoading ? '...' : metrics.datasetsProcessed}
          </div>
          <div className="text-gray-300 text-sm">Datasets Processed</div>
          <div className="mt-2 text-xs text-gray-400">This {timeRange}</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Zap className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+31%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {isLoading ? '...' : metrics.manufacturingJobs}
          </div>
          <div className="text-gray-300 text-sm">Manufacturing Jobs</div>
          <div className="mt-2 text-xs text-gray-400">This {timeRange}</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Activity className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-blue-400 text-sm">
              <span>Live</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {isLoading ? '...' : metrics.activeWorkstations}
          </div>
          <div className="text-gray-300 text-sm">Active Workstations</div>
          <div className="mt-2 text-xs text-gray-400">Currently running</div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Chart */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00699a]/30">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="text-[#00beef]" size={24} />
            Weekly Activity
          </h3>
          <div className="space-y-4">
            {chartData.map((day, index) => (
              <div key={day.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{day.name}</span>
                  <span className="text-[#00beef]">{day.models + day.datasets + day.jobs} total</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div 
                    className="bg-blue-500 rounded-sm transition-all duration-500"
                    style={{ width: `${(day.models / 20) * 100}%` }}
                  />
                  <div 
                    className="bg-green-500 rounded-sm transition-all duration-500"
                    style={{ width: `${(day.datasets / 20) * 100}%` }}
                  />
                  <div 
                    className="bg-purple-500 rounded-sm transition-all duration-500"
                    style={{ width: `${(day.jobs / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
              <span className="text-gray-300">Models</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-gray-300">Datasets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
              <span className="text-gray-300">Manufacturing</span>
            </div>
          </div>
        </div>

        {/* System Resources */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00699a]/30">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Gauge className="text-[#00beef]" size={24} />
            System Resources
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-[#00beef]" />
                  <span className="text-gray-300">CPU Usage</span>
                </div>
                <span className="text-white font-semibold">{metrics.cpuUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${metrics.cpuUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[#00beef]" />
                  <span className="text-gray-300">Memory Usage</span>
                </div>
                <span className="text-white font-semibold">{metrics.memoryUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${metrics.memoryUsage}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive size={16} className="text-[#00beef]" />
                  <span className="text-gray-300">Storage Usage</span>
                </div>
                <span className="text-white font-semibold">{metrics.storageUsage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-500 to-orange-400 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${metrics.storageUsage}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#00699a]/30">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Success Rate</span>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-white font-semibold">{metrics.successRate}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00699a]/30 mb-8">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="text-[#00beef]" size={24} />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-gradient-to-r from-black/50 to-[#005778]/30 rounded-lg hover:from-[#005778]/30 hover:to-[#00699a]/30 transition-all duration-300">
                <div className="p-2 bg-[#00beef]/20 rounded-lg">
                  <IconComponent size={20} className="text-[#00beef]" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">
                    {activity.name} <span className="text-gray-400">was {activity.action}</span>
                  </div>
                  <div className="text-sm text-gray-400">{activity.time}</div>
                </div>
                <div className={`text-sm font-medium ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00699a]/30">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Brain className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Deploy Model</h4>
            <p className="text-gray-300 text-sm">Deploy trained models to production</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Zap className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Start Manufacturing</h4>
            <p className="text-gray-300 text-sm">Create fine-tuning jobs with feedback</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Database className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Process Dataset</h4>
            <p className="text-gray-300 text-sm">Upload and validate new datasets</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Activity className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Launch Workstation</h4>
            <p className="text-gray-300 text-sm">Start new development environment</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;