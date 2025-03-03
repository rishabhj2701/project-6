import React, { useState } from 'react';
import { Visual } from '../types';
import { ChevronDown, ChevronUp, Image, Download, ExternalLink } from 'lucide-react';

interface VisualsProps {
  visuals: Visual[];
}

const Visuals: React.FC<VisualsProps> = ({ visuals }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedVisual, setSelectedVisual] = useState<Visual | null>(null);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <Image size={20} className="text-purple-500 mr-2" />
          <h2 className="text-xl font-semibold">Visuals ({visuals.length})</h2>
        </div>
        
        <div>
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visuals.map(visual => (
              <div 
                key={visual.id} 
                className="cursor-pointer group relative"
                onClick={() => setSelectedVisual(visual)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={visual.url} 
                    alt={visual.title} 
                    className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                  />
                </div>
                <div className="mt-2">
                  <h3 className="text-sm font-medium truncate">{visual.title}</h3>
                  <p className="text-xs text-gray-500">{visual.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {selectedVisual && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">{selectedVisual.title}</h3>
              <button 
                onClick={() => setSelectedVisual(null)}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <ChevronDown size={20} />
              </button>
            </div>
            
            <div className="p-4 overflow-auto">
              <div className="flex justify-center">
                <img 
                  src={selectedVisual.url} 
                  alt={selectedVisual.title} 
                  className="max-h-[60vh] object-contain"
                />
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">Uploaded by: {selectedVisual.uploadedBy}</p>
                <p className="text-sm text-gray-600">Date: {selectedVisual.timestamp}</p>
                
                <div className="mt-4 flex space-x-4">
                  <button 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => console.log(`Downloading ${selectedVisual.title}`)}
                  >
                    <Download size={16} className="mr-2" />
                    <span>Download</span>
                  </button>
                  <button 
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    onClick={() => window.open(selectedVisual.url, '_blank')}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    <span>Open in new tab</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visuals;