import { useState } from 'react';
import { Play, Pause, Square, Settings, Plus, GitBranch, Clock, CheckCircle, XCircle, AlertTriangle, Zap, Database, Brain, Upload, Terminal as TerminalIcon, Code } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

function Pipelines() {
  const [selectedPipeline, setSelectedPipeline] = useState<number | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');

  const pipelines = [
    {
      id: 1,
      name: 'Customer_Data_ETL_Pipeline',
      status: 'Running',
      progress: 67,
      lastRun: '2 hours ago',
      duration: '45 min',
      stages: [
        { name: 'Data Ingestion', status: 'completed', duration: '5 min' },
        { name: 'Data Cleaning', status: 'completed', duration: '15 min' },
        { name: 'Feature Engineering', status: 'running', duration: '20 min' },
        { name: 'Model Training', status: 'pending', duration: '25 min' },
        { name: 'Model Validation', status: 'pending', duration: '10 min' },
        { name: 'Deployment', status: 'pending', duration: '5 min' }
      ],
      description: 'End-to-end pipeline for customer behavior analysis model training and deployment.',
      trigger: 'Scheduled (Daily)',
      successRate: 94
    },
    {
      id: 2,
      name: 'Real_Time_Fraud_Detection',
      status: 'Completed',
      progress: 100,
      lastRun: '1 hour ago',
      duration: '12 min',
      stages: [
        { name: 'Stream Processing', status: 'completed', duration: '2 min' },
        { name: 'Feature Extraction', status: 'completed', duration: '3 min' },
        { name: 'Model Inference', status: 'completed', duration: '4 min' },
        { name: 'Alert Generation', status: 'completed', duration: '2 min' },
        { name: 'Notification', status: 'completed', duration: '1 min' }
      ],
      description: 'Real-time fraud detection pipeline processing transaction streams.',
      trigger: 'Event-driven',
      successRate: 98
    },
    {
      id: 3,
      name: 'Image_Classification_Training',
      status: 'Failed',
      progress: 45,
      lastRun: '3 hours ago',
      duration: '2h 15min',
      stages: [
        { name: 'Data Loading', status: 'completed', duration: '10 min' },
        { name: 'Data Augmentation', status: 'completed', duration: '25 min' },
        { name: 'Model Training', status: 'failed', duration: '1h 40min' },
        { name: 'Model Evaluation', status: 'pending', duration: '15 min' },
        { name: 'Model Export', status: 'pending', duration: '5 min' }
      ],
      description: 'Deep learning pipeline for medical image classification model training.',
      trigger: 'Manual',
      successRate: 87
    },
    {
      id: 4,
      name: 'NLP_Model_Deployment',
      status: 'Scheduled',
      progress: 0,
      lastRun: 'Never',
      duration: 'Est. 35 min',
      stages: [
        { name: 'Model Loading', status: 'pending', duration: '5 min' },
        { name: 'Container Build', status: 'pending', duration: '10 min' },
        { name: 'Testing', status: 'pending', duration: '8 min' },
        { name: 'Deployment', status: 'pending', duration: '7 min' },
        { name: 'Health Check', status: 'pending', duration: '5 min' }
      ],
      description: 'Automated deployment pipeline for NLP sentiment analysis model.',
      trigger: 'Git Push',
      successRate: 92
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running': return 'text-yellow-400 bg-yellow-400/20';
      case 'Completed': return 'text-green-400 bg-green-400/20';
      case 'Failed': return 'text-red-400 bg-red-400/20';
      case 'Scheduled': return 'text-blue-400 bg-blue-400/20';
      case 'Paused': return 'text-gray-400 bg-gray-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStageStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-400" />;
      case 'running': return <Clock size={16} className="text-yellow-400 animate-spin" />;
      case 'failed': return <XCircle size={16} className="text-red-400" />;
      case 'pending': return <AlertTriangle size={16} className="text-gray-400" />;
      default: return <AlertTriangle size={16} className="text-gray-400" />;
    }
  };

  const getStageStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-400/20 border-green-400/50';
      case 'running': return 'bg-yellow-400/20 border-yellow-400/50';
      case 'failed': return 'bg-red-400/20 border-red-400/50';
      case 'pending': return 'bg-gray-400/20 border-gray-400/50';
      default: return 'bg-gray-400/20 border-gray-400/50';
    }
  };

  const pipelineTemplates = [
    { name: 'Data Processing', icon: Database, description: 'ETL pipeline template' },
    { name: 'Model Training', icon: Brain, description: 'ML training pipeline' },
    { name: 'Real-time Inference', icon: Zap, description: 'Streaming pipeline' },
    { name: 'Batch Processing', icon: Upload, description: 'Batch job template' }
  ];

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  // If terminal or editor is open, show minimal layout
  if (isTerminalOpen || isEditorOpen) {
    return (
      <>
        {isEditorOpen && (
          <CodeEditor 
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            context="pipelines"
            workingDirectory="/pipelines"
          />
        )}
        
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/pipelines"
          context="pipelines"
        />
      </>
    );
  }

  return (
    <section className="p-6 min-h-screen">
      <div className="text-white mb-6">
        <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
          Pipelines
        </h2>
        <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
      </div>

      {/* Action Bar */}
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2">
            <Plus size={16} />
            Create Pipeline
          </button>
          <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
            <GitBranch size={16} />
            Templates
          </button>
          
          {/* Development Tools */}
          <button 
            onClick={() => setIsEditorOpen(true)}
            className="px-4 py-2 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <Code size={16} />
            Open Editor
          </button>
          <button 
            onClick={() => openTerminal('bash')}
            className="px-4 py-2 bg-[#005778] hover:bg-[#00699a] text-white rounded-lg transition-colors duration-300 flex items-center gap-2"
          >
            <TerminalIcon size={16} />
            Open Terminal
          </button>
        </div>
        
        <div className="flex gap-2">
          <button className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-1">
            <Play size={16} />
            Run All
          </button>
          <button className="px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-1">
            <Pause size={16} />
            Pause All
          </button>
          <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center gap-1">
            <Square size={16} />
            Stop All
          </button>
        </div>
      </div>

      {/* CLI Command Examples */}
      <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg mb-6 border border-[#00699a]/30">
        <h5 className="text-white font-semibold mb-3">Pipeline CLI Commands</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-[#00beef] font-mono">pipeline run {'<name>'}</span>
            <span className="text-gray-300 block">Execute pipeline</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">pipeline status</span>
            <span className="text-gray-300 block">Check pipeline status</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">pipeline logs {'<name>'}</span>
            <span className="text-gray-300 block">View pipeline logs</span>
          </div>
          <div>
            <span className="text-[#00beef] font-mono">pipeline stop {'<name>'}</span>
            <span className="text-gray-300 block">Stop running pipeline</span>
          </div>
        </div>
      </div>

      {/* Pipelines Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {pipelines.map((pipeline) => (
          <div
            key={pipeline.id}
            onClick={() => setSelectedPipeline(pipeline.id)}
            className={`bg-gradient-to-b from-black via-black to-[#005778] text-white p-6 rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:to-[#00699a] border ${
              selectedPipeline === pipeline.id ? 'border-[#00beef] border-2' : 'border-[#00699a]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{pipeline.name}</h3>
                <p className="text-sm text-gray-300">{pipeline.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(pipeline.status)}`}>
                {pipeline.status}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Last Run:</span>
                <span className="text-[#00beef]">{pipeline.lastRun}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duration:</span>
                <span className="text-[#00beef]">{pipeline.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Trigger:</span>
                <span className="text-[#00beef]">{pipeline.trigger}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Success Rate:</span>
                <span className="text-[#00beef]">{pipeline.successRate}%</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress:</span>
                <span className="text-[#00beef]">{pipeline.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${pipeline.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2 text-gray-300">Stages:</h4>
              <div className="space-y-1">
                {pipeline.stages.slice(0, 3).map((stage, index) => (
                  <div key={index} className={`flex items-center gap-2 p-2 rounded border ${getStageStatusColor(stage.status)}`}>
                    {getStageStatusIcon(stage.status)}
                    <span className="text-sm flex-1">{stage.name}</span>
                    <span className="text-xs text-gray-400">{stage.duration}</span>
                  </div>
                ))}
                {pipeline.stages.length > 3 && (
                  <div className="text-xs text-gray-400 text-center py-1">
                    +{pipeline.stages.length - 3} more stages
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-[#00699a] hover:bg-[#00beef] text-white py-2 px-3 rounded transition-colors duration-300 flex items-center justify-center gap-1">
                <Play size={16} />
                Run
              </button>
              <button className="flex-1 bg-black/50 hover:bg-[#005778] text-white py-2 px-3 rounded border border-[#00699a] transition-colors duration-300 flex items-center justify-center gap-1">
                <Settings size={16} />
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pipeline Templates */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg mb-6">
        <h3 className="text-2xl font-bold text-white mb-6">Pipeline Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineTemplates.map((template) => (
            <button
              key={template.name}
              className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a] hover:border-[#00beef] transition-all duration-300 group text-left"
            >
              <template.icon className="w-8 h-8 text-[#00beef] mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h4 className="text-white font-semibold mb-2">{template.name}</h4>
              <p className="text-gray-300 text-sm">{template.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Monitoring Dashboard */}
      <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
        <h3 className="text-2xl font-bold text-white mb-6">System Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Active Pipelines</span>
              <Play className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">3</div>
            <div className="text-sm text-gray-400">2 running, 1 scheduled</div>
          </div>
          
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Success Rate</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">94%</div>
            <div className="text-sm text-gray-400">Last 30 days</div>
          </div>
          
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Avg Duration</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white">42m</div>
            <div className="text-sm text-gray-400">Per pipeline run</div>
          </div>
          
          <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-300">Failed Runs</span>
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">2</div>
            <div className="text-sm text-gray-400">This week</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pipelines;