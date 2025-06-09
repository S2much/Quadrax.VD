import { useState } from 'react';
import { Terminal, FileJson, FileCode, Baseline as Pipeline, Monitor, Brain, BookOpen, Info, Settings, LogIn, UserPlus, Bot, Home } from 'lucide-react';
import Navbar from './components/Navbar';
import Workshop from './components/Workshop';
import VirtualMachines from './components/VirtualMachines';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Datakits from './components/Datakits';
import Codesheets from './components/Codesheets';
import Pipelines from './components/Pipelines';
import Models from './components/Models';
import Documentation from './components/Documentation';
import About from './components/About';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'workshops', label: 'Workshops', icon: Terminal },
    { id: 'datakits', label: 'Datakits', icon: FileJson },
    { id: 'notebooks', label: 'Codesheets', icon: FileCode },
    { id: 'pipelines', label: 'Pipelines', icon: Pipeline },
    { id: 'vms', label: 'VMs', icon: Monitor },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'register', label: 'Register', icon: UserPlus },
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00beef] to-black overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black via-black to-[#00699a] h-16 text-white px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-black [text-shadow:2px_2px_2px_#fff,_-2px_-2px_2px_#fff,_2px_-2px_2px_#fff,_-2px_2px_2px_#fff]">
          QUADRAX_ML
        </h1>
        <button 
          onClick={toggleChatbot}
          className="bg-[#00beef] text-black px-3 py-2 text-lg md:text-2xl font-bold flex items-center gap-2 hover:bg-[#00a8d6] transition-colors duration-300"
        >
          <Bot size={28} className="md:w-10 md:h-10" />
          <span className="hidden md:inline">QUADRAX_AI</span>
        </button>
      </header>
      
      <main className="flex pt-16 h-screen">
        <Navbar 
          navItems={navItems} 
          bottomNavItems={bottomNavItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          isCollapsed={isNavCollapsed}
          setIsCollapsed={setIsNavCollapsed}
        />
        
        <div className={`flex-1 transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-64'} ${isChatbotOpen ? 'mr-80' : 'mr-0'}`}>
          {currentPage === 'home' && <Dashboard />}
          {currentPage === 'workshops' && <Workshop />}
          {currentPage === 'vms' && <VirtualMachines />}
          {currentPage === 'datakits' && <Datakits />}
          {currentPage === 'notebooks' && <Codesheets />}
          {currentPage === 'pipelines' && <Pipelines />}
          {currentPage === 'models' && <Models />}
          {currentPage === 'documentation' && <Documentation />}
          {currentPage === 'about' && <About />}
          {/* Other components will be rendered here based on currentPage */}
        </div>

        <Chatbot 
          isOpen={isChatbotOpen} 
          onClose={() => setIsChatbotOpen(false)} 
        />
      </main>
    </div>
  );
}

export default App;