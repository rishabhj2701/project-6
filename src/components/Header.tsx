import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Search, User } from 'lucide-react';
import { ProjectData } from '../types';

interface HeaderProps {
  project: ProjectData;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ project, toggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search
    console.log('Searching for:', searchQuery);
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.notification-container') && !target.closest('.notification-button')) {
      setShowNotifications(false);
    }
    if (!target.closest('.user-menu-container') && !target.closest('.user-menu-button')) {
      setShowUserMenu(false);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-1 rounded hover:bg-gray-700"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">{project.title} ({project.id})</h1>
      </div>

      <div className="flex items-center space-x-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
            <Search size={18} />
          </button>
        </form>

        <div className="relative notification-container">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-700 relative notification-button"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div 
              className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-lg shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-bold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <p className="font-semibold">New task assigned</p>
                  <p className="text-sm text-gray-600">Check the smell in zone 1</p>
                  <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                </div>
                <div className="p-3 border-b border-gray-100 hover:bg-gray-50">
                  <p className="font-semibold">Status update</p>
                  <p className="text-sm text-gray-600">Permit to work approved</p>
                  <p className="text-xs text-gray-500 mt-1">20 minutes ago</p>
                </div>
                <div className="p-3 hover:bg-gray-50">
                  <p className="font-semibold">Team member added</p>
                  <p className="text-sm text-gray-600">Jin Benito joined the project</p>
                  <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="p-2 text-center border-t border-gray-200">
                <button 
                  className="text-blue-600 text-sm hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative user-menu-container">
          <button 
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 user-menu-button"
          >
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <User size={20} className="text-gray-700" />
            </div>
            <span>Richard T.</span>
            <ChevronDown size={16} />
          </button>
          
          {showUserMenu && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <button onClick={() => console.log('Profile clicked')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
                <button onClick={() => console.log('Settings clicked')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
                <button onClick={() => console.log('Help clicked')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Help</button>
                <div className="border-t border-gray-200 my-1"></div>
                <button onClick={() => console.log('Sign out clicked')} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;