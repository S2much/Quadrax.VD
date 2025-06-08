import { useState } from 'react';
import { Send, X, Minimize2 } from 'lucide-react';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [aiPrompt, setAiPrompt] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI prompt submission here
    console.log('AI Prompt:', aiPrompt);
    setAiPrompt('');
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 p-2 [height:90vh] bg-gradient-to-b from-black via-black to-[#005778] shadow-2xl transition-all duration-300 z-40 ${isMinimized ? 'w-16' : 'w-80'}`}>
      <div className="flex justify-between items-center p-4 border-b border-[#00699a]">
        {!isMinimized && (
          <h4 className="text-xl text-white font-medium">
            QUADRAX AI
          </h4>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-white hover:bg-red-600 p-1 rounded transition-colors duration-300"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col h-full">
          <div className="flex-1 p-2 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-[#00699a] p-3 rounded-sm">
                <p className="text-white text-xl">
                  Hello! I'm your <strong>QUADRAX AI Assistant</strong>.<br/> How can I help you with your ML projects today?
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#00beef]">
            <div className="flex">
              <textarea 
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-black border-[#00beef] text-white placeholder:text-[#00beef] placeholder:opacity-80 p-2 rounded resize-none h-12"
                rows={1}
              />
              <button 
                type="submit"
                className="w-12 h-12 border-2 border-[#00beef] bg-black flex items-center justify-center hover:bg-[#00699a] transition-colors duration-300"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chatbot;