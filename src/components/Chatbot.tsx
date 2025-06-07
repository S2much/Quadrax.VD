import { useState } from 'react';
import { Send } from 'lucide-react';


function  Chatbot () {
      
    const aiPrompt = ""; 
    useState('');    
    return (
    <div className="bg-gradient-to-b from-black via-black to-[#005778] p-6 rounded-lg">
      <h4 className="text-2xl text-white font-normal w-30 border-r-2 border-b-2 border-[#00699a] p-2">
        Start a chat with AI
      </h4>
      <form className="w-30 mx-auto my-5 bg-gradient-to-b from-[#005778] via-black to-black p-4 flex flex-col items-center gap-3">
        <label htmlFor="ask-ai" className="text-2xl text-white">
          Ask AI
        </label>
        <div className="flex w-full gap-2 justify-center">
          <textarea 
            id="ask-ai"
            value= {aiPrompt}
            placeholder="Ask me anything..."
            className="w-30 bg-gradient-to-b from-black via-black to-[#005778] border border-[#00699a] text-xl text-[#00beef] placeholder:text-[#00beef] placeholder:opacity-80 placeholder:italic"
          />
          <button 
            type="submit"
            className="w-12 h-12 rounded-full border-2 border-[#00699a] bg-black flex items-center justify-center"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </form>
    </div>
  );

} export default Chatbot