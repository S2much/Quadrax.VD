import { DivideIcon as LucideIcon, Lock, Unlock } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface NavbarProps {
  navItems: NavItem[];
  bottomNavItems: NavItem[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isLoggedIn: boolean;
}

function Navbar({ navItems, bottomNavItems, currentPage, setCurrentPage, isCollapsed, setIsCollapsed, isLoggedIn }: NavbarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  // Filter nav items based on login status
  const filteredNavItems = isLoggedIn 
    ? navItems // Show all items when logged in
    : navItems.filter(item => !['workshops', 'datakits', 'notebooks', 'pipelines', 'vms', 'models'].includes(item.id)); // Hide protected items when not logged in

  // When locked, prevent hover expansion and maintain current state
  const shouldExpand = !isLocked && isHovered && isCollapsed;
  const navWidth = shouldExpand ? 'w-64' : (isCollapsed ? 'w-16' : 'w-52');

  const handleLockToggle = () => {
    setIsLocked(!isLocked);
    // If we're locking while expanded via hover, collapse it
    if (!isLocked && shouldExpand) {
      setIsCollapsed(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isLocked) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isLocked) {
      setIsHovered(false);
    }
  };

  return (
    <nav 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black flex flex-col transition-all duration-300 z-40 ${navWidth}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex justify-between items-center p-2">
        {/* Manual collapse/expand button - only show when not locked */}
        {!isLocked && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
            title={isCollapsed ? "Expand navbar" : "Collapse navbar"}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        )}
        
        {/* Lock/Unlock button */}
        <button
          onClick={handleLockToggle}
          className={`text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300 ${
            isLocked ? 'bg-[#00beef]/20 text-[#00beef]' : ''
          }`}
          title={isLocked ? "Unlock navbar (enable hover)" : "Lock navbar (disable hover)"}
        >
          {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
        </button>
      </div>

      {/* Lock status indicator */}
      {isLocked && (shouldExpand || !isCollapsed) && (
        <div className="px-3 py-1 text-xs text-[#00beef] bg-[#00beef]/10 border-b border-[#00beef]/20">
          Navbar locked {isCollapsed ? 'collapsed' : 'expanded'}
        </div>
      )}

      <ul className="list-none flex flex-col flex-1 overflow-hidden">
        {filteredNavItems.map((item) => (
          <li 
            key={item.id}
            className={`hover:bg-[#00699a] transition-colors duration-300 ${
              currentPage === item.id ? 'bg-[#00699a]' : ''
            }`}
          >
            <button
              onClick={() => setCurrentPage(item.id)}
              className={`w-full p-3 flex items-center text-white text-base ${(shouldExpand || !isCollapsed) ? 'gap-3' : 'justify-center'}`}
              title={(isCollapsed && !shouldExpand) ? item.label : ''}
            >
              <item.icon size={22} />
              {(shouldExpand || !isCollapsed) && <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <ul className="list-none m-0 p-0 flex flex-col">
          {bottomNavItems.map((item) => (
            <li 
              key={item.id}
              className="hover:bg-[#00699a] transition-colors duration-300"
            >
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full p-3 flex items-center text-white text-base ${(shouldExpand || !isCollapsed) ? 'gap-3' : 'justify-center'}`}
                title={(isCollapsed && !shouldExpand) ? item.label : ''}
              >
                <item.icon size={22} />
                {(shouldExpand || !isCollapsed) && <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
        <hr className="border-none bg-[#00beef] h-[1px] w-full" />
      </div>
    </nav>
  );
}

export default Navbar;