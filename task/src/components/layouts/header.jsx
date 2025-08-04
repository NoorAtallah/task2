import React, { useRef, useEffect, useState } from 'react';
import { 
  Bell, 
  ChevronDown, 
  Search, 
  Menu,
  Sparkles
} from 'lucide-react';

// Space-themed Header Component
const Header = ({ userName = 'John', onMenuToggle, showMenuButton = false }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stars, setStars] = useState([]);

  // Generate random stars for background
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 25; i++) {
        starArray.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          delay: Math.random() * 3,
          size: Math.random() * 1.5 + 0.5
        });
      }
      setStars(starArray);
    };
    generateStars();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowProfile(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New course available', message: 'Advanced React Patterns is now live', time: '5m ago', unread: true },
    { id: 2, title: 'Assignment due', message: 'Mathematics homework due tomorrow', time: '1h ago', unread: true },
    { id: 3, title: 'Course completed', message: 'Congratulations on completing Physics 101', time: '2h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <header className="h-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-white/20 flex items-center justify-between px-4 lg:px-6 relative overflow-hidden z-50">
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
              opacity: 0.3
            }}
          />
        ))}
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 via-transparent to-slate-800/20 pointer-events-none" />
      
      {/* Left side */}
      <div className="flex items-center space-x-4 relative z-10 flex-1 min-w-0">
        {showMenuButton && (
          <button 
            onClick={onMenuToggle}
            className="p-2 text-gray-400 hover:text-white hover:bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 lg:hidden"
          >
            <Menu size={20} />
          </button>
        )}
        
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between lg:justify-start lg:space-x-8">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-lg lg:text-2xl font-bold text-white truncate">
                  <span className="hidden sm:inline">{getGreeting()}, </span>
                  <span className="sm:hidden">Hi </span>
                  {userName}!
                </h1>
                <Sparkles size={16} className="text-gray-400 animate-pulse" />
              </div>
              <p className="text-gray-400 text-sm hidden sm:block">
                Ready to explore the cosmos of knowledge?
              </p>
            </div>
            
            <div className="hidden lg:flex items-center text-gray-400 text-sm bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
              <span>{formatTime(currentTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center - Search */}
      <div className="hidden md:flex items-center mx-8 relative z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search courses, students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-black/60 transition-all duration-300"
          />
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center space-x-3 relative z-10">
        <button className="p-2 text-gray-400 hover:text-white hover:bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300 md:hidden">
          <Search size={18} />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2 text-gray-400 hover:text-white hover:bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center animate-pulse">
                <span className="text-black text-xs font-bold">{unreadCount}</span>
              </div>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-[60] max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-white font-semibold">Notifications</h3>
                <p className="text-gray-400 text-sm">{unreadCount} unread</p>
              </div>
              <div className="py-2">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 hover:bg-black/30 cursor-pointer border-l-2 transition-all duration-200 ${
                      notification.unread ? 'border-white bg-black/20' : 'border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{notification.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                      </div>
                      <span className="text-gray-500 text-xs ml-2 flex-shrink-0">{notification.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-white/10">
                <button className="w-full text-white hover:text-gray-300 text-sm font-medium hover:bg-black/30 py-2 rounded-lg transition-all duration-200">
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile */}
        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center space-x-3 p-2 text-gray-400 hover:text-white hover:bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg transition-all duration-300"
          >
            <div className="w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm font-medium hidden sm:block truncate max-w-24 lg:max-w-none">
              {userName}
            </span>
            <ChevronDown size={14} className="hidden sm:block" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-[60]">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{userName}</p>
                    <p className="text-gray-400 text-sm truncate">Space Cadet</p>
                  </div>
                </div>
              </div>
              <div className="py-2">
                {['Profile Settings', 'My Courses', 'Progress', 'Help & Support', 'Sign Out'].map((item) => (
                  <button 
                    key={item}
                    className="w-full px-4 py-2 text-left text-gray-400 hover:text-white hover:bg-black/30 transition-all duration-200 text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;