import { useState, useEffect } from 'react';
import { Home, Terminal, FileJson, FileCode, Baseline as Pipeline, Monitor, Brain, BookOpen, Info, Settings as Settings2,Search, HelpCircle, LogIn, LogOut, UserPlus, Bot} from 'lucide-react';
import Navbar from './components/Navbar';
import Workshop from './components/Workshop';
import VirtualMachines from './components/VirtualMachines';
import HomePage from './components/HomePage';
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
import NewWorkstationModal from './components/NewWorkstationModal';

interface WorkstationData {
  name: string;
  function: string;
  nature: string[];
  description: string;
}

function App2() {
   const [currentPage, setCurrentPage] = useState('homePage');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [chatbotWidth, setChatbotWidth] = useState(30); // Width in vw
  const [isChatbotDetached, setIsChatbotDetached] = useState(false);
  const [isNewWorkstationOpen, setIsNewWorkstationOpen] = useState(false);
  const [workstationTriggerSource, setWorkstationTriggerSource] = useState<'workshop' | 'chatbot' | 'cli'>('workshop');

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
      }, 800, LoadingSpinner);

      return () => clearTimeout(timer);
    }
  }, [pageLoading, isLoading]);

  // Auto scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const navItems = [
    { id: 'homePage', label: 'HomePage', icon: Home },
    { id: 'workshops', label: 'Workshops', icon: Terminal },
    { id: 'datakits', label: 'Datakits', icon: FileJson },
    { id: 'notebooks', label: 'Codesheets', icon: FileCode },
    { id: 'pipelines', label: 'Pipelines', icon: Pipeline },
    { id: 'vms', label: 'VMs', icon: Monitor },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
  ];

  const bottomNavItems = isLoggedIn ? [
    { id: 'settings', label: 'Settings', icon: Settings2 },
    { id: 'logout', label: 'Log Out', icon: LogOut },
  ] : [
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'register', label: 'Register', icon: UserPlus },
  ];

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleCancel = () => {
    setCurrentPage('homePage');
  };

  const handleLogin = (email: string, password: string) => {
    // Simple authentication check
    if (email === 'drax123@example.com' && password === '@Pwd123456') {
      setIsLoggedIn(true);
      setUser({ email, userName: 'Drax123' });
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCurrentPage('homePage');
    setShowLogoutConfirm(false);
    setIsChatbotOpen(false);
  };

  const handleNavClick = (pageId: string) => {
    if (pageId === 'logout') {
      handleLogout();
    } else {
      setCurrentPage(pageId);
    }
  };

  const handleOpenNewWorkstation = (source: 'workshop' | 'chatbot' | 'cli' = 'chatbot') => {
    if (!isLoggedIn) {
      // If not logged in, the chatbot should handle this case
      return;
    }
    setWorkstationTriggerSource(source);
    setIsNewWorkstationOpen(true);
  };

  const handleCreateWorkstation = (workstationData: WorkstationData) => {
    console.log('Creating workstation:', workstationData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it and show a success message
    
    // You could add the new workstation to your state here
    // and redirect to the workshops page to see it
    setCurrentPage('workshops');
  };

  // Check if current page is auth-related
  const isAuthPage = currentPage === 'login' || currentPage === 'register';
  
  // Disable chatbot for auth pages
  const isChatbotDisabled = isAuthPage;

  // If on auth pages, render them without navbar/chatbot
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        {currentPage === 'login' && (
          <Login 
            onCancel={handleCancel} 
            onLogin={handleLogin}
          />
        )}
        {currentPage === 'register' && (
          <Register 
            onCancel={handleCancel}
            onRegister={() => setCurrentPage('login')}
          />
        )}
      </div>
    );
  }

  // Calculate chatbot margin for all pages
  const getChatbotMargin = () => {
    return isChatbotOpen && !isChatbotDisabled && !isChatbotDetached ? chatbotWidth : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00beef] to-black overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-[#00699a] h-16 text-white px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-4xl text-white [text-shadow:2px_2px_0px_#008aab,_-2px_-2px_2px_#000,_2px_-2px_2px_#000,_-2px_2px_0px_#008aab]">
        QUADRAX•ML
        </h1>
         {/* Search Bar */}
         <div className="flex mx-8">
          <div className="relative w-[24vw]">
            <Search className="absolute right-3 top-8 transform -translate-y-1/2 text-white z-10" size={25} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[24vw] relative top-1/4 pl-5 py-2 bg-gradient-to-r from-black to-[#005778] border border-[#00699a] text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:border-[#00beef]"
            />
          </div>
        
<button className="relative top-2 p-1 text-white hover:text-[#00beef] transition-colors duration-10">
            <HelpCircle size={30} />
          </button>
          </div>

        <div className="flex items-center gap-4">
        <button onClick={toggleChatbot} disabled={isChatbotDisabled}
          className="bg-[#00beef] w-[12vw] text-black px-3 py-2 text-lg md:text-xl font-bold flex items-center gap-2 hover:bg-[#00a8d6] transition-colors duration-300">
          <Bot size={26} className="md:w-8 md:h-8" />
          <span className="hidden md:inline">QUADRAX_AI</span>
        </button>
        </div>
      </header>
      
      <main className="flex pt-16 h-screen">
        {/* Navbar is now visible on all pages */}
        <Navbar 
          navItems={navItems} 
          bottomNavItems={bottomNavItems}
          currentPage={currentPage}
          setCurrentPage={handleNavClick}
          isCollapsed={isNavCollapsed}
          setIsCollapsed={setIsNavCollapsed}
          isLoggedIn={isLoggedIn}
        />
        
        <div 
          className="flex-1 transition-all duration-300 overflow-hidden"
          style={{ 
            marginLeft: isNavCollapsed ? '64px' : '208px', // 16px = w-16, 52px = w-52
            marginRight: `${getChatbotMargin()}vw`
          }}
        >
          <div className="h-full overflow-y-auto custom-scrollbar">
            {currentPage === 'homePage' && <HomePage onGetStarted={() => setCurrentPage('register')} />}
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
          </div>
        </div>

        {!isChatbotDisabled && (
          <Chatbot 
            isOpen={isChatbotOpen} 
            onClose={() => setIsChatbotOpen(false)}
            width={chatbotWidth}
            setWidth={setChatbotWidth}
            isDetached={isChatbotDetached}
            setIsDetached={setIsChatbotDetached}
            onOpenNewWorkstation={() => handleOpenNewWorkstation('chatbot')}
          />
        )}
      </main>

      {/* New Workstation Modal */}
      <NewWorkstationModal
        isOpen={isNewWorkstationOpen}
        onClose={() => setIsNewWorkstationOpen(false)}
        onCreateWorkstation={handleCreateWorkstation}
        triggerSource={workstationTriggerSource}
      />

 {/* Logout Confirmation Modal */}
 {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gradient-to-b from-black to-[#005778] p-6 rounded-lg border border-[#00699a] max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Logout</h3>
            <p className="text-gray-300 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex gap-4">
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
              >
                Yes, Log Out
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-[#00699a] hover:bg-[#00beef] text-white rounded-lg transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App2;