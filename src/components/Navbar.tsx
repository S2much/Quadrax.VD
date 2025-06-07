import { DivideIcon as LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';

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
}

function Navbar({ navItems, bottomNavItems, currentPage, setCurrentPage, isCollapsed, setIsCollapsed }: NavbarProps) {
  return (
    <nav className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black flex flex-col transition-all duration-300 z-40 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-[#00699a] p-1 rounded transition-colors duration-300"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="list-none m-0 p-0 flex flex-col flex-1">
        {navItems.map((item) => (
          <li 
            key={item.id}
            className={`hover:bg-[#00699a] transition-colors duration-300 ${
              currentPage === item.id ? 'bg-[#00699a]' : ''
            }`}
          >
            <button
              onClick={() => setCurrentPage(item.id)}
              className={`w-full p-3 flex items-center text-white ${isCollapsed ? 'justify-center' : 'gap-3'}`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={20} />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
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
                className={`w-full p-3 flex items-center text-white ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
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