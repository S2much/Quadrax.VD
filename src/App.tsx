import { useState, useEffect } from 'react';
import { Home, Terminal, FileJson, FileCode, Baseline as Pipeline, Monitor, Brain, BookOpen, Info, Settings as Settings2, LogIn, UserPlus, Bot} from 'lucide-react';
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
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Page transition loading effect
  useEffect(() => {
    if (!isLoading) {
      setPageLoading(true);
      const timer = setTimeout(() => {
        setPageLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [currentPage, isLoading]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Auto scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
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
    { id: 'settings', label: 'Preferences', icon: Settings2 },
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

  // Show loading spinner
  if (isLoading || pageLoading) {
    return <LoadingSpinner isLoading={true} />;
  }
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
      <header className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black via-black to-[#00699a] h-16 text-white px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-4xl text-white [text-shadow:2px_2px_0px_#008aab,_-2px_-2px_2px_#000,_2px_-2px_2px_#000,_-2px_2px_0px_#008aab]">
          QUADRAX_ML
        </h1>
        <button onClick={toggleChatbot} disabled={isChatbotDisabled}
          className="bg-[#00beef] text-black px-3 py-2 text-lg md:text-2xl font-bold flex items-center gap-2 hover:bg-[#00a8d6] transition-colors duration-300">
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
        
        <div className={`flex-1 transition-all duration-300 ${isNavCollapsed ? 'ml-16' : 'ml-60'} ${isChatbotOpen ? 'mr-80' : 'mr-0'}`}>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'workshops' && <Workshop />}
          {currentPage === 'vms' && <VirtualMachines />}
          {currentPage === 'datakits' && <Datakits />}
          {currentPage === 'notebooks' && <Codesheets />}
          {currentPage === 'pipelines' && <Pipelines />}
          {currentPage === 'models' && <Models />}
          {currentPage === 'documentation' && <Documentation />}
          {currentPage === 'about' && <About />}
          {currentPage === 'settings' && <Settings />}
          {currentPage === 'login' && <Login />}
          {currentPage === 'register' && <Register />}
          
          {/* Other components will be rendered here based on currentPage */}
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