how to get started:

**Creating Your First DataKit:**
1. Navigate to the **Datakits** section
2. Click **"Create DataKit"** 
3. Upload your dataset (CSV, JSON, Parquet, Excel, etc.)
4. Configure data validation and quality checks
5. Set up automated preprocessing pipelines

**Supported Formats:**
• CSV, JSON, Parquet files
• Excel spreadsheets (.xlsx, .xls)
• Text files and logs
• Database connections
• Cloud storage integration

Would you like me to guide you through creating your first DataKit?`;
    }

    // Codesheet creation
    if (input.includes('codesheet') || input.includes('notebook') || input.includes('development')) {
      return `💻 **Codesheet Development Environment**

Codesheets provide interactive development environments for data analysis and ML experimentation:

**Getting Started:**
1. Go to the **Codesheets** section
2. Click **"New Codesheet"**
3. Choose from templates:
   - Data Exploration
   - ML Classification
   - Deep Learning
   - Time Series Analysis

**Features:**
• Interactive Python/R execution
• Real-time collaboration
• Integrated data visualization
• Version control and sharing
• Direct DataKit integration

Ready to start your first interactive analysis session?`;
    }

    // Default response
    return `I understand you're asking about "${userInput}". Let me help you get started with QUADRAX•ML!

🚀 **Quick Start Options:**

**For Beginners:**
• Say **"create workstation"** to set up your first development environment
• Say **"upload dataset"** to start with data management
• Say **"help"** for a complete getting started guide

**For Development:**
• **"new codesheet"** - Interactive development environment
• **"setup pipeline"** - Automate your workflows
• **"train model"** - AI model development

**Platform Sections:**
• **Workshop**: Manage development workstations
• **DataKits**: Upload and manage datasets
• **Codesheets**: Interactive development environments
• **Pipelines**: Workflow automation
• **Models**: AI model training and deployment

What would you like to explore first?`;
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

    try {
      const aiResponse = await generateAIResponse(aiPrompt);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm experiencing technical difficulties. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
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
                placeholder="Ask me anything about ML, data science, or say 'create workstation' to get started..."
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
              Press Enter to send, Shift+Enter for new line • Powered by QUADRAX AI
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;