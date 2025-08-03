import React from 'react';
import { Menu, Maximize2, Minimize2 } from 'lucide-react';

const Header = ({ 
  setSidebarOpen, 
  viewMode, 
  toggleViewMode,
  title = "🌌 Space Learning Universe",
  subtitle = "Explore courses as planets in space"
}) => {
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-black/50 backdrop-blur-lg rounded-lg p-3 border border-white/20"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleViewMode}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              {viewMode === 'grid' ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              <span className="text-sm">{viewMode === 'grid' ? 'Focus Mode' : 'Grid View'}</span>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium">John Explorer</div>
                <div className="text-xs text-gray-400">Level 7 Student</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">JE</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;