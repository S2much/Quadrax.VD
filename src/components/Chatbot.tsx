import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, X, Minimize2, Maximize2, ExternalLink, Loader2, Sparkles, Code, Database, Zap, Brain, Terminal, FileText, Settings, Star, ThumbsUp, ThumbsDown, Copy, Download, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'code' | 'chart' | 'suggestion';
  metadata?: any;
  rating?: 'like' | 'dislike' | null;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  width: number;
  setWidth: (width: number) => void;
  isDetached: boolean;
  setIsDetached: (detached: boolean) => void;
  onOpenNewWorkstation?: () => void;
}

export default function Chatbot({ 
  isOpen, 
  onClose, 
  width, 
  setWidth, 
  isDetached, 
  setIsDetached,
  onOpenNewWorkstation 
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `🚀 **Welcome to QUADRAX•ML AI Assistant!**

I'm your intelligent companion for machine learning, data science, and platform navigation. I can help you with:

**🛠️ Development & Deployment:**
• **"deploy model"** - Guide you through model deployment
• **"create workstation"** - Set up development environments
• **"start manufacturing"** - Begin fine-tuning workflows

**📊 Data & Analytics:**
• **"analyze dataset"** - Perform data analysis
• **"optimize performance"** - System optimization tips
• **"generate code"** - Create ML code snippets

**🎯 Smart Features:**
• Voice commands (click mic icon)
• Code generation and execution
• Real-time system monitoring
• Interactive tutorials

**Quick Commands:**
• Say **"help"** for detailed guidance
• Say **"status"** for system overview
• Say **"tutorial"** for interactive learning

What would you like to explore today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversationMode, setConversationMode] = useState<'text' | 'voice'>('text');
  const [aiPersonality, setAiPersonality] = useState<'professional' | 'friendly' | 'technical'>('friendly');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      const newWidth = Math.max(20, Math.min(60, ((window.innerWidth - e.clientX) / window.innerWidth) * 100));
      setWidth(newWidth);
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
  }, [isResizing, setWidth]);

  const generateAIResponse = async (userInput: string): Promise<Message> => {
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const input = userInput.toLowerCase();

    // Enhanced AI responses with more intelligence
    if (input.includes('deploy model') || input.includes('deployment')) {
      return {
        id: Date.now().toString(),
        content: `🚀 **Model Deployment Wizard**

I'll guide you through deploying your ML model to production:

**Step 1: Pre-deployment Checklist**
✅ Model validation completed
✅ Performance benchmarks met
✅ Security scan passed
✅ Resource requirements calculated

**Step 2: Deployment Configuration**
\`\`\`yaml
deployment:
  environment: production
  scaling:
    min_instances: 2
    max_instances: 10
    target_cpu: 70%
  monitoring:
    health_checks: enabled
    metrics: comprehensive
    alerts: configured
\`\`\`

**Step 3: Deployment Options**
• **Blue-Green Deployment** - Zero downtime
• **Canary Release** - Gradual rollout
• **Rolling Update** - Progressive replacement

**Next Steps:**
1. Click "Deploy Model" in the Models section
2. Select your trained model
3. Configure deployment settings
4. Monitor deployment progress

Would you like me to walk you through any specific deployment strategy?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'code'
      };
    }

    if (input.includes('create workstation') || input.includes('workstation') || input.includes('development environment')) {
      // Trigger workstation creation
      setTimeout(() => {
        if (onOpenNewWorkstation) {
          onOpenNewWorkstation();
        }
      }, 1000);

      return {
        id: Date.now().toString(),
        content: `🛠️ **Workstation Creation Assistant**

Perfect! I'm launching the workstation creation wizard for you.

**What I'm setting up:**

**🔧 Development Environment Options:**
• **Basic**: Python 3.11, Jupyter, pandas, scikit-learn (2 CPU, 4GB RAM)
• **Advanced**: + TensorFlow, PyTorch, CUDA support (8 CPU, 16GB RAM)
• **Custom**: Specify your exact requirements

**📦 Pre-installed Packages:**
• Data Science: pandas, numpy, matplotlib, seaborn
• ML Frameworks: scikit-learn, tensorflow, pytorch
• Development: jupyter, vscode-server, git
• Utilities: docker, kubectl, terraform

**🔒 Security & Access:**
• Encrypted data access
• VPN integration
• Role-based permissions
• Audit logging

**⚡ Performance Features:**
• GPU acceleration (optional)
• Distributed computing
• Auto-scaling resources
• Performance monitoring

The workstation wizard is opening now. You can customize all settings to match your project needs!`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'suggestion'
      };
    }

    if (input.includes('start manufacturing') || input.includes('manufacturing') || input.includes('fine-tuning')) {
      return {
        id: Date.now().toString(),
        content: `🏭 **Manufacturing Playground**

Welcome to the Manufacturing section - your drag-and-drop ML fine-tuning playground!

**🎯 What You Can Do:**
• **Fine-tune models** with custom prompts
• **Drag-and-drop** data processing workflows
• **Rate and review** model outputs
• **A/B test** different configurations

**🔧 Interactive Features:**
• **Visual Workflow Builder** - Drag components to create pipelines
• **Prompt Engineering** - Test and refine model prompts
• **Feedback Systems** - Star ratings, like/dislike, text reviews
• **Real-time Monitoring** - Watch your jobs in progress

**📊 Feedback & Rating System:**
• ⭐ Star ratings (1-5 stars)
• 👍👎 Quick like/dislike feedback
• 📝 Detailed text reviews
• 📈 Performance metrics tracking

**🚀 Quick Start:**
1. Navigate to the Manufacturing section
2. Choose a base model to fine-tune
3. Drag data sources into the workflow
4. Configure prompts and parameters
5. Start the manufacturing job
6. Rate and review results

Ready to start manufacturing? The playground awaits your creativity!`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'suggestion'
      };
    }

    if (input.includes('analyze dataset') || input.includes('data analysis')) {
      return {
        id: Date.now().toString(),
        content: `📊 **Advanced Dataset Analysis**

I'll help you perform comprehensive data analysis:

**🔍 Analysis Capabilities:**
• **Statistical Summary** - Mean, median, mode, std dev
• **Data Quality Assessment** - Missing values, outliers, duplicates
• **Correlation Analysis** - Feature relationships and dependencies
• **Distribution Analysis** - Data patterns and anomalies

**📈 Visualization Options:**
\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load and analyze your dataset
df = pd.read_csv('your_dataset.csv')

# Quick statistical overview
print(df.describe())

# Correlation heatmap
plt.figure(figsize=(12, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm')
plt.title('Feature Correlation Matrix')
plt.show()

# Distribution plots
df.hist(figsize=(15, 10), bins=30)
plt.suptitle('Feature Distributions')
plt.show()
\`\`\`

**🎯 Smart Recommendations:**
• Feature engineering suggestions
• Data cleaning strategies
• Model selection guidance
• Performance optimization tips

Upload your dataset to DataKits and I'll provide detailed analysis!`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'code'
      };
    }

    if (input.includes('generate code') || input.includes('code')) {
      return {
        id: Date.now().toString(),
        content: `💻 **AI Code Generator**

I can generate code for various ML tasks:

**🤖 Machine Learning Templates:**
\`\`\`python
# Classification Model Template
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Load and prepare data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
print(classification_report(y_test, predictions))
\`\`\`

**🧠 Deep Learning with PyTorch:**
\`\`\`python
import torch
import torch.nn as nn

class NeuralNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(input_size, hidden_size),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(hidden_size, output_size)
        )
    
    def forward(self, x):
        return self.layers(x)
\`\`\`

**What specific code would you like me to generate?**
• Data preprocessing pipelines
• Model training scripts
• Evaluation metrics
• Deployment configurations`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'code'
      };
    }

    if (input.includes('status') || input.includes('system')) {
      return {
        id: Date.now().toString(),
        content: `📊 **System Status Overview**

**🖥️ Current System State:**
• **Active Workstations**: 3 running
• **Models Deployed**: 12 in production
• **Manufacturing Jobs**: 8 in progress
• **Datasets Processed**: 47 this week

**⚡ Resource Utilization:**
• **CPU Usage**: 67% (Normal)
• **Memory Usage**: 45% (Optimal)
• **Storage Usage**: 78% (Monitor)
• **GPU Utilization**: 34% (Available)

**🎯 Performance Metrics:**
• **Success Rate**: 94.7%
• **Average Response Time**: 120ms
• **Uptime**: 99.9%
• **Error Rate**: 0.3%

**🔔 Recent Alerts:**
• ✅ Model deployment successful (2 min ago)
• ⚠️ Storage approaching 80% capacity
• ✅ Manufacturing job completed (15 min ago)

**💡 Recommendations:**
• Consider storage cleanup
• Scale up GPU resources for peak hours
• Review failed jobs for optimization

Everything looks healthy! Need help with any specific area?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'chart'
      };
    }

    if (input.includes('help') || input.includes('getting started') || input.includes('guide')) {
      return {
        id: Date.now().toString(),
        content: `📚 **QUADRAX•ML Complete Guide**

**🏗️ Platform Architecture:**
• **Workshop** - Development workstations and environments
• **DataKits** - Dataset management and processing
• **Codesheets** - Interactive development notebooks
• **Manufacturing** - Fine-tuning playground with feedback
• **Models** - ML model deployment and monitoring
• **VMs** - Virtual machine management

**🚀 Getting Started Workflow:**
1. **Create Workstation** → Set up development environment
2. **Upload Dataset** → Import and validate your data
3. **Explore in Codesheets** → Interactive data analysis
4. **Build in Manufacturing** → Fine-tune with feedback
5. **Deploy Models** → Production deployment
6. **Monitor Performance** → Track and optimize

**🎯 Advanced Features:**
• **Voice Commands** - Talk to me naturally
• **Code Generation** - AI-powered code creation
• **Smart Suggestions** - Context-aware recommendations
• **Real-time Monitoring** - Live system insights

**💬 Communication Tips:**
• Use natural language - I understand context
• Ask for specific help - "deploy my classifier model"
• Request code examples - "show me PyTorch code"
• Get system info - "what's my resource usage?"

**🔧 Quick Commands:**
• "create workstation" → Launch workstation wizard
• "start manufacturing" → Open fine-tuning playground
• "analyze dataset" → Data analysis tools
• "deploy model" → Deployment guidance
• "system status" → Current system overview

What would you like to dive into first?`,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };
    }

    // Default enhanced response
    return {
      id: Date.now().toString(),
      content: `I understand you're asking about "${userInput}". Let me provide some intelligent assistance!

🧠 **AI-Powered Suggestions:**

**For Your Query, I Recommend:**
• **Manufacturing Playground** - Try drag-and-drop fine-tuning
• **Smart Code Generation** - Let me write code for you
• **Interactive Tutorials** - Step-by-step guidance
• **Voice Commands** - Talk to me naturally

**🎯 Popular Actions:**
• **"deploy my model"** - Production deployment guide
• **"create workstation"** - Development environment setup
• **"analyze my data"** - Comprehensive data insights
• **"generate code for [task]"** - Custom code creation

**💡 Pro Tips:**
• Use voice commands for hands-free interaction
• Ask for specific code examples
• Request system performance insights
• Get personalized recommendations

**🔧 Quick Access:**
• Click the mic icon for voice input
• Use the settings gear for AI personality
• Rate my responses to improve assistance

What specific task can I help you accomplish today?`,
      sender: 'bot',
      timestamp: new Date(),
      type: 'suggestion'
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: aiPrompt,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setAiPrompt('');
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(aiPrompt);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRating = (messageId: string, rating: 'like' | 'dislike') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, rating: msg.rating === rating ? null : rating }
        : msg
    ));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  const toggleSpeech = () => {
    setIsSpeaking(!isSpeaking);
    // Text-to-speech would be implemented here
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMessageTypeIcon = (type?: string) => {
    switch (type) {
      case 'code': return Code;
      case 'chart': return Database;
      case 'suggestion': return Sparkles;
      default: return Bot;
    }
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
        width: '800px',
        height: '600px',
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
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="text-[#00beef]" size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h4 className="text-lg text-white font-medium">QUADRAX AI</h4>
              <div className="text-xs text-gray-400">Enhanced Assistant</div>
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300 ${isListening ? 'bg-red-500' : ''}`}
            title="Voice Input"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          <button
            onClick={toggleSpeech}
            className={`text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300 ${isSpeaking ? 'bg-blue-500' : ''}`}
            title="Text to Speech"
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <select
            value={aiPersonality}
            onChange={(e) => setAiPersonality(e.target.value as any)}
            className="text-xs bg-black border border-[#00699a] text-white rounded px-2 py-1"
            title="AI Personality"
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="technical">Technical</option>
          </select>
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
            {messages.map((message) => {
              const MessageIcon = getMessageTypeIcon(message.type);
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-[#00699a] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageIcon size={16} className="text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-[#00beef] text-black ml-auto'
                          : message.type === 'code'
                          ? 'bg-gray-900 text-green-400 border border-[#00699a]'
                          : message.type === 'chart'
                          ? 'bg-blue-900/30 text-blue-100 border border-blue-500/30'
                          : 'bg-[#00699a]/80 text-white'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Message Actions */}
                      {message.sender === 'bot' && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-white/20">
                          <button
                            onClick={() => handleRating(message.id, 'like')}
                            className={`p-1 rounded transition-colors duration-300 ${
                              message.rating === 'like' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-green-400'
                            }`}
                          >
                            <ThumbsUp size={14} />
                          </button>
                          <button
                            onClick={() => handleRating(message.id, 'dislike')}
                            className={`p-1 rounded transition-colors duration-300 ${
                              message.rating === 'dislike' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-red-400'
                            }`}
                          >
                            <ThumbsDown size={14} />
                          </button>
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1 text-gray-400 hover:text-white transition-colors duration-300"
                          >
                            <Copy size={14} />
                          </button>
                          {message.type === 'code' && (
                            <button className="p-1 text-gray-400 hover:text-white transition-colors duration-300">
                              <Download size={14} />
                            </button>
                          )}
                        </div>
                      )}
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
              );
            })}

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
          <form onSubmit={handleSubmit} className="border-t border-[#00699a] bg-black/30 p-4">
            <div className="flex gap-2">
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask me anything about ML, data science, or say 'create workstation' to get started..."
                className="flex-1 bg-gradient-to-b from-black via-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 placeholder:opacity-80 p-3 rounded-lg resize-none focus:outline-none focus:border-[#00beef] focus:ring-2 focus:ring-[#00beef]/20 transition-all duration-300 custom-scrollbar"
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
                className="w-12 h-12 border-2 border-[#00699a] bg-black flex items-center justify-center hover:bg-[#00699a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
              >
                {isTyping ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-2 text-center flex justify-between items-center">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span className="flex items-center gap-2">
                <Sparkles size={12} className="text-[#00beef]" />
                Enhanced AI • Voice Enabled
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}