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
    ? navItems.filter(item => item.id !== 'homePage')
    : navItems.filter(item => !['dashboard', 'workshops', 'datakits', 'notebooks', 'pipelines', 'vms', 'models'].includes(item.id));

  const shouldExpand = isHovered || !isCollapsed;

  return (
    <nav 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black flex flex-col transition-all duration-300 z-40 ${shouldExpand ? 'w-64' : 'w-16'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
        >
          {shouldExpand ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <ul className="list-none flex flex-col flex-1">
        {filteredNavItems.map((item) => (
          <li 
            key={item.id}
            className={`hover:bg-[#00699a] transition-colors duration-300 ${
              currentPage === item.id ? 'bg-[#00699a]' : ''
            }`}
          >
            <button
              onClick={() => setCurrentPage(item.id)}
              className={`w-full p-3 flex items-center text-white ${shouldExpand ? 'gap-3' : 'justify-center'}`}
              title={!shouldExpand ? item.label : ''}
            >
              <item.icon size={20} />
              {shouldExpand && <span className="text-sm font-medium">{item.label}</span>}
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
                className={`w-full p-3 flex items-center text-white ${shouldExpand ? 'gap-3' : 'justify-center'}`}
                title={!shouldExpand ? item.label : ''}
              >
                <item.icon size={20} />
                {shouldExpand && <span className="text-sm font-medium">{item.label}</span>}
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