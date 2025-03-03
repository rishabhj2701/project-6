import React, { useState } from 'react';
import { EventLog } from '../types';
import { Clock, Filter, Search } from 'lucide-react';

interface EventLogPanelProps {
  logs: EventLog[];
}

const EventLogPanel: React.FC<EventLogPanelProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const logTypes = Array.from(new Set(logs.map(log => log.type)));
  
  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || log.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter function
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2 className="text-xl font-semibold">Event Log ({logs.length})</h2>
        
        <div className="flex items-center space-x-2">
          {!isCollapsed && (
            <>
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search logs..."
                  value={searchTerm}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </form>
              
              <select
                value={filterType || ''}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setFilterType(e.target.value || null)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {logTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </>
          )}
          
          <span className="text-blue-600">
            {isCollapsed ? 'Expand' : 'Collapse'}
          </span>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {filteredLogs.map(log => (
            <div key={log.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="mr-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Clock size={16} />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{log.type}</h3>
                    <span className="text-sm text-gray-500">{log.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{log.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Created by: {log.user}</p>
                </div>
              </div>
            </div>
          ))}
          
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No logs found. Try adjusting your filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EventLogPanel;