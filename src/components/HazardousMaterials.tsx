import React, { useState } from 'react';
import { HazardousMaterial } from '../types';
import { AlertTriangle, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface HazardousMaterialsProps {
  materials: HazardousMaterial[];
}

const HazardousMaterials: React.FC<HazardousMaterialsProps> = ({ materials }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedMaterial(expandedMaterial === id ? null : id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <AlertTriangle size={20} className="text-amber-500 mr-2" />
          <h2 className="text-xl font-semibold">Hazardous Materials</h2>
        </div>
        
        <div>
          {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="divide-y divide-gray-200">
          {materials.map(material => (
            <div key={material.id} className="p-4 hover:bg-gray-50">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(material.id)}
              >
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    material.level >= 4 ? 'bg-red-500' :
                    material.level === 3 ? 'bg-orange-500' :
                    material.level === 2 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <span className="font-medium">{material.name}</span>
                </div>
                
                <div className="flex items-center">
                  <span className={`px-2 py-0.5 rounded-full text-xs mr-3 ${
                    material.level >= 4 ? 'bg-red-100 text-red-800' :
                    material.level === 3 ? 'bg-orange-100 text-orange-800' :
                    material.level === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    Level {material.level}
                  </span>
                  {expandedMaterial === material.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              
              {expandedMaterial === material.id && (
                <div className="mt-3 pl-5 text-sm text-gray-600">
                  <div className="bg-gray-50 p-3 rounded-lg flex items-start">
                    <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="mb-2">
                        <strong>Handling Instructions:</strong> Use appropriate PPE including respirators, chemical-resistant gloves, and eye protection.
                      </p>
                      <p className="mb-2">
                        <strong>Storage Requirements:</strong> Store in cool, dry area away from incompatible materials and ignition sources.
                      </p>
                      <p>
                        <strong>Emergency Procedures:</strong> In case of spill, evacuate area, contain spill, and contact hazmat team immediately.
                      </p>
                      <div className="mt-3 flex space-x-3">
                        <button className="text-sm text-blue-600 hover:underline">View Safety Data Sheet</button>
                        <button className="text-sm text-blue-600 hover:underline">Report Issue</button>
                      </div>
                    </div>
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

export default HazardousMaterials;