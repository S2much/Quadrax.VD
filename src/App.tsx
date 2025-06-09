import { useState, useEffect } from 'react';
import { Menu, Terminal, FlaskRound as Box, FileCode, Baseline as Pipeline, Monitor, Brain, BookOpen, User, Settings as SettingsIcon, LogIn, UserPlus, Bot, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Workshop from './components/Workshop';
import VirtualMachines from './components/VirtualMachines';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Datakits from './components/Datakits';
import Codesheets from './components/Codesheets';
import Pipelines from './components/Pipelines';
import Models from './components/Models';
import Documentation from './components/Documentation';
import About from './components/About';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Auto scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Menu },
    { id: 'workshops', label: 'Workshops', icon: Terminal },
    { id: 'datakits', label: 'Datakits', icon: Box },
    { id: 'notebooks', label: 'Codesheets', icon: FileCode },
    { id: 'pipelines', label: 'Pipelines', icon: Pipeline },
    { id: 'vms', label: 'VMs', icon: Monitor },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'about', label: 'About', icon: User },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'register', label: 'Register', icon: UserPlus },
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleCancel = () => {
    setCurrentPage('home');
  };

  // Check if current page is auth-related
  const isAuthPage = currentPage === 'login' || currentPage === 'register';
  
  // Disable chatbot for auth pages
  const isChatbotDisabled = isAuthPage;

  // If on auth pages, render them without navbar/chatbot
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        {currentPage === 'login' && <Login onCancel={handleCancel} />}
        {currentPage === 'register' && <Register onCancel={handleCancel} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00beef] to-black overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-[#00699a] h-16 text-white px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-4xl font-bold text-black [text-shadow:2px_2px_2px_#fff,_-2px_-2px_2px_#fff,_2px_-2px_2px_#fff,_-2px_2px_2px_#fff]">
          QUADRAX_ML
        </h1>
        <button 
          onClick={toggleChatbot}
          disabled={isChatbotDisabled}
          className={`px-3 py-2 text-lg md:text-2xl font-bold flex items-center gap-2 rounded-lg transition-colors duration-300 ${
            isChatbotDisabled 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-[#00beef] text-black hover:bg-[#00a8d6]'
          }`}
        >
          <Bot size={24} className="md:w-10 md:h-10" />
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
        
        <div className={`flex-1 transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-64'} ${isChatbotOpen && !isChatbotDisabled ? 'mr-80' : 'mr-0'}`}>
          {currentPage === 'home' && <Home />}
          {currentPage === 'workshops' && <Workshop />}
          {currentPage === 'vms' && <VirtualMachines />}
          {currentPage === 'datakits' && <Datakits />}
          {currentPage === 'notebooks' && <Codesheets />}
          {currentPage === 'pipelines' && <Pipelines />}
          {currentPage === 'models' && <Models />}
          {currentPage === 'documentation' && <Documentation />}
          {currentPage === 'about' && <About />}
          {currentPage === 'settings' && <Settings />}
        </div>

        {!isChatbotDisabled && (
          <Chatbot 
            isOpen={isChatbotOpen} 
            onClose={() => setIsChatbotOpen(false)} 
          />
        )}
      </main>
    </div>
  );
}

export default App;