import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Copy, Download, Power, ChevronUp, ChevronDown, Zap, Brain, Database, Settings, Play, Stop } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  shell: 'bash' | 'powershell';
  workingDirectory?: string;
  context?: string;
  onOpenNewWorkstation?: () => void;
}

interface CommandHistory {
  command: string;
  output: string;
  timestamp: Date;
  exitCode: number;
}

function Terminal({ isOpen, onClose, shell: initialShell, workingDirectory = '~', context = 'general', onOpenNewWorkstation }: TerminalProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isConnected, setIsConnected] = useState(true);
  const [shell, setShell] = useState<'bash' | 'powershell'>(initialShell);
  const [terminalHeight, setTerminalHeight] = useState(300);
  const [isResizing, setIsResizing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = shell === 'bash' 
    ? `user@quadrax-ml:${workingDirectory}$ `
    : `PS ${workingDirectory}> `;

  // Handle resize functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      
      const newHeight = window.innerHeight - e.clientY;
      const clampedHeight = Math.max(200, Math.min(600, newHeight));
      setTerminalHeight(clampedHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Enhanced command execution with ML/AI context
  const executeCommand = (command: string): { output: string; exitCode: number } => {
    const cmd = command.trim().toLowerCase();
    
    // Shell switching commands
    if (cmd === 'bash' && shell === 'powershell') {
      setShell('bash');
      return { output: 'Switched to Bash shell', exitCode: 0 };
    }
    if (cmd === 'powershell' && shell === 'bash') {
      setShell('powershell');
      return { output: 'Switched to PowerShell', exitCode: 0 };
    }
    
    // Enhanced AI/ML commands
    if (cmd.includes('ai') || cmd.includes('ml') || cmd.includes('model')) {
      if (cmd.includes('deploy')) {
        return { 
          output: `🚀 Model Deployment Initiated
Model: customer-classifier-v2.1
Environment: production
Status: Deploying...
Endpoint: https://api.quadrax-ml.com/v1/predict
Health Check: ✓ Passed
Scaling: Auto (1-10 instances)
Estimated completion: 2-3 minutes`, 
          exitCode: 0 
        };
      }
      if (cmd.includes('train')) {
        return { 
          output: `🧠 Model Training Started
Dataset: customer_data_v3.csv (50,000 samples)
Algorithm: Random Forest Classifier
Progress: [████████████████████████████████████████] 100%
Accuracy: 94.7%
Precision: 95.2%
Recall: 94.1%
F1-Score: 94.6%
Training completed in 45 minutes`, 
          exitCode: 0 
        };
      }
      if (cmd.includes('status')) {
        return { 
          output: `📊 AI/ML System Status
Active Models: 12 deployed
Training Jobs: 3 running
Manufacturing Jobs: 8 in progress
GPU Utilization: 67%
Model Accuracy (avg): 92.3%
Inference Latency: 120ms
Success Rate: 99.2%`, 
          exitCode: 0 
        };
      }
    }

    // Manufacturing commands
    if (cmd.includes('manufacture') || cmd.includes('manufacturing')) {
      if (cmd.includes('start') || cmd.includes('create')) {
        return { 
          output: `🏭 Manufacturing Job Created
Job ID: mfg_job_${Date.now()}
Type: Fine-tuning workflow
Base Model: BERT-base-uncased
Dataset: sentiment_analysis_v2
Feedback System: Enabled (star ratings, thumbs up/down, text reviews)
Estimated Duration: 2-4 hours
Status: Queued for execution`, 
          exitCode: 0 
        };
      }
      if (cmd.includes('list')) {
        return { 
          output: `📋 Manufacturing Jobs
1. sentiment-tuning-v3     [RUNNING]    Progress: 67%
2. recommendation-opt      [COMPLETED]  Rating: ⭐⭐⭐⭐⭐
3. image-classifier-tune   [QUEUED]     ETA: 30 min
4. nlp-prompt-optimization [FAILED]     Error: Data validation
5. customer-feedback-loop  [RUNNING]    Progress: 23%`, 
          exitCode: 0 
        };
      }
      if (cmd.includes('feedback')) {
        return { 
          output: `💬 Feedback Summary
Job: sentiment-tuning-v3
⭐ Average Rating: 4.2/5 (based on 15 reviews)
👍 Positive Feedback: 87%
📝 Recent Comments:
  - "Excellent accuracy improvement!" (5⭐)
  - "Training time could be optimized" (3⭐)
  - "Great results on test data" (4⭐)
Suggestions: Reduce training time, add more validation metrics`, 
          exitCode: 0 
        };
      }
    }

    // Enhanced workstation commands
    if (cmd === 'quadrax init' || cmd === 'quadrax initialize' || cmd.includes('init workstation') || cmd.includes('create workstation')) {
      setTimeout(() => {
        if (onOpenNewWorkstation) {
          onOpenNewWorkstation();
        }
      }, 1000);
      return { output: 'Initializing workstation creation interface...\nOpening workstation configuration wizard...', exitCode: 0 };
    }
    
    // Context-specific enhanced commands
    if (context === 'workshop') {
      if (cmd.startsWith('quadrax')) {
        if (cmd.includes('list')) return { 
          output: `🛠️ Active Workstations:
1. ml-training-env-v2    [RUNNING]    CPU: 8 cores, RAM: 16GB, GPU: Tesla V100
2. data-processing-hub   [STOPPED]    CPU: 4 cores, RAM: 8GB
3. ai-research-lab       [RUNNING]    CPU: 16 cores, RAM: 32GB, GPU: 2x A100
4. dev-environment       [RUNNING]    CPU: 2 cores, RAM: 4GB`, 
          exitCode: 0 
        };
        if (cmd.includes('start')) return { output: 'Starting workstation environment...\nGPU acceleration enabled\nJupyter Lab server started on port 8888', exitCode: 0 };
        if (cmd.includes('stop')) return { output: 'Stopping workstation environment...\nSaving session state...\nWorkstation stopped successfully', exitCode: 0 };
      }
    }
    
    if (context === 'datakits') {
      if (cmd.startsWith('data')) {
        if (cmd.includes('upload')) return { 
          output: `📊 Uploading dataset to DataKits...
File: customer_analytics_2024.csv
Size: 2.3GB
Validation: ✓ Schema valid
Quality Score: 96%
Upload completed: dataset_v1.csv (2.3GB)
Available in DataKits dashboard`, 
          exitCode: 0 
        };
        if (cmd.includes('validate')) return { 
          output: `🔍 Dataset Validation Results:
✓ Schema validation passed
✓ Data types consistent
✓ No duplicate records found
⚠ 0.3% missing values in 'age' column
✓ Data quality score: 96%
✓ 1,250,000 records processed
Recommendations: Handle missing values in 'age' column`, 
          exitCode: 0 
        };
        if (cmd.includes('transform')) return { 
          output: `⚡ Data Transformation Pipeline:
Step 1: Missing value imputation    [✓ COMPLETED]
Step 2: Feature scaling             [✓ COMPLETED]  
Step 3: Categorical encoding        [✓ COMPLETED]
Step 4: Feature selection           [✓ COMPLETED]
Step 5: Train/test split            [✓ COMPLETED]
Transformation pipeline completed successfully
Output: processed_customer_data.csv`, 
          exitCode: 0 
        };
        if (cmd.includes('export')) return { 
          output: `📤 Exporting processed dataset...
Format: CSV, Parquet, JSON
Compression: gzip
Export location: /exports/processed_data_${new Date().toISOString().split('T')[0]}.csv
Export completed: 1.8GB → 450MB (compressed)`, 
          exitCode: 0 
        };
      }
    }

    if (context === 'models') {
      if (cmd.startsWith('model')) {
        if (cmd.includes('deploy')) return { 
          output: `🚀 Model Deployment Pipeline:
Model: customer-classifier-v2.1
Environment: production
Container: Docker image built successfully
Health checks: ✓ All passed
Load balancer: Configured
Auto-scaling: 1-10 instances
Endpoint: https://api.quadrax-ml.com/v1/predict
Status: ✓ DEPLOYED SUCCESSFULLY`, 
          exitCode: 0 
        };
        if (cmd.includes('train')) return { 
          output: `🧠 Model Training Progress:
Algorithm: Gradient Boosting Classifier
Dataset: 1,250,000 samples
Epoch 1/50: loss=0.4521, accuracy=0.8234, val_accuracy=0.8156
Epoch 10/50: loss=0.2341, accuracy=0.9123, val_accuracy=0.9087
Epoch 25/50: loss=0.1234, accuracy=0.9567, val_accuracy=0.9534
Epoch 50/50: loss=0.0876, accuracy=0.9723, val_accuracy=0.9698
Training completed! Final accuracy: 97.23%`, 
          exitCode: 0 
        };
        if (cmd.includes('evaluate')) return { 
          output: `📈 Model Evaluation Results:
Test Dataset: 250,000 samples
Accuracy: 94.7%
Precision: 95.2%
Recall: 94.1%
F1-Score: 94.6%
AUC-ROC: 0.987
Confusion Matrix:
  Predicted:  0      1
Actual: 0   47,234  1,876
        1   2,134   48,756
Model performance: EXCELLENT`, 
          exitCode: 0 
        };
        if (cmd.includes('logs')) return { 
          output: `📋 Model Inference Logs:
[2024-01-15 10:30:15] Model loaded successfully
[2024-01-15 10:30:16] Health check passed
[2024-01-15 10:31:20] Inference request processed (120ms)
[2024-01-15 10:31:45] Batch prediction completed (500 samples, 2.3s)
[2024-01-15 10:32:10] Model performance within SLA
[2024-01-15 10:32:30] Auto-scaling triggered (load: 85%)`, 
          exitCode: 0 
        };
      }
    }

    if (context === 'manufacture') {
      if (cmd.startsWith('manufacture') || cmd.startsWith('mfg')) {
        if (cmd.includes('create')) return { 
          output: `🏭 Manufacturing Job Creation:
Job Type: Fine-tuning workflow
Drag-and-drop interface: Available
Feedback systems: Enabled
  - Star ratings (1-5)
  - Thumbs up/down
  - Text reviews
  - Performance metrics
Job created successfully!
Use the web interface for visual workflow building`, 
          exitCode: 0 
        };
        if (cmd.includes('feedback')) return { 
          output: `💬 Manufacturing Feedback Analytics:
Total Jobs: 47
Average Rating: 4.3/5 stars
Positive Feedback: 89%
Top Rated Jobs:
  1. sentiment-analysis-v3    (4.8⭐)
  2. recommendation-engine    (4.7⭐)
  3. image-classifier-tune    (4.6⭐)
Recent Feedback:
  "Excellent fine-tuning results!" - 5⭐
  "Could use better progress tracking" - 3⭐`, 
          exitCode: 0 
        };
      }
    }

    if (context === 'codesheets') {
      if (cmd.startsWith('jupyter')) {
        return { 
          output: `🔬 Starting Jupyter Lab Server...
Environment: Python 3.11, R 4.3, Julia 1.9
Extensions: AI Assistant, Git integration, Real-time collaboration
Server running at: http://localhost:8888
Token: quadrax-ml-secure-token-2024
GPU support: ✓ CUDA 12.0 available
Ready for interactive development!`, 
          exitCode: 0 
        };
      }
      if (cmd.startsWith('python')) {
        return { 
          output: `🐍 Python 3.11.7 (main, Dec 15 2023, 12:09:04)
[GCC 11.4.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import tensorflow as tf
>>> print(f"TensorFlow version: {tf.__version__}")
TensorFlow version: 2.15.0
>>> print("GPU available:", tf.config.list_physical_devices('GPU'))
GPU available: [PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]`, 
          exitCode: 0 
        };
      }
      if (cmd.startsWith('pip install')) {
        const packageName = cmd.split(' ')[2] || 'package';
        return { 
          output: `📦 Installing ${packageName}...
Collecting ${packageName}
  Downloading ${packageName}-2.1.0-py3-none-any.whl (1.2 MB)
Installing collected packages: ${packageName}
Successfully installed ${packageName}-2.1.0
Note: Package available in all Codesheets environments`, 
          exitCode: 0 
        };
      }
    }

    // Enhanced system commands
    switch (cmd) {
      case 'ls':
      case 'dir':
        return { 
          output: shell === 'bash' 
            ? `📁 Directory Contents:
drwxr-xr-x  datasets/     (1.2TB - ML training data)
drwxr-xr-x  models/       (450GB - trained models)  
drwxr-xr-x  notebooks/    (2.3GB - Jupyter notebooks)
drwxr-xr-x  manufacturing/ (890MB - fine-tuning jobs)
drwxr-xr-x  scripts/      (156MB - automation scripts)
drwxr-xr-x  logs/         (2.1GB - system logs)
drwxr-xr-x  exports/      (3.4GB - processed outputs)` 
            : `📁 Directory: ${workingDirectory}

Mode    LastWriteTime         Length Name
----    -------------         ------ ----
d-----  12/15/2024  10:30 AM         datasets
d-----  12/15/2024  11:45 AM         models  
d-----  12/15/2024  09:15 AM         notebooks
d-----  12/15/2024  02:30 PM         manufacturing
d-----  12/15/2024  08:20 AM         scripts`, 
          exitCode: 0 
        };
      
      case 'pwd':
        return { output: workingDirectory, exitCode: 0 };
      
      case 'whoami':
        return { output: 'quadrax-user (ML Engineer)', exitCode: 0 };
      
      case 'date':
        return { output: new Date().toString(), exitCode: 0 };
      
      case 'clear':
      case 'cls':
        setCommandHistory([]);
        return { output: '', exitCode: 0 };

      case 'nvidia-smi':
        return { 
          output: `🖥️ GPU Status:
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 525.60.11    Driver Version: 525.60.11    CUDA Version: 12.0   |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  Tesla V100-SXM2...  On   | 00000000:00:04.0 Off |                    0 |
| N/A   42C    P0    45W / 300W |   2847MiB / 32768MiB |     67%      Default |
+-------------------------------+----------------------+----------------------+`, 
          exitCode: 0 
        };

      case 'top':
      case 'htop':
        return { 
          output: `📊 System Resources:
CPU Usage: 67% (8 cores @ 3.2GHz)
Memory: 45% (14.4GB / 32GB)
GPU: 67% (Tesla V100)
Disk I/O: 234 MB/s read, 156 MB/s write
Network: 1.2 GB/s in, 890 MB/s out

Top Processes:
PID    COMMAND           CPU%   MEM%
1234   model_training    45.2   12.3
5678   jupyter-lab       8.7    4.2
9012   data_processing   12.1   8.9`, 
          exitCode: 0 
        };
      
      case 'help':
        return { 
          output: `🚀 QUADRAX•ML Terminal Help

🔧 System Commands:
- bash/powershell     - Switch shell environment
- quadrax init        - Initialize new workstation
- nvidia-smi          - GPU status and utilization
- top/htop           - System resource monitoring

🤖 AI/ML Commands:
- ai deploy <model>   - Deploy model to production
- ai train <config>   - Start model training
- ai status          - AI system overview
- model evaluate     - Model performance metrics

🏭 Manufacturing Commands:
- manufacture create  - Create fine-tuning job
- manufacture list    - List all manufacturing jobs
- manufacture feedback - View job feedback analytics
- mfg start <job>    - Start manufacturing job

${context === 'workshop' ? '🛠️ Workshop Commands:\n- quadrax list/start/stop - Workstation management\n' : ''}${context === 'datakits' ? '📊 DataKit Commands:\n- data upload/validate/transform/export - Dataset operations\n' : ''}${context === 'models' ? '🧠 Model Commands:\n- model deploy/train/evaluate/logs - Model operations\n' : ''}${context === 'manufacture' ? '🏭 Manufacturing Commands:\n- manufacture create/feedback - Manufacturing operations\n' : ''}${context === 'codesheets' ? '💻 Development Commands:\n- jupyter notebook - Start Jupyter server\n- python <script> - Execute Python script\n- pip install <package> - Install packages\n' : ''}
📁 File Commands:
- ls/dir             - List directory contents
- pwd                - Show current directory
- clear/cls          - Clear terminal

💡 Pro Tips:
- Use tab completion for commands
- Arrow keys for command history
- Ctrl+C to interrupt running commands`, 
          exitCode: 0 
        };
      
      case 'exit':
        onClose();
        return { output: 'Goodbye! 👋', exitCode: 0 };
      
      case '':
        return { output: '', exitCode: 0 };
      
      default:
        if (cmd.startsWith('cd ')) {
          return { output: '', exitCode: 0 };
        }
        return { 
          output: shell === 'bash' 
            ? `bash: ${command}: command not found\n💡 Type 'help' for available commands` 
            : `'${command}' is not recognized as an internal or external command.\n💡 Type 'help' for available commands`, 
          exitCode: 1 
        };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const result = executeCommand(currentCommand);
    const newEntry: CommandHistory = {
      command: currentCommand,
      output: result.output,
      timestamp: new Date(),
      exitCode: result.exitCode
    };

    setCommandHistory(prev => [...prev, newEntry]);
    setCurrentCommand('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commands = commandHistory.map(h => h.command).filter(c => c.trim());
      if (commands.length > 0) {
        const newIndex = historyIndex === -1 ? commands.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commands[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commands = commandHistory.map(h => h.command).filter(c => c.trim());
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commands.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commands[newIndex]);
        }
      }
    }
  };

  const copyToClipboard = () => {
    const terminalContent = commandHistory.map(h => 
      `${prompt}${h.command}\n${h.output}`
    ).join('\n');
    navigator.clipboard.writeText(terminalContent);
  };

  const downloadLog = () => {
    const terminalContent = commandHistory.map(h => 
      `[${h.timestamp.toISOString()}] ${prompt}${h.command}\n${h.output}\nExit Code: ${h.exitCode}\n`
    ).join('\n');
    
    const blob = new Blob([terminalContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quadrax-terminal-log-${shell}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) return null;

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-black border-t border-[#00699a] shadow-2xl z-50 flex flex-col"
      style={{ height: isMinimized ? '40px' : `${terminalHeight}px` }}
    >
      {/* Resize Handle */}
      <div
        className="absolute top-0 left-0 right-0 h-1 cursor-row-resize bg-[#00699a] opacity-0 hover:opacity-100 transition-opacity duration-200"
        onMouseDown={() => setIsResizing(true)}
      />

      {/* Terminal Header */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-black to-[#005778] border-b border-[#00699a]">
        <div className="flex items-center gap-3">
          <TerminalIcon size={20} className="text-[#00beef]" />
          <span className="text-white font-medium">
            Enhanced Terminal - {context}
          </span>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
          
          {/* Shell Selector */}
          <div className="flex gap-1 ml-4">
            <button
              onClick={() => setShell('bash')}
              className={`px-3 py-1 text-xs rounded transition-colors duration-300 ${
                shell === 'bash' ? 'bg-[#00beef] text-black' : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              Bash
            </button>
            <button
              onClick={() => setShell('powershell')}
              className={`px-3 py-1 text-xs rounded transition-colors duration-300 ${
                shell === 'powershell' ? 'bg-[#00beef] text-black' : 'bg-gray-600 text-white hover:bg-gray-500'
              }`}
            >
              PowerShell
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
            title="Copy terminal content"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={downloadLog}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
            title="Download log"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`p-1 transition-colors duration-300 ${isConnected ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'}`}
            title={isConnected ? 'Disconnect' : 'Connect'}
          >
            <Power size={16} />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
            title={isMinimized ? 'Restore' : 'Minimize'}
          >
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-red-400 transition-colors duration-300"
            title="Close terminal"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="flex-1 p-4 bg-black text-green-400 font-mono text-sm overflow-y-auto custom-scrollbar"
          >
            <div className="mb-2 text-[#00beef]">
              🚀 QUADRAX•ML Enhanced {shell === 'bash' ? 'Bash' : 'PowerShell'} Terminal v2.0
              <br />
              🤖 AI/ML Commands Available | 🏭 Manufacturing Support | 📊 Real-time Monitoring
              <br />
              💡 Type 'help' for enhanced commands | 'quadrax init' to create workstation
              <br />
            </div>
            
            {commandHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                <div className="text-[#00beef]">
                  {prompt}<span className="text-white">{entry.command}</span>
                </div>
                {entry.output && (
                  <div className={`whitespace-pre-wrap ${entry.exitCode === 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {entry.output}
                  </div>
                )}
              </div>
            ))}
            
            {/* Current Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="text-[#00beef] mr-2">{prompt}</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                disabled={!isConnected}
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2 bg-gradient-to-r from-[#005778] to-black border-t border-[#00699a] text-xs text-gray-400 flex justify-between items-center">
            <span>Working Directory: {workingDirectory} | Context: {context}</span>
            <span>Shell: {shell} | Enhanced Mode | Height: {terminalHeight}px</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Terminal;