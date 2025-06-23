import { useState, useRef, useCallback, useEffect } from 'react';
import { Plus, Play, Pause, Square, Settings, Download, Upload, Zap, Database, Brain, Star, ThumbsUp, ThumbsDown, MessageSquare, BarChart3, Clock, CheckCircle, XCircle, AlertTriangle, Trash2, Copy, Edit3, Save, X, Terminal as TerminalIcon, Code, Sparkles, Target, Layers, GitBranch, Workflow, FileCode, ExternalLink, Cpu, Network, Gauge } from 'lucide-react';
import Terminal from './Terminal';
import CodeEditor from './CodeEditor';

interface WorkflowNode {
  id: string;
  type: 'datakit' | 'codesheet' | 'model' | 'external' | 'output';
  name: string;
  position: { x: number; y: number };
  config: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  connections: string[];
  inputs: string[];
  outputs: string[];
}

interface Connection {
  id: string;
  from: string;
  to: string;
  fromPort: string;
  toPort: string;
}

interface FeedbackItem {
  id: string;
  type: 'star' | 'thumbs' | 'text';
  value: any;
  timestamp: Date;
  jobId: string;
}

interface ManufacturingJob {
  id: string;
  name: string;
  description: string;
  workflow: WorkflowNode[];
  connections: Connection[];
  status: 'draft' | 'running' | 'completed' | 'failed';
  progress: number;
  feedback: FeedbackItem[];
  createdAt: Date;
  updatedAt: Date;
  metrics: {
    accuracy?: number;
    loss?: number;
    duration?: number;
    cost?: number;
  };
}

function Manufacture() {
  const [jobs, setJobs] = useState<ManufacturingJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [terminalShell, setTerminalShell] = useState<'bash' | 'powershell'>('bash');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedJobForFeedback, setSelectedJobForFeedback] = useState<string | null>(null);
  const [newJobName, setNewJobName] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<{nodeId: string, port: string} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const nodeTypes = [
    { 
      id: 'datakit', 
      name: 'DataKit', 
      icon: Database, 
      color: 'bg-blue-500', 
      description: 'Input datasets and data sources',
      inputs: [],
      outputs: ['data']
    },
    { 
      id: 'codesheet', 
      name: 'CodeSheet', 
      icon: FileCode, 
      color: 'bg-green-500', 
      description: 'Data processing and analysis',
      inputs: ['data'],
      outputs: ['processed_data', 'insights']
    },
    { 
      id: 'model', 
      name: 'ML Model', 
      icon: Brain, 
      color: 'bg-purple-500', 
      description: 'Machine learning models',
      inputs: ['data', 'processed_data'],
      outputs: ['predictions', 'model']
    },
    { 
      id: 'external', 
      name: 'External Tool', 
      icon: ExternalLink, 
      color: 'bg-orange-500', 
      description: 'Third-party integrations',
      inputs: ['data', 'predictions'],
      outputs: ['results']
    },
    { 
      id: 'output', 
      name: 'QML Export', 
      icon: Target, 
      color: 'bg-red-500', 
      description: 'Export as QUADRAX•ML model',
      inputs: ['model', 'predictions', 'results'],
      outputs: []
    }
  ];

  const sampleJobs: ManufacturingJob[] = [
    {
      id: '1',
      name: 'Customer Sentiment Analysis QML',
      description: 'Complete sentiment analysis pipeline with feedback optimization',
      workflow: [],
      connections: [],
      status: 'completed',
      progress: 100,
      feedback: [
        { id: '1', type: 'star', value: 5, timestamp: new Date(), jobId: '1' },
        { id: '2', type: 'thumbs', value: 'up', timestamp: new Date(), jobId: '1' },
        { id: '3', type: 'text', value: 'Excellent QML device! Easy to use interface.', timestamp: new Date(), jobId: '1' }
      ],
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
      metrics: { accuracy: 96.8, loss: 0.18, duration: 52, cost: 15.75 }
    },
    {
      id: '2',
      name: 'Real-time Fraud Detection QML',
      description: 'Advanced fraud detection with live monitoring dashboard',
      workflow: [],
      connections: [],
      status: 'running',
      progress: 73,
      feedback: [],
      createdAt: new Date(Date.now() - 43200000),
      updatedAt: new Date(),
      metrics: { accuracy: 94.2, duration: 38 }
    }
  ];

  useState(() => {
    setJobs(sampleJobs);
  });

  const openTerminal = (shell: 'bash' | 'powershell') => {
    setTerminalShell(shell);
    setIsTerminalOpen(true);
  };

  const handleDragStart = (nodeType: string) => {
    setDraggedNode(nodeType);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNode || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - canvasOffset.x) / zoom;
    const y = (e.clientY - rect.top - canvasOffset.y) / zoom;

    const nodeType = nodeTypes.find(t => t.id === draggedNode);
    if (!nodeType) return;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: draggedNode as any,
      name: `${nodeType.name} ${workflowNodes.length + 1}`,
      position: { x, y },
      config: {},
      status: 'idle',
      connections: [],
      inputs: nodeType.inputs,
      outputs: nodeType.outputs
    };

    setWorkflowNodes(prev => [...prev, newNode]);
    setDraggedNode(null);
  }, [draggedNode, canvasOffset, zoom, workflowNodes.length]);

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handlePortClick = (nodeId: string, port: string, isOutput: boolean) => {
    if (!isConnecting) {
      if (isOutput) {
        setIsConnecting(true);
        setConnectionStart({ nodeId, port });
      }
    } else {
      if (!isOutput && connectionStart) {
        // Create connection
        const newConnection: Connection = {
          id: `conn-${Date.now()}`,
          from: connectionStart.nodeId,
          to: nodeId,
          fromPort: connectionStart.port,
          toPort: port
        };
        setConnections(prev => [...prev, newConnection]);
      }
      setIsConnecting(false);
      setConnectionStart(null);
    }
  };

  const deleteNode = (nodeId: string) => {
    setWorkflowNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    setSelectedNode(null);
  };

  const deleteConnection = (connectionId: string) => {
    setConnections(prev => prev.filter(c => c.id !== connectionId));
  };

  const createNewJob = () => {
    if (!newJobName.trim()) return;

    const newJob: ManufacturingJob = {
      id: Date.now().toString(),
      name: newJobName,
      description: newJobDescription,
      workflow: workflowNodes,
      connections: connections,
      status: 'draft',
      progress: 0,
      feedback: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      metrics: {}
    };

    setJobs(prev => [...prev, newJob]);
    setIsCreatingJob(false);
    setNewJobName('');
    setNewJobDescription('');
    setWorkflowNodes([]);
    setConnections([]);
  };

  const exportAsQML = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Simulate QML export
    const qmlData = {
      name: job.name,
      type: 'QUADRAX_ML_MODEL',
      version: '1.0.0',
      workflow: job.workflow,
      connections: job.connections,
      interface: {
        inputs: job.workflow.filter(n => n.type === 'datakit').map(n => n.name),
        outputs: job.workflow.filter(n => n.type === 'output').map(n => n.name),
        controls: ['start', 'stop', 'configure', 'monitor']
      },
      metrics: job.metrics,
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(qmlData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${job.name.replace(/\s+/g, '_')}_QML.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const startJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'running' as const, progress: 0 }
        : job
    ));

    // Simulate job progress
    const interval = setInterval(() => {
      setJobs(prev => prev.map(job => {
        if (job.id === jobId && job.status === 'running') {
          const newProgress = Math.min(job.progress + Math.random() * 8, 100);
          if (newProgress >= 100) {
            clearInterval(interval);
            return { 
              ...job, 
              status: 'completed' as const, 
              progress: 100,
              metrics: {
                ...job.metrics,
                accuracy: 92 + Math.random() * 8,
                loss: Math.random() * 0.3,
                duration: Math.floor(Math.random() * 45) + 15
              }
            };
          }
          return { ...job, progress: newProgress };
        }
        return job;
      }));
    }, 800);
  };

  const stopJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: 'draft' as const }
        : job
    ));
  };

  const addFeedback = (jobId: string, type: 'star' | 'thumbs' | 'text', value: any) => {
    const feedback: FeedbackItem = {
      id: Date.now().toString(),
      type,
      value,
      timestamp: new Date(),
      jobId
    };

    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, feedback: [...job.feedback, feedback] }
        : job
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'running': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'running': return Clock;
      case 'failed': return XCircle;
      default: return AlertTriangle;
    }
  };

  const renderConnection = (connection: Connection) => {
    const fromNode = workflowNodes.find(n => n.id === connection.from);
    const toNode = workflowNodes.find(n => n.id === connection.to);
    
    if (!fromNode || !toNode) return null;

    const fromX = fromNode.position.x + 120;
    const fromY = fromNode.position.y + 40;
    const toX = toNode.position.x;
    const toY = toNode.position.y + 40;

    const midX = (fromX + toX) / 2;

    return (
      <g key={connection.id}>
        <path
          d={`M ${fromX} ${fromY} C ${midX} ${fromY} ${midX} ${toY} ${toX} ${toY}`}
          stroke="#00beef"
          strokeWidth="2"
          fill="none"
          className="hover:stroke-[#00699a] cursor-pointer"
          onClick={() => deleteConnection(connection.id)}
        />
        <circle
          cx={midX}
          cy={(fromY + toY) / 2}
          r="4"
          fill="#00beef"
          className="hover:fill-[#00699a] cursor-pointer"
          onClick={() => deleteConnection(connection.id)}
        />
      </g>
    );
  };

  const FeedbackModal = ({ jobId, onClose }: { jobId: string; onClose: () => void }) => {
    const [starRating, setStarRating] = useState(0);
    const [thumbsRating, setThumbsRating] = useState<'up' | 'down' | null>(null);
    const [textFeedback, setTextFeedback] = useState('');

    const submitFeedback = () => {
      if (starRating > 0) addFeedback(jobId, 'star', starRating);
      if (thumbsRating) addFeedback(jobId, 'thumbs', thumbsRating);
      if (textFeedback.trim()) addFeedback(jobId, 'text', textFeedback);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a] max-w-md w-full mx-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white">Rate This QML Workflow</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Overall Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setStarRating(star)}
                    className={`text-2xl transition-colors duration-300 ${
                      star <= starRating ? 'text-yellow-400' : 'text-gray-600 hover:text-yellow-300'
                    }`}
                  >
                    <Star size={24} fill={star <= starRating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            {/* Thumbs Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Quick Feedback</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setThumbsRating(thumbsRating === 'up' ? null : 'up')}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    thumbsRating === 'up' 
                      ? 'border-green-400 bg-green-400/20 text-green-400' 
                      : 'border-[#00699a] hover:border-green-400 text-gray-400 hover:text-green-400'
                  }`}
                >
                  <ThumbsUp size={20} />
                </button>
                <button
                  onClick={() => setThumbsRating(thumbsRating === 'down' ? null : 'down')}
                  className={`p-3 rounded-lg border transition-all duration-300 ${
                    thumbsRating === 'down' 
                      ? 'border-red-400 bg-red-400/20 text-red-400' 
                      : 'border-[#00699a] hover:border-red-400 text-gray-400 hover:text-red-400'
                  }`}
                >
                  <ThumbsDown size={20} />
                </button>
              </div>
            </div>

            {/* Text Feedback */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">QML Performance Feedback</label>
              <textarea
                value={textFeedback}
                onChange={(e) => setTextFeedback(e.target.value)}
                placeholder="How did the QML device perform? Any suggestions for improvement?"
                className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] resize-none"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={submitFeedback}
                className="flex-1 px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300"
              >
                Submit Feedback
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="p-6 min-h-screen">
        <div className="text-white mb-6">
          <h2 className="text-3xl font-bold text-white [text-shadow:2px_2px_2px_#000] bg-black/30 p-4 rounded-lg">
            Manufacturing Playground
          </h2>
          <hr className="border-none bg-[#00beef] h-[2px] w-full my-4" />
        </div>

        {/* Action Bar */}
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button 
              onClick={() => setIsCreatingJob(true)}
              className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              <Plus size={16} />
              New QML Workflow
            </button>
            <button className="px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Workflow size={16} />
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
        </div>

        {/* Manufacturing Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {jobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);
            return (
              <div
                key={job.id}
                className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{job.name}</h3>
                    <p className="text-gray-300 text-sm">{job.description}</p>
                  </div>
                  <div className={`flex items-center gap-1 ${getStatusColor(job.status)}`}>
                    <StatusIcon size={16} />
                    <span className="text-sm capitalize">{job.status}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {job.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">QML Assembly Progress</span>
                      <span className="text-[#00beef]">{Math.round(job.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#00beef] to-[#00699a] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Metrics */}
                {Object.keys(job.metrics).length > 0 && (
                  <div className="mb-4 p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-white mb-2">QML Performance</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {job.metrics.accuracy && (
                        <div>
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-[#00beef] ml-1">{job.metrics.accuracy.toFixed(1)}%</span>
                        </div>
                      )}
                      {job.metrics.loss && (
                        <div>
                          <span className="text-gray-400">Loss:</span>
                          <span className="text-[#00beef] ml-1">{job.metrics.loss.toFixed(3)}</span>
                        </div>
                      )}
                      {job.metrics.duration && (
                        <div>
                          <span className="text-gray-400">Build Time:</span>
                          <span className="text-[#00beef] ml-1">{job.metrics.duration}min</span>
                        </div>
                      )}
                      {job.metrics.cost && (
                        <div>
                          <span className="text-gray-400">Cost:</span>
                          <span className="text-[#00beef] ml-1">${job.metrics.cost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Feedback Summary */}
                {job.feedback.length > 0 && (
                  <div className="mb-4 p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-semibold text-white mb-2">User Feedback</h4>
                    <div className="flex items-center gap-3 text-xs">
                      {job.feedback.find(f => f.type === 'star') && (
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-yellow-400" fill="currentColor" />
                          <span className="text-yellow-400">
                            {job.feedback.find(f => f.type === 'star')?.value}/5
                          </span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={12} className="text-green-400" />
                        <span className="text-green-400">
                          {job.feedback.filter(f => f.type === 'thumbs' && f.value === 'up').length}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-blue-400" />
                        <span className="text-blue-400">
                          {job.feedback.filter(f => f.type === 'text').length}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {job.status === 'draft' && (
                    <button
                      onClick={() => startJob(job.id)}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                    >
                      <Play size={14} />
                      Build QML
                    </button>
                  )}
                  {job.status === 'running' && (
                    <button
                      onClick={() => stopJob(job.id)}
                      className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                    >
                      <Square size={14} />
                      Stop
                    </button>
                  )}
                  {job.status === 'completed' && (
                    <>
                      <button
                        onClick={() => exportAsQML(job.id)}
                        className="flex-1 px-3 py-2 bg-[#00beef] hover:bg-[#00699a] text-black rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                      >
                        <Download size={14} />
                        Export QML
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobForFeedback(job.id);
                          setShowFeedbackModal(true);
                        }}
                        className="px-3 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300"
                      >
                        <Star size={14} />
                      </button>
                    </>
                  )}
                  <button className="px-3 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300">
                    <Settings size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Builder Canvas */}
        {isCreatingJob && (
          <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg border border-[#00699a]/30 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">QML Workflow Designer</h3>
              <button
                onClick={() => setIsCreatingJob(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Node Palette */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Workflow Name</label>
                  <input
                    type="text"
                    value={newJobName}
                    onChange={(e) => setNewJobName(e.target.value)}
                    placeholder="Enter QML workflow name..."
                    className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    value={newJobDescription}
                    onChange={(e) => setNewJobDescription(e.target.value)}
                    placeholder="Describe your QML device..."
                    className="w-full px-3 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] resize-none"
                    rows={3}
                  />
                </div>

                {/* Node Palette */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Drag Components</h4>
                  <div className="space-y-2">
                    {nodeTypes.map((nodeType) => (
                      <div
                        key={nodeType.id}
                        draggable
                        onDragStart={() => handleDragStart(nodeType.id)}
                        className={`p-3 ${nodeType.color} rounded-lg cursor-move hover:opacity-80 transition-opacity duration-300`}
                      >
                        <div className="flex items-center gap-2 text-white">
                          <nodeType.icon size={16} />
                          <span className="font-medium">{nodeType.name}</span>
                        </div>
                        <p className="text-xs text-white/80 mt-1">{nodeType.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Canvas Controls */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">Canvas Controls</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="px-2 py-1 bg-[#00699a] hover:bg-[#00beef] text-white rounded text-sm"
                    >
                      Zoom +
                    </button>
                    <button
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="px-2 py-1 bg-[#00699a] hover:bg-[#00beef] text-white rounded text-sm"
                    >
                      Zoom -
                    </button>
                  </div>
                  <div className="text-xs text-gray-400">
                    Zoom: {Math.round(zoom * 100)}%
                  </div>
                </div>
              </div>

              {/* Workflow Canvas */}
              <div className="lg:col-span-3">
                <h4 className="text-sm font-semibold text-white mb-3">Visual Workflow Canvas</h4>
                <div
                  ref={canvasRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative w-full h-96 bg-gradient-to-b from-gray-900 to-black border-2 border-dashed border-[#00699a] rounded-lg overflow-hidden"
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'top left' }}
                >
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%">
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#00699a" strokeWidth="0.5"/>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>

                  {/* Connections */}
                  <svg className="absolute inset-0 pointer-events-none">
                    {connections.map(renderConnection)}
                  </svg>

                  {/* Nodes */}
                  {workflowNodes.map((node) => {
                    const nodeType = nodeTypes.find(t => t.id === node.type);
                    const NodeIcon = nodeType?.icon || Database;
                    const isSelected = selectedNode === node.id;
                    
                    return (
                      <div
                        key={node.id}
                        className={`absolute w-32 h-20 ${nodeType?.color} rounded-lg p-2 cursor-move shadow-lg border-2 transition-all duration-300 ${
                          isSelected ? 'border-[#00beef] scale-105' : 'border-transparent'
                        }`}
                        style={{ left: node.position.x, top: node.position.y }}
                        onClick={() => handleNodeClick(node.id)}
                      >
                        <div className="text-center text-white">
                          <NodeIcon size={16} className="mx-auto mb-1" />
                          <div className="text-xs font-medium truncate">{node.name}</div>
                        </div>

                        {/* Input Ports */}
                        {node.inputs.map((input, index) => (
                          <div
                            key={`input-${index}`}
                            className="absolute w-3 h-3 bg-white rounded-full border-2 border-gray-600 cursor-pointer hover:bg-[#00beef] transition-colors duration-300"
                            style={{ left: -6, top: 8 + index * 12 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePortClick(node.id, input, false);
                            }}
                            title={input}
                          />
                        ))}

                        {/* Output Ports */}
                        {node.outputs.map((output, index) => (
                          <div
                            key={`output-${index}`}
                            className="absolute w-3 h-3 bg-white rounded-full border-2 border-gray-600 cursor-pointer hover:bg-[#00beef] transition-colors duration-300"
                            style={{ right: -6, top: 8 + index * 12 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePortClick(node.id, output, true);
                            }}
                            title={output}
                          />
                        ))}

                        {/* Delete Button */}
                        {isSelected && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNode(node.id);
                            }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {/* Empty State */}
                  {workflowNodes.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Layers size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Drag components here to build your QML workflow</p>
                        <p className="text-sm mt-2">Connect nodes to create data flow</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Canvas Instructions */}
                <div className="mt-4 p-3 bg-gradient-to-b from-[#005778] to-black rounded-lg border border-[#00699a]/30">
                  <h5 className="text-white font-semibold mb-2">Canvas Instructions</h5>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p>• Drag components from the left panel onto the canvas</p>
                    <p>• Click output ports (right side) then input ports (left side) to connect nodes</p>
                    <p>• Click nodes to select them, then click the X to delete</p>
                    <p>• Click connections to delete them</p>
                    <p>• Build a complete workflow ending with QML Export</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={createNewJob}
                    disabled={!newJobName.trim() || workflowNodes.length === 0}
                    className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-colors duration-300"
                  >
                    Create QML Workflow
                  </button>
                  <button
                    onClick={() => {
                      setWorkflowNodes([]);
                      setConnections([]);
                      setSelectedNode(null);
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
                  >
                    Clear Canvas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {jobs.length === 0 && !isCreatingJob && (
          <div className="text-center py-16">
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-12 max-w-2xl mx-auto">
              <Workflow size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">QML Manufacturing Playground</h3>
              <p className="text-gray-300 mb-8 text-lg">
                Design intelligent workflows with drag-and-drop components, then export them as QUADRAX•ML virtual devices.
              </p>
              
              <button 
                onClick={() => setIsCreatingJob(true)}
                className="px-8 py-4 bg-[#00beef] hover:bg-[#00699a] text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                Start QML Manufacturing
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Feedback Modal */}
      {showFeedbackModal && selectedJobForFeedback && (
        <FeedbackModal
          jobId={selectedJobForFeedback}
          onClose={() => {
            setShowFeedbackModal(false);
            setSelectedJobForFeedback(null);
          }}
        />
      )}

      {/* Editor and Terminal Overlays */}
      {isEditorOpen && (
        <CodeEditor 
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          context="manufacture"
          workingDirectory="/manufacturing"
        />
      )}
      
      {isTerminalOpen && (
        <Terminal 
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          shell={terminalShell}
          workingDirectory="/manufacturing"
          context="manufacture"
        />
      )}
    </>
  );
}

export default Manufacture;