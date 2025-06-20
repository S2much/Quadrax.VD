import { useState, useEffect } from 'react';
import { X, Terminal, Database, Brain, Zap, Settings, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';

interface NewWorkstationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWorkstation: (workstationData: WorkstationData) => void;
  triggerSource?: 'workshop' | 'chatbot' | 'cli';
}

interface WorkstationData {
  name: string;
  function: string;
  nature: string[];
  description: string;
}

function NewWorkstationModal({ isOpen, onClose, onCreateWorkstation, triggerSource = 'workshop' }: NewWorkstationModalProps) {
  const [step, setStep] = useState(1);
  const [workstationName, setWorkstationName] = useState('');
  const [selectedFunction, setSelectedFunction] = useState('');
  const [selectedNature, setSelectedNature] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const functions = [
    { id: 'development', name: 'Development Environment', icon: Terminal, description: 'Code development and testing' },
    { id: 'training', name: 'Model Training', icon: Brain, description: 'Machine learning model training' },
    { id: 'processing', name: 'Data Processing', icon: Database, description: 'ETL and data transformation' },
    { id: 'inference', name: 'Model Inference', icon: Zap, description: 'Real-time model serving' },
    { id: 'automation', name: 'Automation Pipeline', icon: Settings, description: 'Automated workflows' },
    { id: 'custom', name: 'Custom Configuration', icon: Sparkles, description: 'Define your own setup' }
  ];

  const natures = [
    { id: 'data-science', name: 'Data Science', color: 'bg-blue-500/20 border-blue-400' },
    { id: 'data-engineering', name: 'Data Engineering', color: 'bg-green-500/20 border-green-400' },
    { id: 'machine-learning', name: 'Machine Learning', color: 'bg-purple-500/20 border-purple-400' },
    { id: 'ai', name: 'Artificial Intelligence', color: 'bg-pink-500/20 border-pink-400' },
    { id: 'automation', name: 'Automation', color: 'bg-orange-500/20 border-orange-400' }
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setWorkstationName('');
      setSelectedFunction('');
      setSelectedNature([]);
      setDescription('');
      setNameError('');
      setAiAnalysis('');
    }
  }, [isOpen]);

  const validateName = (name: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    if (!name) {
      setNameError('Workstation name is required');
      return false;
    }
    if (!regex.test(name)) {
      setNameError('Name can only contain letters, numbers, hyphens, and underscores');
      return false;
    }
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters long');
      return false;
    }
    if (name.length > 50) {
      setNameError('Name must be less than 50 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameChange = (value: string) => {
    setWorkstationName(value);
    validateName(value);
  };

  const handleNatureToggle = (natureId: string) => {
    setSelectedNature(prev => 
      prev.includes(natureId) 
        ? prev.filter(id => id !== natureId)
        : [...prev, natureId]
    );
  };

  const analyzeDescription = async () => {
    if (!description.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = `Based on your description, QUADRAX AI recommends:
      
🎯 **Optimal Configuration**: ${selectedFunction || 'Development Environment'}
🔧 **Suggested Resources**: 8 CPU cores, 16GB RAM, 200GB storage
📦 **Recommended Packages**: TensorFlow, PyTorch, Pandas, Scikit-learn
🔒 **Security Level**: Standard with encrypted data access
⚡ **Performance Tier**: High-performance computing enabled

This workstation appears well-suited for ${selectedNature.join(', ').toLowerCase()} tasks with excellent scalability potential.`;
      
      setAiAnalysis(analysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleCreateWorkstation = async () => {
    setIsCreating(true);
    
    // Simulate workstation creation
    setTimeout(() => {
      const workstationData: WorkstationData = {
        name: workstationName,
        function: selectedFunction,
        nature: selectedNature,
        description
      };
      
      onCreateWorkstation(workstationData);
      setIsCreating(false);
      onClose();
    }, 3000);
  };

  const canProceedToStep2 = workstationName && !nameError;
  const canProceedToStep3 = selectedFunction && selectedNature.length > 0;
  const canCreate = description.trim().length > 10;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-black via-black to-[#005778] rounded-2xl border border-[#00699a] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#00699a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00beef]/20 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-[#00beef]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Initialize New Workstation</h2>
              <p className="text-gray-300 text-sm">
                {triggerSource === 'chatbot' && 'Initiated via QUADRAX AI'}
                {triggerSource === 'cli' && 'Initiated via Command Line'}
                {triggerSource === 'workshop' && 'Create a new development environment'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#00699a]/20 rounded-lg transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-black/30">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  step >= stepNum 
                    ? 'bg-[#00beef] text-black' 
                    : 'bg-gray-600 text-gray-300'
                }`}>
                  {step > stepNum ? <CheckCircle size={16} /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                    step > stepNum ? 'bg-[#00beef]' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={step >= 1 ? 'text-[#00beef]' : 'text-gray-400'}>Configuration</span>
            <span className={step >= 2 ? 'text-[#00beef]' : 'text-gray-400'}>Specification</span>
            <span className={step >= 3 ? 'text-[#00beef]' : 'text-gray-400'}>Finalization</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
          {/* Step 1: Basic Configuration */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Basic Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Workstation Name *
                    </label>
                    <input
                      type="text"
                      value={workstationName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="e.g., ml-training-env, data-pipeline-01"
                      className={`w-full px-4 py-3 bg-gradient-to-r from-black to-[#005778] border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        nameError 
                          ? 'border-red-500 focus:ring-red-500/20' 
                          : 'border-[#00699a] focus:border-[#00beef] focus:ring-[#00beef]/20'
                      }`}
                    />
                    {nameError && (
                      <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                        <AlertCircle size={16} />
                        {nameError}
                      </div>
                    )}
                    {workstationName && !nameError && (
                      <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                        <CheckCircle size={16} />
                        Name is available
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                    <h4 className="text-white font-semibold mb-2">Naming Guidelines</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Use only letters (a-z, A-Z), numbers (0-9), hyphens (-), and underscores (_)</li>
                      <li>• Must be between 3-50 characters long</li>
                      <li>• Choose a descriptive name that reflects the workstation's purpose</li>
                      <li>• Examples: data-analysis-2024, ml-training-gpu, automation-pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Function and Nature */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Workstation Specification</h3>
                
                {/* Function Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Primary Function *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {functions.map((func) => {
                      const IconComponent = func.icon;
                      return (
                        <button
                          key={func.id}
                          onClick={() => setSelectedFunction(func.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            selectedFunction === func.id
                              ? 'border-[#00beef] bg-[#00beef]/10'
                              : 'border-[#00699a]/30 hover:border-[#00699a] bg-black/30'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <IconComponent size={20} className="text-[#00beef]" />
                            <span className="text-white font-semibold">{func.name}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{func.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nature Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Workstation Nature * (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {natures.map((nature) => (
                      <button
                        key={nature.id}
                        onClick={() => handleNatureToggle(nature.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedNature.includes(nature.id)
                            ? `${nature.color} border-opacity-100`
                            : 'border-[#00699a]/30 hover:border-[#00699a] bg-black/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{nature.name}</span>
                          {selectedNature.includes(nature.id) && (
                            <CheckCircle size={16} className="text-[#00beef]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Description and AI Analysis */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Description & AI Analysis</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Workstation Description *
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe the purpose, goals, and intended use of this workstation. Include any specific requirements, datasets you'll work with, or models you plan to develop..."
                      rows={6}
                      className="w-full px-4 py-3 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300 resize-none custom-scrollbar"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-sm ${description.length < 10 ? 'text-red-400' : 'text-green-400'}`}>
                        {description.length} characters (minimum 10 required)
                      </span>
                      <button
                        onClick={analyzeDescription}
                        disabled={!description.trim() || isAnalyzing}
                        className="px-4 py-2 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles size={16} />
                            Analyze with AI
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* AI Analysis Results */}
                  {(isAnalyzing || aiAnalysis) && (
                    <div className="bg-gradient-to-b from-[#005778] to-black p-4 rounded-lg border border-[#00699a]/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-[#00beef]" />
                        <h4 className="text-white font-semibold">QUADRAX AI Analysis</h4>
                      </div>
                      {isAnalyzing ? (
                        <div className="flex items-center gap-3 text-gray-300">
                          <Loader2 size={20} className="animate-spin text-[#00beef]" />
                          <span>Analyzing your workstation requirements...</span>
                        </div>
                      ) : (
                        <div className="text-gray-300 whitespace-pre-line text-sm">
                          {aiAnalysis}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Summary */}
                  <div className="bg-black/50 p-4 rounded-lg border border-[#00699a]/30">
                    <h4 className="text-white font-semibold mb-3">Workstation Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Name:</span>
                        <span className="text-[#00beef]">{workstationName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Function:</span>
                        <span className="text-[#00beef]">
                          {functions.find(f => f.id === selectedFunction)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Nature:</span>
                        <span className="text-[#00beef]">
                          {selectedNature.map(id => 
                            natures.find(n => n.id === id)?.name
                          ).join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#00699a] bg-black/30">
          <div className="flex gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-all duration-300"
              >
                Previous
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-black/50 hover:bg-[#005778] text-white rounded-lg border border-[#00699a] transition-all duration-300"
            >
              Cancel
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !canProceedToStep2) ||
                  (step === 2 && !canProceedToStep3)
                }
                className="px-6 py-2 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCreateWorkstation}
                disabled={!canCreate || isCreating}
                className="px-6 py-2 bg-[#00beef] hover:bg-[#00699a] disabled:bg-gray-600 disabled:cursor-not-allowed text-black disabled:text-gray-400 font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Creating Workstation...
                  </>
                ) : (
                  'Create Workstation'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewWorkstationModal;