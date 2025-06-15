import { useState } from 'react';
import { BarChart3, TrendingUp, Activity, Database, Brain, Zap, Clock, CheckCircle, AlertTriangle, Users, ArrowUp, ArrowDown, Play, Settings } from 'lucide-react';

function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Mock data for the quadro-ml-v_2 model
  const modelMetrics = {
    accuracy: 94.7,
    precision: 95.2,
    recall: 94.1,
    f1Score: 94.6,
    latency: 120,
    throughput: 1250,
    uptime: 99.8
  };

  const recentActivity = [
    { time: '2 min ago', action: 'Model inference completed', status: 'success', count: 1247 },
    { time: '15 min ago', action: 'Data pipeline executed', status: 'success', count: 1 },
    { time: '1 hour ago', action: 'Training job started', status: 'running', count: 1 },
    { time: '3 hours ago', action: 'Dataset uploaded', status: 'success', count: 1 },
    { time: '6 hours ago', action: 'Model deployed', status: 'success', count: 1 }
  ];

  const performanceData = [
    { time: '00:00', accuracy: 94.2, latency: 125 },
    { time: '04:00', accuracy: 94.5, latency: 118 },
    { time: '08:00', accuracy: 94.7, latency: 120 },
    { time: '12:00', accuracy: 94.8, latency: 115 },
    { time: '16:00', accuracy: 94.6, latency: 122 },
    { time: '20:00', accuracy: 94.7, latency: 120 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-green-400" />;
      case 'running': return <Clock size={16} className="text-yellow-400 animate-spin" />;
      case 'warning': return <AlertTriangle size={16} className="text-yellow-400" />;
      default: return <CheckCircle size={16} className="text-gray-400" />;
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
            <h3 className="text-white text-xl mt-2 ml-4">Welcome back, Dr. Alex Chen</h3>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Brain className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+2.3%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{modelMetrics.accuracy}%</div>
          <div className="text-gray-300 text-sm">Model Accuracy</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Zap className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowDown size={16} />
              <span>-5ms</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{modelMetrics.latency}ms</div>
          <div className="text-gray-300 text-sm">Avg Latency</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <Activity className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+12%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{modelMetrics.throughput.toLocaleString()}</div>
          <div className="text-gray-300 text-sm">Requests/hour</div>
        </div>

        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-[#00beef]/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#00beef]" />
            </div>
            <div className="flex items-center text-green-400 text-sm">
              <ArrowUp size={16} />
              <span>+0.1%</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{modelMetrics.uptime}%</div>
          <div className="text-gray-300 text-sm">Uptime</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Model Performance Chart */}
        <div className="xl:col-span-2 bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">quadro-ml-v_2 Performance</h3>
            <div className="flex gap-2">
              <button className="p-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded transition-colors duration-300">
                <Play size={16} />
              </button>
              <button className="p-2 bg-black/50 hover:bg-[#005778] text-white rounded border border-[#00699a] transition-colors duration-300">
                <Settings size={16} />
              </button>
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Accuracy Trend</span>
                <span>{modelMetrics.accuracy}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-[#00beef] to-[#00699a] rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.accuracy}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Precision</span>
                <span>{modelMetrics.precision}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.precision}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Recall</span>
                <span>{modelMetrics.recall}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.recall}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>F1 Score</span>
                <span>{modelMetrics.f1Score}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full transition-all duration-1000"
                  style={{ width: `${modelMetrics.f1Score}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Performance Timeline */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-white mb-4">24-Hour Performance</h4>
            <div className="grid grid-cols-6 gap-4">
              {performanceData.map((point, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-400 mb-2">{point.time}</div>
                  <div className="h-16 bg-gray-700 rounded relative">
                    <div 
                      className="absolute bottom-0 w-full bg-gradient-to-t from-[#00beef] to-[#00699a] rounded transition-all duration-500"
                      style={{ height: `${(point.accuracy / 100) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-white mt-2">{point.accuracy}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-black to-[#005778] rounded-lg border border-[#00699a]/30">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <div className="text-white text-sm">{activity.action}</div>
                  <div className="text-gray-400 text-xs">{activity.time}</div>
                </div>
                {activity.count > 1 && (
                  <div className="text-[#00beef] text-xs bg-[#00699a]/20 px-2 py-1 rounded-full">
                    {activity.count}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-6 h-6 text-[#00beef]" />
            <h3 className="text-lg font-bold text-white">Datakits</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Active Datasets</span>
              <span className="text-[#00beef]">4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Total Size</span>
              <span className="text-[#00beef]">8.1 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Quality Score</span>
              <span className="text-[#00beef]">95%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-6 h-6 text-[#00beef]" />
            <h3 className="text-lg font-bold text-white">Pipelines</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Running</span>
              <span className="text-green-400">2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Scheduled</span>
              <span className="text-blue-400">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Success Rate</span>
              <span className="text-[#00beef]">94%</span>
            </div>
          </div>
        </div>

        <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#00beef]" />
            <h3 className="text-lg font-bold text-white">Collaboration</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Team Members</span>
              <span className="text-[#00beef]">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Shared Projects</span>
              <span className="text-[#00beef]">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Active Sessions</span>
              <span className="text-green-400">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Brain className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Train New Model</h4>
            <p className="text-gray-300 text-sm">Start training a new ML model</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Database className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Upload Dataset</h4>
            <p className="text-gray-300 text-sm">Add new data to your collection</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <Activity className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">Create Pipeline</h4>
            <p className="text-gray-300 text-sm">Build automated workflows</p>
          </button>
          
          <button className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left">
            <TrendingUp className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
            <h4 className="text-white font-semibold mb-2">View Analytics</h4>
            <p className="text-gray-300 text-sm">Analyze model performance</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;