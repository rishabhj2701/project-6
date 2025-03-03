import React, { useState } from 'react';
import { Procedure } from '../types';
import { ChevronDown, ChevronUp, FileText, Download, Printer, ExternalLink } from 'lucide-react';

interface ProceduresProps {
  procedures: Procedure[];
}

const Procedures: React.FC<ProceduresProps> = ({ procedures }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedProcedure, setExpandedProcedure] = useState<string | null>(null);
  
  const toggleExpand = (id: string) => {
    setExpandedProcedure(expandedProcedure === id ? null : id);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FileText className="w-5 h-5 text-blue-500 mr-2" />
          <h2 className="text-xl font-semibold">Procedures</h2>
        </div>
      </div>

      <div className="space-y-4">
        {procedures.map(procedure => (
          <div 
            key={procedure.id} 
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <h3 className="font-medium mb-2">{procedure.title}</h3>
            <p className="text-sm text-gray-600">{procedure.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Procedures;