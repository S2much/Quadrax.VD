import { LucideIcon, ChevronLeft, ChevronRight } from 'lucide-react';

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
    <nav className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black flex flex-col transition-all duration-300 z-40 ${isCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="flex justify-end p-1">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-[#00beef] text-left hover:bg-[#00beef] hover:text-black [font-weight:900] text-lg transition-colors duration-100"
        >
          {isCollapsed ? <ChevronRight size={30} /> : <ChevronLeft size={30} />}
        </button>
      </div>

      <ul className="list-none m-0 p-0 font-bold flex flex-col flex-1">
        {navItems.map((item) => (
          <li 
            key={item.id}
            className={`hover:bg-[#00699a] transition-colors duration-10 ${
              currentPage === item.id ? 'bg-[#00699a]' : ''
            }`}
          >
            <button
              onClick={() => setCurrentPage(item.id)}
              className={`w-full p-1 flex items-center [justify-content:space-between] text-white ${isCollapsed ? 'justify-center' : 'gap-3'}`}
              title={isCollapsed ? item.label : ''}
            >
              <item.icon size={30} />
              {!isCollapsed && <span className="text-sm [font-size:1.2rem]">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <ul className="list-none m-0 p-0 flex flex-col">
          {bottomNavItems.map((item) => (
            <li 
              key={item.id}
              className="hover:bg-[#00699a] transition-colors duration-10"
            >
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full p-1 flex items-center text-right text-white ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={30} />
                {!isCollapsed && <span className="text-sm [font-size:1.2rem]">{item.label}</span>}
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