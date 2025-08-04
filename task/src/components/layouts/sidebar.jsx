import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  X,
  Menu,
  Sparkles,
  Rocket
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose, onToggle }) => {
  const [activeItem, setActiveItem] = useState('Home');
  const [stars, setStars] = useState([]);

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 50; i++) {
        starArray.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          size: Math.random() * 2 + 1
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  const menuItems = [
    { name: 'Home', icon: Home, glow: 'hover:shadow-blue-500/50' },
    { name: 'Courses', icon: BookOpen, glow: 'hover:shadow-purple-500/50' },
    { name: 'Students', icon: Users, glow: 'hover:shadow-green-500/50' },
    { name: 'Analytics', icon: BarChart3, glow: 'hover:shadow-yellow-500/50' },
    { name: 'Settings', icon: Settings, glow: 'hover:shadow-red-500/50' },
  ];

  return (
    <>
      {/* Mobile overlay with stars */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        >
          <div className="absolute inset-0 overflow-hidden">
            {stars.slice(0, 20).map((star) => (
              <div
                key={star.id}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  animationDelay: `${star.delay}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full 
        bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
        text-white transform transition-all duration-500 ease-in-out z-40
        w-72 border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        backdrop-blur-xl
      `}>
        
        {/* Animated background stars */}
        <div className="absolute inset-0 overflow-hidden">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`,
                opacity: 0.4
              }}
            />
          ))}
        </div>

        {/* Subtle overlay matching planet component */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/30 via-slate-700/10 to-transparent pointer-events-none" />
        
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm border border-white/20 hover:bg-black/70 rounded-full lg:hidden z-50 transition-all duration-300 hover:scale-110"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center">
                <Rocket size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Space Academy
                </h2>
                <div className="flex items-center gap-1">
                  <Sparkles size={12} className="text-gray-400" />
                  <span className="text-xs text-gray-400">Mission Control</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-3 flex-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveItem(item.name)}
                  className={`
                    w-full flex items-center space-x-4 
                    px-4 py-3 rounded-xl
                    transition-all duration-300 text-left group
                    border backdrop-blur-sm
                    ${isActive
                      ? 'bg-black/50 border-white/20 text-white scale-105'
                      : 'bg-black/20 border-white/10 text-gray-400 hover:bg-black/40 hover:border-white/20 hover:text-white hover:scale-105'
                    }
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div className={`
                    p-2 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-white/10' 
                      : 'bg-white/5 group-hover:bg-white/10'
                    }
                  `}>
                    <Icon size={18} className="flex-shrink-0" />
                  </div>
                  <span className="font-medium flex-1">{item.name}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className={`
                    absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    bg-gradient-to-r from-transparent via-white/5 to-transparent
                    pointer-events-none
                  `} />
                </button>
              );
            })}
          </nav>

          {/* Status indicator */}
          <div className="mb-6 p-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-white">System Online</p>
                <p className="text-xs text-gray-400">All systems operational</p>
              </div>
            </div>
          </div>

          {/* User section */}
          <div className="p-4 bg-black/50 backdrop-blur-sm border border-white/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">C</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-slate-900 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Commander</p>
                <p className="text-xs text-gray-400 truncate">Space Cadet</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-400 font-medium">Level 42</div>
                <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-8 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle border glow */}
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </aside>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Sidebar;