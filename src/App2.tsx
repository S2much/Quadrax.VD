import { useState, useEffect } from 'react';
import { Home, AppWindow, Hammer, Brain, BookOpen, Info, Settings as Settings2,Search, HelpCircle, LogIn, LogOut, UserPlus, Bot} from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Models from './components/Models';
import Documentation from './components/Documentation';
import Manufacture from './components/Manufacture';
import About from './components/About';
import Settings from './components/Settings';
import Login from './components/Login';
import Register from './components/Register';
import LoadingSpinner from './components/LoadingSpinner';


function App2() {
   const [currentPage, setCurrentPage] = useState('homePage');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [chatbotWidth, setChatbotWidth] = useState(30); // Width in vw
  const [isChatbotDetached, setIsChatbotDetached] = useState(false);

  // Auto scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Initial loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = isLoggedIn ? [ 
    { id: 'dashboard', label: 'Dashboard', icon: AppWindow },
    { id: 'manufacture', label: 'Manufacture', icon: Hammer },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ] : [ 
    { id: 'home', label: 'Home', icon: Home },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'about', label: 'About', icon: Info },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ]

  const bottomNavItems = isLoggedIn ? [
    { id: 'settings', label: 'Settings', icon: Settings2 },
    { id: 'logout', label: 'Log Out', icon: LogOut }
  ] : [
    { id: 'login', label: 'Login', icon: LogIn },
    { id: 'register', label: 'Register', icon: UserPlus }
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
    <>
      <LoadingSpinner isLoading={isLoading} />
    <div className="min-h-screen bg-gradient-to-b from-[#006889] to-black overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black to-[#00699a] h-16 text-white px-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl md:text-4xl text-white [text-shadow:2px_2px_0px_#008aab,_-2px_-2px_2px_#000,_2px_-2px_2px_#000,_-2px_2px_0px_#008aab] [transform:scaleX(1.2)_translateX(2vw)]">
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
          </div>

        <div className="flex items-center gap-4 mr-20">
        <button onClick={toggleChatbot} disabled={isChatbotDisabled}
          className="bg-[#000] w-[8vw] text-[#00beef] px-3 py-1 [border:2px_solid_#00beef] text-lg md:text-xl font-bold flex items-center gap-2 hover:bg-[#00a8d6] transition-colors duration-300">
          <Bot size={30} className="md:w-12 md:h-12" />
          <span className="hidden md:inline">AI</span>
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
            {currentPage === 'manufacture' && <Manufacture />}
            {currentPage === 'models' && <Models />}
            {currentPage === 'documentation' && <Documentation />}
            {currentPage === 'about' && <About />}
            {currentPage === 'help' && (
              <div className="p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
                <p className="text-gray-300">Need help with QUADRAX•ML? Contact our support team.</p>
              </div>
            )}
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
          />
        )}
      </main>
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
    </>
  );
}

export default App2;
