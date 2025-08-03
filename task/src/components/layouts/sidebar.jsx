import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  X,
  Menu
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onToggle }) => {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'Courses', icon: BookOpen },
    { name: 'Students', icon: Users },
    { name: 'Analytics', icon: BarChart3 },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-black
        text-white transform transition-transform duration-300 ease-in-out z-40
        w-64
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full lg:hidden z-50"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`
                    w-full flex items-center space-x-3 
                    px-4 py-3 rounded-lg
                    transition-all duration-200 text-left 
                    ${activeItem === item.name
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                    }
                  `}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">User Name</p>
              <p className="text-xs text-gray-400 truncate">user@email.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;