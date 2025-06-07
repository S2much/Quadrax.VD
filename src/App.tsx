import { useState } from 'react';
import { Menu, Terminal, FlaskRound as  Box, FileCode, Baseline as Pipeline, Monitor, Brain, BookOpen, User, Settings, LogIn, UserPlus, Bot } from 'lucide-react';
import Navbar from './components/Navbar';
import Workshop from './components/Workshop';
import VirtualMachines from './components/VirtualMachines';
import Home from './components/Home';
import Chatbot from './components/Chatbot';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'register', label: 'Register', icon: UserPlus },
  ];

  return (
  
    <div className="min-h-screen bg-gradient-to-b from-[#00beef] to-black">
      <header className="bg-gradient-to-b from-black via-black to-[#00699a] h-[7vh] text-white px-4 flex justify-between items-center shadow-md">
        <h1 className="text-4xl font-bold text-black [text-shadow:2px_2px_2px_#fff,_-2px_-2px_2px_#fff,_2px_-2px_2px_#fff,_-2px_2px_2px_#fff]">
          QUADRAX_ML
        </h1>
        <button id="AI" className="bg-[#00beef] text-black px-3 text-4xl font-bold flex items-center">
          <Bot size={40} />
          QUADRAX_AI
        </button>
      </header>
      
      <main className="flex flex-row justify-between w-30">
        <Navbar 
          navItems={navItems} 
          bottomNavItems={bottomNavItems}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        
        <div className="flex-1">
          {currentPage === 'home' && <Home />}
          {currentPage === 'workshops' && <Workshop />}
          {currentPage === 'datakits' && <Datakits />}
          {currentPage === 'vms' && <VirtualMachines />}
          
          {/* Other components will be rendered here based on currentPage */}
        </div>
        <div className="w-30">
          {currentPage ==='chatBot' && <Chatbot />}
        </div>
      </main>
    </div>
  );
}

export default App;