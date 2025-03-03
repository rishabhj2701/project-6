import React, { useState } from 'react';
import { NewsItem } from '../types';
import { ChevronDown, ChevronUp, Newspaper, ExternalLink } from 'lucide-react';

interface NewsPanelProps {
  news: NewsItem[];
}

const NewsPanel: React.FC<NewsPanelProps> = ({ news }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedNews, setExpandedNews] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedNews(expandedNews === id ? null : id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <Newspaper size={20} className="text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">News Feed ({news.length})</h2>
        </div>
        
        <div>
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="divide-y divide-gray-200">
          {news.map(item => (
            <div key={item.id} className="p-4 hover:bg-gray-50">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(item.id)}
              >
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="mr-2">{item.source}</span>
                    <span>•</span>
                    <span className="ml-2">{item.timestamp}</span>
                  </div>
                </div>
                
                <div>
                  {expandedNews === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              
              {expandedNews === item.id && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>{item.content}</p>
                  <div className="mt-3 flex">
                    <button className="flex items-center text-blue-600 hover:underline">
                      <ExternalLink size={14} className="mr-1" />
                      <span>Read full article</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPanel;