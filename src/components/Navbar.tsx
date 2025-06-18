import { LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';
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

  // Filter nav items based on login status
  const filteredNavItems = isLoggedIn 
    ? navItems // Show all items when logged in
    : navItems.filter(item => !['workshops', 'datakits', 'notebooks', 'pipelines', 'vms', 'models'].includes(item.id)); // Hide protected items when not logged in

  const shouldExpand = isHovered && isCollapsed;
  const navWidth = shouldExpand ? 'w-64' : (isCollapsed ? 'w-16' : 'w-52'); // Reduced from w-64 to w-52

  return (
    <nav 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black flex flex-col transition-all duration-300 z-40 ${navWidth}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
        >
          {(shouldExpand || !isCollapsed) ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

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
              className={`w-full p-3 flex items-center text-white text-base ${(shouldExpand || !isCollapsed) ? 'gap-3' : 'justify-center'}`} // Increased from text-sm to text-base
              title={(isCollapsed && !shouldExpand) ? item.label : ''}
            >
              <item.icon size={22} /> {/* Increased from 20 to 22 */}
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
                className={`w-full p-3 flex items-center text-white text-base ${(shouldExpand || !isCollapsed) ? 'gap-3' : 'justify-center'}`} // Increased from text-sm to text-base
                title={(isCollapsed && !shouldExpand) ? item.label : ''}
              >
                <item.icon size={22} /> {/* Increased from 20 to 22 */}
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