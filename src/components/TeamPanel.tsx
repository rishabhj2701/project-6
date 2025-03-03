import React, { useState } from 'react';
import { TeamMember } from '../types';
import { Mail, MessageSquare, MoreVertical, Phone, Plus, Search, UserPlus } from 'lucide-react';

interface TeamPanelProps {
  team: TeamMember[];
  onAddMember: (member: TeamMember) => void;
}

const TeamPanel: React.FC<TeamPanelProps> = ({ team, onAddMember }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '',
    role: '',
  });
  const [showMemberActions, setShowMemberActions] = useState<string | null>(null);
  
  const filteredTeam = team.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddMember = () => {
    if (newMember.name && newMember.role) {
      onAddMember({
        id: Date.now().toString(),
        name: newMember.name,
        role: newMember.role,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      });
      setNewMember({ name: '', role: '' });
      setShowAddMember(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter function
  };

  const toggleMemberActions = (id: string) => {
    setShowMemberActions(showMemberActions === id ? null : id);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-semibold">Team Members</h2>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </form>
          
          <button 
            onClick={() => setShowAddMember(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
          >
            <UserPlus size={16} className="mr-2" />
            <span>Add Member</span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredTeam.map(member => (
          <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start">
              <img 
                src={member.avatar} 
                alt={member.name} 
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              
              <div className="flex-1">
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                
                <div className="flex mt-3 space-x-2">
                  <button 
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => console.log(`Message ${member.name}`)}
                  >
                    <MessageSquare size={14} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => console.log(`Call ${member.name}`)}
                  >
                    <Phone size={14} />
                  </button>
                  <button 
                    className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={() => console.log(`Email ${member.name}`)}
                  >
                    <Mail size={14} />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <button 
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={() => toggleMemberActions(member.id)}
                >
                  <MoreVertical size={16} />
                </button>

                {showMemberActions === member.id && (
                  <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-10">
                    <button 
                      onClick={() => console.log(`View profile of ${member.name}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={() => console.log(`Assign task to ${member.name}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Assign Task
                    </button>
                    <button 
                      onClick={() => console.log(`Remove ${member.name}`)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showAddMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter name"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter role"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAddMember(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                disabled={!newMember.name || !newMember.role}
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPanel;