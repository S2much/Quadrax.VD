import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Bot, User, Loader2, Maximize2, ExternalLink } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  setWidth: (width: number) => void;
  isDetached: boolean;
  setIsDetached: (detached: boolean) => void;
  onOpenNewWorkstation?: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function Chatbot({ isOpen, onClose, width, setWidth, isDetached, setIsDetached, onOpenNewWorkstation }: ChatbotProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm QUADRAX AI, your intelligent assistant for machine learning and data science. I can help you with:\n\n• Model training and optimization\n• Data analysis and preprocessing\n• Pipeline configuration\n• Best practices and troubleshooting\n• Code generation and debugging\n• **Workstation management** - I can help you create, start, or initialize workstations!\n\nHow can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle resize functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || isDetached) return;
      
      const newWidth = ((window.innerWidth - e.clientX) / window.innerWidth) * 100;
      const clampedWidth = Math.max(20, Math.min(50, newWidth));
      setWidth(clampedWidth);
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
  }, [isResizing, setWidth, isDetached]);

  // Enhanced AI responses with workstation creation capability
  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Workstation creation keywords
    const workstationKeywords = ['create', 'start', 'make', 'initialize', 'init', 'new', 'setup'];
    const workstationTerms = ['workstation', 'workspace', 'environment', 'env'];
    
    const hasWorkstationKeyword = workstationKeywords.some(keyword => input.includes(keyword));
    const hasWorkstationTerm = workstationTerms.some(term => input.includes(term));
    
    if (hasWorkstationKeyword && hasWorkstationTerm) {
      // Trigger workstation creation modal
      setTimeout(() => {
        if (onOpenNewWorkstation) {
          onOpenNewWorkstation();
        }
      }, 1500);
      
      return `🚀 **Workstation Creation Initiated**

I'll help you create a new workstation! Opening the workstation initialization interface...

**What you can configure:**
• **Name**: Choose a unique identifier (letters, numbers, hyphens, underscores only)
• **Function**: Development, Training, Processing, Inference, Automation, or Custom
• **Nature**: Data Science, Data Engineering, Machine Learning, AI, Automation
• **Description**: Detailed purpose and requirements for AI analysis

The initialization wizard will guide you through each step. You'll be able to:
- Set up custom resource allocation
- Choose pre-configured ML frameworks
- Define your specific use case
- Get AI-powered recommendations

Let's get your new workstation up and running! 🎯`;
    }

    // Model-related queries
    if (input.includes('model') || input.includes('training') || input.includes('ml')) {
      return `Great question about machine learning models! Here are some key recommendations:

🤖 Model Selection: Consider your data type and problem complexity. For structured data, try Random Forest or XGBoost. For unstructured data, neural networks work well.

📊 Training Tips:
• Split your data: 70% training, 15% validation, 15% test
• Use cross-validation for robust evaluation
• Monitor for overfitting with validation curves

🔧 Optimization: Start with hyperparameter tuning using grid search or Bayesian optimization.

Would you like me to help you with a specific model type or training challenge?`;
    }

    // Data-related queries
    if (input.includes('data') || input.includes('dataset') || input.includes('preprocessing')) {
      return `Data is the foundation of great ML! Here's how to handle it effectively:

📈 Data Quality:
• Check for missing values and outliers
• Ensure consistent formatting
• Validate data types and ranges

🔄 Preprocessing Steps:
1. Handle missing data (imputation/removal)
2. Encode categorical variables
3. Scale/normalize numerical features
4. Feature engineering for better performance

📊 **Exploratory Analysis**: Use our Datakits section to visualize distributions, correlations, and patterns.

What specific data challenges are you facing?`;
    }

    // Pipeline-related queries
    if (input.includes('pipeline') || input.includes('workflow') || input.includes('automation')) {
      return `Pipelines are essential for scalable ML workflows! Here's how to build effective ones:

⚙️ Pipeline Components:
• Data ingestion and validation
• Preprocessing and feature engineering
• Model training and evaluation
• Deployment and monitoring

🔄 Best Practices:
• Use version control for data and models
• Implement automated testing
• Set up monitoring and alerting
• Enable rollback capabilities

🚀 QUADRAX Features: Check out our Pipelines section for pre-built templates and visual workflow builders.

Need help designing a specific pipeline?`;
    }

    // Code-related queries
    if (input.includes('code') || input.includes('python') || input.includes('script') || input.includes('programming')) {
      return `I'd be happy to help with your coding needs! Here are some quick tips:

💻 Python Best Practices:
• Use virtual environments for dependency management
• Follow PEP 8 style guidelines
• Write docstrings and comments
• Implement error handling

📝 ML Code Structure:
\`\`\`python
# Example model training structure
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load and split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
\`\`\`

What specific coding challenge can I help you with?`;
    }

    // Performance and optimization
    if (input.includes('performance') || input.includes('optimize') || input.includes('slow') || input.includes('speed')) {
      return `Performance optimization is crucial for production ML systems! Here are key strategies:

⚡ Model Performance:
• Use feature selection to reduce dimensionality
• Try ensemble methods for better accuracy
• Consider model compression techniques
• Implement early stopping during training

🚀 System Performance:
• Utilize GPU acceleration for deep learning
• Implement batch processing for inference
• Use caching for frequently accessed data
• Consider distributed computing for large datasets

📊 Monitoring: Set up performance dashboards to track:
• Model accuracy over time
• Inference latency
• Resource utilization
• Data drift detection

What performance bottlenecks are you experiencing?`;
    }

    // Error handling and debugging
    if (input.includes('error') || input.includes('bug') || input.includes('problem') || input.includes('issue')) {
      return `Debugging ML systems can be tricky! Here's a systematic approach:

🔍 Common Issues:
• Data leakage: Check for future information in features
• Overfitting: Validate on unseen data
• Underfitting: Increase model complexity or features
• Data quality: Verify data consistency and completeness

🛠️ Debugging Steps:
1. Check data shapes and types
2. Validate preprocessing steps
3. Monitor training metrics
4. Test with smaller datasets
5. Use logging and visualization

📋 QUADRAX Tools: Use our Codesheets for interactive debugging and our monitoring dashboards for real-time insights.

Can you describe the specific error or issue you're encountering?`;
    }

    // General help or greetings
    if (input.includes('hello') || input.includes('hi') || input.includes('help') || input.includes('start')) {
      return `Hello! Welcome to QUADRAX•ML! I'm here to help you succeed with your machine learning projects.

🎯 Popular Topics:
• Getting started with ML workflows
• Data preprocessing and analysis
• Model selection and training
• Pipeline automation
• Performance optimization
• **Workstation creation and management**

🔧 Platform Features:
• Workshops: Organize your ML projects
• Datakits: Manage and explore datasets
• Codesheets: Interactive notebooks
• Models: Deploy and monitor ML models
• Pipelines: Automate your workflows

💡 **Quick Tip**: Try saying "create a new workstation" to get started with a new development environment!

What would you like to explore first?`;
    }

    // Default response for unrecognized queries
    return `I understand you're asking about "${userInput}". While I may not have a specific answer for that exact query, I can help you with:

🤖 Machine Learning: Model selection, training, and optimization
📊 Data Science: Analysis, preprocessing, and visualization  
⚙️ MLOps: Pipeline automation and deployment
💻 Development: Code assistance and best practices
🚀 **Workstation Management**: Create, configure, and manage development environments

Could you provide more details about what you're trying to accomplish? I'm here to help guide you through any ML challenges you're facing!

You can also explore our platform sections:
• Use Datakits for data management
• Try Codesheets for interactive analysis
• Check Models for deployment options
• Visit Pipelines for workflow automation
• **Say "initialize workstation" to create a new development environment**`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: aiPrompt,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setAiPrompt('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(aiPrompt),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleDetach = () => {
    setIsDetached(!isDetached);
  };

  if (!isOpen) return null;

  const chatbotStyle = isDetached 
    ? {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '500px',
        zIndex: 50,
        borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }
    : {
        position: 'fixed' as const,
        right: 0,
        top: 0,
        width: `${width}vw`,
        height: '96vh',
        zIndex: 40
      };

  return (
    <div 
      className={`bg-gradient-to-b from-black via-black to-[#005778] shadow-2xl transition-all duration-300 border-l border-[#00699a] ${isMinimized ? 'w-30' : 'w-70'}`}
      style={chatbotStyle}
    >
      {/* Resize handle for attached mode */}
      {!isDetached && (
        <div
          ref={resizeRef}
          className="absolute left-0 top-0 w-1 h-full cursor-col-resize bg-[#00699a] opacity-0 hover:opacity-100 transition-opacity duration-200"
          onMouseDown={() => setIsResizing(true)}
        />
      )}

      <div className="flex justify-between items-center p-4 border-b border-[#00699a] bg-black/50">
        {!isMinimized && (
          <h4 className="text-xl text-white font-medium flex items-center gap-2">
            <Bot className="text-[#00beef]" size={24} />
            QUADRAX AI
          </h4>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleDetach}
            className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
            title={isDetached ? 'Attach' : 'Detach'}
          >
            {isDetached ? <Maximize2 size={16} /> : <ExternalLink size={16} />}
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
            title={isMinimized ? 'Expand' : 'Minimize'}
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-600 p-1 rounded transition-colors duration-300"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-full">
          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 bg-[#00699a] rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                
                <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-[#00beef] text-black ml-auto'
                        : 'bg-[#00699a]/80 text-white'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-[#00beef] rounded-full flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-black" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-[#00699a] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-[#00699a]/80 text-white p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm">QUADRAX AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="h-40 border-t border-[#00699a] bg-black/30">
            <div className="flex gap-2">
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask me anything about ML, data science, AI, or say 'create workstation'..."
                className="flex-1 bg-gradient-to-b from-black via-black to-[#005778] h-35 border border-[#00699a] text-white placeholder:text-gray-400 placeholder:opacity-80 p-3 rounded-m resize-none focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300 custom-scrollbar"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={!aiPrompt.trim() || isTyping}
                className="w-12 h-12 border-2 border-[#00699a] bg-black flex items-center justify-center hover:bg-[#00699a] disabled:opacity-80 disabled:cursor-not-allowed transition-all duration-300 self-start"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center">
              Press Enter to send, Shift+Enter for new line • Try: "create a new workstation"
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;