import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Minimize2, Copy, Download, Power, ChevronUp, ChevronDown } from 'lucide-react';

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

  // Simulated command execution
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
    
    // Workstation initialization commands
    if (cmd === 'quadrax init' || cmd === 'quadrax initialize' || cmd.includes('init workstation') || cmd.includes('create workstation')) {
      // Trigger workstation creation modal
      setTimeout(() => {
        if (onOpenNewWorkstation) {
          onOpenNewWorkstation();
        }
      }, 1000);
      return { output: 'Initializing workstation creation interface...\nOpening workstation configuration wizard...', exitCode: 0 };
    }
    
    // Context-specific commands
    if (context === 'workshop') {
      if (cmd.startsWith('quadrax')) {
        if (cmd.includes('list')) return { output: 'Active workstations:\n- quadrax-ml-v_2 (active)\n- data-processing-env (stopped)', exitCode: 0 };
        if (cmd.includes('start')) return { output: 'Starting workstation environment...', exitCode: 0 };
        if (cmd.includes('stop')) return { output: 'Stopping workstation environment...', exitCode: 0 };
      }
    }
    
    if (context === 'datakits') {
      if (cmd.startsWith('data')) {
        if (cmd.includes('upload')) return { output: 'Uploading dataset to DataKits...\nUpload completed: dataset_v1.csv (1.2MB)', exitCode: 0 };
        if (cmd.includes('validate')) return { output: 'Validating dataset...\n✓ Schema validation passed\n✓ Data quality check: 96%', exitCode: 0 };
        if (cmd.includes('transform')) return { output: 'Applying data transformations...\nTransformation pipeline completed.', exitCode: 0 };
        if (cmd.includes('export')) return { output: 'Exporting dataset...\nExport completed: processed_data.csv', exitCode: 0 };
      }
    }

    if (context === 'models') {
      if (cmd.startsWith('model')) {
        if (cmd.includes('deploy')) return { output: 'Deploying model to production...\nModel deployed successfully at endpoint: /api/v1/predict', exitCode: 0 };
        if (cmd.includes('train')) return { output: 'Starting model training...\nEpoch 1/10: loss=0.4521, accuracy=0.8234', exitCode: 0 };
        if (cmd.includes('evaluate')) return { output: 'Model evaluation results:\nAccuracy: 94.7%\nPrecision: 95.2%\nRecall: 94.1%', exitCode: 0 };
        if (cmd.includes('logs')) return { output: 'Model logs:\n[INFO] Model loaded successfully\n[INFO] Inference completed in 120ms', exitCode: 0 };
      }
    }

    if (context === 'pipelines') {
      if (cmd.startsWith('pipeline')) {
        if (cmd.includes('run')) return { output: 'Executing pipeline...\n[1/5] Data ingestion: ✓\n[2/5] Data processing: ✓\n[3/5] Model training: running...', exitCode: 0 };
        if (cmd.includes('status')) return { output: 'Pipeline Status:\n- customer-analysis: Running (67%)\n- fraud-detection: Completed\n- image-classification: Failed', exitCode: 0 };
        if (cmd.includes('logs')) return { output: 'Pipeline logs:\n[2024-01-15 10:30:15] Pipeline started\n[2024-01-15 10:31:20] Data validation passed', exitCode: 0 };
        if (cmd.includes('stop')) return { output: 'Stopping pipeline execution...', exitCode: 0 };
      }
    }

    if (context === 'codesheets') {
      if (cmd.startsWith('jupyter')) {
        return { output: 'Starting Jupyter notebook server...\nServer running at: http://localhost:8888', exitCode: 0 };
      }
      if (cmd.startsWith('python')) {
        return { output: 'Python 3.9.7 (default, Sep 16 2021, 16:59:28)\nExecuting script...', exitCode: 0 };
      }
      if (cmd.startsWith('pip install')) {
        const packageName = cmd.split(' ')[2] || 'package';
        return { output: `Installing ${packageName}...\nSuccessfully installed ${packageName}`, exitCode: 0 };
      }
    }

    // Common commands
    switch (cmd) {
      case 'ls':
      case 'dir':
        return { 
          output: shell === 'bash' 
            ? 'datasets/  models/  notebooks/  pipelines/  scripts/  logs/' 
            : 'Directory: ' + workingDirectory + '\n\nMode    LastWriteTime    Length Name\n----    -------------    ------ ----\nd-----  12/15/2024  datasets\nd-----  12/15/2024  models\nd-----  12/15/2024  notebooks', 
          exitCode: 0 
        };
      
      case 'pwd':
        return { output: workingDirectory, exitCode: 0 };
      
      case 'whoami':
        return { output: 'quadrax-user', exitCode: 0 };
      
      case 'date':
        return { output: new Date().toString(), exitCode: 0 };
      
      case 'clear':
      case 'cls':
        setCommandHistory([]);
        return { output: '', exitCode: 0 };
      
      case 'help':
        return { 
          output: `Available commands:
- bash/powershell - Switch shell environment
- quadrax init - Initialize new workstation
${context === 'workshop' ? '- quadrax list/start/stop - Workstation management\n' : ''}${context === 'datakits' ? '- data upload/validate/transform/export - Dataset operations\n' : ''}${context === 'models' ? '- model deploy/train/evaluate/logs - Model operations\n' : ''}${context === 'pipelines' ? '- pipeline run/status/logs/stop - Pipeline management\n' : ''}${context === 'codesheets' ? '- jupyter notebook - Start Jupyter server\n- python <script> - Execute Python script\n- pip install <package> - Install packages\n' : ''}- ls/dir - List directory contents
- pwd - Show current directory
- whoami - Show current user
- date - Show current date/time
- clear/cls - Clear terminal
- exit - Close terminal`, 
          exitCode: 0 
        };
      
      case 'exit':
        onClose();
        return { output: 'Goodbye!', exitCode: 0 };
      
      case '':
        return { output: '', exitCode: 0 };
      
      default:
        if (cmd.startsWith('cd ')) {
          return { output: '', exitCode: 0 };
        }
        return { 
          output: shell === 'bash' 
            ? `bash: ${command}: command not found` 
            : `'${command}' is not recognized as an internal or external command.`, 
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
    a.download = `terminal-log-${shell}-${Date.now()}.txt`;
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
            Terminal - {context}
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
              QUADRAX•ML {shell === 'bash' ? 'Bash' : 'PowerShell'} Terminal v1.0
              <br />
              Type 'help' for available commands. Use 'bash' or 'powershell' to switch shells.
              <br />
              Try 'quadrax init' to initialize a new workstation.
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
            <span>Working Directory: {workingDirectory}</span>
            <span>Shell: {shell} | Context: {context} | Height: {terminalHeight}px</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Terminal;