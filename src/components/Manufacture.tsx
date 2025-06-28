import { useState, useRef, useCallback } from 'react';
import { Plus, Play, Square, Settings, Download, Database, Brain, Star, ThumbsUp, ThumbsDown, MessageSquare, Clock, CheckCircle, XCircle, AlertTriangle, X, Upload, Code, Link, Layers, Workflow, FileCode, Save, FilesIcon, Trash2, FileUp, FileDown, Shuffle } from 'lucide-react';
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
  const [isCreatingJob, setIsCreatingJob] = useState(true);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedJobForFeedback, setSelectedJobForFeedback] = useState<string | null>(null);
  const [newJobName, setNewJobName] = useState('');
  const [newJobDescription, setNewJobDescription] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStart, setConnectionStart] = useState<{nodeId: string, port: string} | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showIONodeModal, setShowIONodeModal] = useState(false);
  const [pendingIONode, setPendingIONode] = useState<{ x: number; y: number } | null>(null);
  const [ioNodeConfig, setIoNodeConfig] = useState<{ direction: 'input' | 'output'; ioType: string }>({ direction: 'input', ioType: 'text' });

  const nodeTypes = [
    { 
      id: 'datakit', 
      name: 'DataKit', 
      icon: Database, 
      color: 'border-blue-500', 
      description: 'Input datasets and data sources',
      inputs: ['file', 'schema', 'table', 'graph', 'chart', 'text', 'map', 'audio', 'video', 'file', 'url', 'api', 'database'],
      outputs: ['json', 'csv', 'xml', 'html', 'schema', 'table', 'graph', 'chart', 'map', 'audio', 'video', 'file', 'url', 'api', 'database']
    },
    { 
      id: 'codesheet', 
      name: 'CodeSheet', 
      icon: FileCode, 
      color: 'border-green-500', 
      description: 'Data processing and analysis',
      inputs: ['py', 'ipynb', 'md'],
      outputs: ['processed_data', 'insights', 'py', 'ipynb', 'md']
    },
    { 
      id: 'model', 
      name: 'ML Model', 
      icon: Brain, 
      color: 'border-purple-500', 
      description: 'Machine learning models',
      inputs: ['text', 'image', 'audio', 'video', 'file', 'url', 'api', 'database', 'processed_data', 'json', 'csv', 'xml', 'html', 'pdf'],
      outputs: ['predictions', 'model', 'results','graph','table','chart','map','audio','video','file','url','api','database','processed_data','json','csv','xml','html','pdf', 'json', 'csv', 'xml', 'html', 'pdf', 'py', 'ipynb', 'md']
    },
    { 
      id: 'external', 
      name: 'External Tool', 
      icon: Link, 
      color: 'border-orange-500', 
      description: 'Third-party integrations',
      inputs: ['url', 'api', 'database', 'file', 'schema', 'table', 'graph', 'chart', 'map', 'audio', 'video', 'file', 'url', 'api', 'database'],
      outputs: ['results', 'url', 'api', 'database', 'file', 'schema', 'table', 'graph', 'chart', 'map', 'audio', 'video', 'file', 'url', 'api', 'database']
    },
    { 
      id: 'output', 
      name: 'QMvd Export', 
      icon: Upload, 
      color: 'border-red-500', 
      description: 'Export as QUADRAX•ML model',
      inputs: [],
      outputs: ['qmvd']
    }
  ];

  const ioTypes = [
    { value: 'button', label: 'Button' },
    { value: 'file', label: 'File' },
    { value: 'text', label: 'Text' },
    { value: 'range', label: 'Range' },
    { value: 'url', label: 'URL' },
    { value: 'custom', label: 'Custom/Other' }
  ];

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

    if (draggedNode === 'io') {
      setPendingIONode({ x, y });
      setShowIONodeModal(true);
      setDraggedNode(null);
      return;
    }

    const nodeType = nodeTypes.find(t => t.id === draggedNode);
    if (!nodeType) return;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: draggedNode as 'datakit' | 'codesheet' | 'model' | 'external' | 'output',
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
    setIsCreatingJob(true);
    setNewJobName('');
    setNewJobDescription('');
    setWorkflowNodes([]);
    setConnections([]);
  };

  const exportAsQMvd = (jobId: string) => {
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
          strokeWidth="5"
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
      <div className="fixed bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
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

  // Execute computation for the current workflow (canvas)
  const executeComputation = () => {
    // Set all nodes to running
    setWorkflowNodes(prevNodes => prevNodes.map(node => ({ ...node, status: 'running' })));
    // Simulate computation (2 seconds), then set all to completed
    setTimeout(() => {
      setWorkflowNodes(prevNodes => prevNodes.map(node => ({ ...node, status: 'completed' })));
    }, 2000);
  };

  // Handle I/O node creation after modal
  const handleCreateIONode = () => {
    if (!pendingIONode) return;
    const { x, y } = pendingIONode;
    const { direction, ioType } = ioNodeConfig;
    const icon = direction === 'input' ? FileDown : FileUp;
    const color = direction === 'input' ? 'border-cyan-400' : 'border-pink-400';
    const newNode: WorkflowNode = {
      id: `node-io-${Date.now()}`,
      type: direction === 'input' ? 'datakit' : 'output',
      name: `${direction === 'input' ? 'Input' : 'Output'} (${ioType})`,
      position: { x, y },
      config: { ioType },
      status: 'idle',
      connections: [],
      inputs: direction === 'input' ? [] : [ioType],
      outputs: direction === 'input' ? [ioType] : [],
    };
    setWorkflowNodes(prev => [...prev, newNode]);
    setShowIONodeModal(false);
    setPendingIONode(null);
    setIoNodeConfig({ direction: 'input', ioType: 'text' });
  };

  return (
    <>
      <section className="w-full h-full p-0 m-0 overflow-hidden">

        {/* Action Bar */}

        {/* Manufacturing Jobs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 m-0">
          {jobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);
            return (
              <div
                key={job.id}
                className="bg-gradient-to-b from-black to-[#005778] p-2 rounded-m border border-[#00699a]/30 hover:border-[#00699a] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
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
                      <span className="text-gray-300">QMvd Assembly Progress</span>
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
                    <h4 className="text-sm font-semibold text-white mb-2">QMvd Performance</h4>
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
                      Build QMvd
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
                        onClick={() => exportAsQMvd(job.id)}
                        className="flex-1 px-3 py-2 bg-[#00beef] hover:bg-[#00699a] text-black rounded-lg transition-colors duration-300 flex items-center justify-center gap-1"
                      >
                        <Download size={14} />
                        Export QMvd
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
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 border border-[#00699a]/30 overflow-hidden">
            <div className="flex flex-col w-full h-full">
              <span className='flex flex-row w-full justify-between'>
              <h3 className="text-2xl px-4 py-2 w-full [font-weight:400] text-white">Quadrax Model Virtual Device Manufacture</h3>
              <button 
                onClick={() => setIsCreatingJob(false)}
                className='p-4 justify-end text-white hover:text-red-400 transition-colors duration-300'
              >
              <X size={30} />
              </button>
              </span>
          <div className="bg-black/80 backdrop-blur-sm p-2 rounded-lg mb-1 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2 h-[4vh]">
            
          <button className="px-8 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded-m transition-colors duration-300 flex items-center gap-2" onClick={() => setIsCreatingJob(true)}>
              <Plus size={16} />
              New
            </button>

            <button className="px-8 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded-m transition-colors duration-300 flex items-center gap-2">
              <Workflow size={16} />
              Templates
            </button>
            <button className="px-8 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded-m transition-colors duration-300 flex items-center gap-2">
              <FilesIcon size={16} />
              Open
            </button>
            <button className="px-8 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded-m transition-colors duration-300 flex items-center gap-2">
              <Save size={16} />
              Save
            </button>
            
            {/* Development Tools */}
            <button 
              onClick={() => setIsEditorOpen(true)}
              className="px-8 py-0 bg-[#005778] hover:bg-[#00699a] text-white rounded-m transition-colors duration-300 flex items-center gap-2"
            >
              <Code size={16} />
              Code
            </button>
          </div>
        </div>

            </div>

            {/* Organize as a grid: palette left, canvas right */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 overflow-hidden">
              {/* Node Palette (left column) */}
              <div className="lg:col-span-1 flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Drag Components</h4>
                  <div className="space-y-2 flex flex-col">
                    {/* I/O Node Button */}
                    <div
                      key="io"
                      draggable
                      onDragStart={() => handleDragStart('io')}
                      className={`px-2 py-1 border-2 border-yellow-400 bg-black rounded-lg cursor-move hover:opacity-80 transition-opacity duration-300 flex items-center gap-2`}
                    >
                      <Shuffle size={30} className="text-yellow-400" />
                      <span className="font-medium text-white">I/O Node</span>
                      <span className="text-xs text-yellow-300">(Input/Output)</span>
                    </div>
                    {/* Existing node palette */}
                    {nodeTypes.map((nodeType) => (
                      <div
                        key={nodeType.id}
                        draggable
                        onDragStart={() => handleDragStart(nodeType.id)}
                        className={`px-2 py-1 border-2 ${nodeType.color} bg-black rounded-lg cursor-move hover:opacity-80 transition-opacity duration-300`}
                      >
                        <div className="flex items-center gap-2 text-white">
                          <nodeType.icon size={30} />
                          <span className="font-medium">{nodeType.name}</span>
                        </div>
                        <p className="text-xs text-white/80 mt-1 hidden">{nodeType.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Workflow Name and Description */}
                <div className="mt-6">
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
              </div>

              {/* Workflow Canvas (right columns) */}
              <div className="lg:col-span-3 flex flex-col overflow-hidden">
                <h4 className="text-sm flex flex-row justify-between font-semibold text-white mb-3">Visual Workflow Canvas <div className="text-xs text-gray-400">
                      Zoom: {Math.round(zoom * 100)}%
                    </div></h4>
                
                    
                <div
                  ref={canvasRef}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="relative w-full h-[70vh] bg-gradient-to-b from-gray-900 to-black border-2 border-dashed border-[#00699a] rounded-lg overflow-hidden"
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
                    
                    // I/O node visual
                    const isIONode = node.id.startsWith('node-io-');
                    const ioColor = isIONode ? (node.type === 'datakit' ? 'border-cyan-400' : 'border-pink-400') : undefined;
                    
                    return (
                      <div
                        key={node.id}
                        className={`absolute w-32 h-20 bg-black rounded-lg p-2 cursor-move shadow-lg border-2 transition-all duration-300 ${
                          isSelected ? `border-[#00beef] scale-105` : ioColor || nodeType?.color || 'border-transparent'
                        }`}
                        style={{ left: node.position.x, top: node.position.y }}
                        onClick={() => handleNodeClick(node.id)}
                      >
                        <div className="text-center text-white">
                          {isIONode ? (
                            node.type === 'datakit' ? <FileDown size={16} className="mx-auto mb-1" /> : <FileUp size={16} className="mx-auto mb-1" />
                          ) : (
                          <NodeIcon size={16} className="mx-auto mb-1" />
                          )}
                          <div className="text-xs font-medium truncate">{node.name}</div>
                          {isIONode && (
                            <div className="text-[10px] text-gray-300 mt-1">{node.config.ioType}</div>
                          )}
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

                {/* Canvas Controls (below canvas) */}
                <div className="flex flex-wrap gap-2 mt-4 items-start">
                  <h4 className="text-sm font-semibold text-white">Canvas Controls</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                      className="px-4 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded text-sm"
                    >
                      Zoom +
                    </button>
                    <button
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                      className="px-4 py-0 bg-[#00699a] hover:bg-[#00beef] text-white rounded text-sm"
                    >
                      Zoom -
                    </button>
                  </div>
                  <div className='flex flex-row h-10 gap-2'>
                    <button id='execute'
                      onClick={executeComputation}
                      className="px-4 py-1 bg-black border-2 hover:bg-green-700 text-white rounded-m transition-colors duration-300 flex items-center gap-2"
                    >
                      <Play size={25} />
                      Execute
                    </button>
                    <button id='clear-canvas'
                    onClick={() => {
                      setWorkflowNodes([]);
                      setConnections([]);
                      setSelectedNode(null);
                    }}
                      className="px-8 py-1 bg-black hover:bg-red-700 text-white items-center gap-2 rounded-m transition-colors duration-300"
                  >
                      <Trash2 size={25} />
                      <div className='text-m w-[10vw]'>Clear Canvas</div>
                  </button>
                </div>
              </div>
            </div>
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
      
      {/* I/O Node Modal */}
      {showIONodeModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-yellow-400 max-w-xs w-full mx-4">
            <h3 className="text-lg font-bold text-white mb-4">Configure I/O Node</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Direction</label>
              <div className="flex gap-3">
                <button
                  className={`flex-1 px-3 py-2 rounded border ${ioNodeConfig.direction === 'input' ? 'bg-cyan-700 border-cyan-400 text-white' : 'bg-black border-gray-600 text-gray-300'}`}
                  onClick={() => setIoNodeConfig(cfg => ({ ...cfg, direction: 'input' }))}
                >
                  <FileDown size={16} className="inline mr-1" /> Input
                </button>
                <button
                  className={`flex-1 px-3 py-2 rounded border ${ioNodeConfig.direction === 'output' ? 'bg-pink-700 border-pink-400 text-white' : 'bg-black border-gray-600 text-gray-300'}`}
                  onClick={() => setIoNodeConfig(cfg => ({ ...cfg, direction: 'output' }))}
                >
                  <FileUp size={16} className="inline mr-1" /> Output
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={ioNodeConfig.ioType}
                onChange={e => setIoNodeConfig(cfg => ({ ...cfg, ioType: e.target.value }))}
                className="w-full px-3 py-2 bg-black border border-[#00699a] text-white rounded-lg focus:outline-none focus:border-[#00beef]"
              >
                {ioTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCreateIONode}
                className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors duration-300"
              >
                Add Node
              </button>
              <button
                onClick={() => {
                  setShowIONodeModal(false);
                  setPendingIONode(null);
                  setIoNodeConfig({ direction: 'input', ioType: 'text' });
                }}
                className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Manufacture;
