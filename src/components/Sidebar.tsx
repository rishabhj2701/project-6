import React, { useState } from 'react';
import { 
  BarChart2, 
  Calendar, 
  CheckSquare, 
  Clock, 
  FileText, 
  Home, 
  Map, 
  MessageSquare, 
  Settings, 
  Users 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const [expanded, setExpanded] = useState<string | null>('projects');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'map', label: 'Map', icon: <Map size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart2 size={20} /> },
    { id: 'calendar', label: 'Calendar', icon: <Calendar size={20} /> },
    { id: 'timeline', label: 'Timeline', icon: <Clock size={20} /> },
    { id: 'documents', label: 'Documents', icon: <FileText size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const projectCategories = [
    { id: 'emergency', label: 'Emergency' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'construction', label: 'Construction' },
    { id: 'inspection', label: 'Inspection' }
  ];

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-center">
        {isOpen ? (
          <h2 className="text-xl font-bold">Project Hub</h2>
        ) : (
          <span className="text-xl font-bold">PH</span>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-1">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id ? 'bg-blue-700' : 'hover:bg-gray-800'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {isOpen && (
          <div className="mt-6 px-4">
            <div className="mb-2">
              <button 
                onClick={() => toggleExpand('projects')}
                className="flex items-center justify-between w-full text-gray-400 hover:text-white"
              >
                <span className="font-semibold">PROJECT CATEGORIES</span>
                <span>{expanded === 'projects' ? '−' : '+'}</span>
              </button>
              
              {expanded === 'projects' && (
                <ul className="mt-2 ml-2">
                  {projectCategories.map((category) => (
                    <li key={category.id} className="mt-1">
                      <button 
                        className="text-gray-400 hover:text-white flex items-center py-1"
                        onClick={() => setActiveTab('dashboard')}
                      >
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        <span>{category.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-700">
        {isOpen ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="ml-3">
              <p className="font-medium">Richard T.</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            R
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;