import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import MapView from './components/MapView';
import TeamPanel from './components/TeamPanel';
import EventLogPanel from './components/EventLog';
import Charts from './components/Charts';
import HazardousMaterials from './components/HazardousMaterials';
import Procedures from './components/Procedures';
import NewsPanel from './components/NewsPanel';
import Visuals from './components/Visuals';
import { mockProject } from './data';
import { Task, TeamMember, ProjectData } from './types';
import { format } from 'date-fns';

function App() {
  const [project, setProject] = useState<ProjectData>(mockProject);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for reports tab
  const reportData = {
    incidents: [
      { id: '1', title: 'Gas Leak Report', date: '02/24/2023', status: 'Completed' },
      { id: '2', title: 'Safety Inspection', date: '02/20/2023', status: 'Pending Review' },
      { id: '3', title: 'Environmental Impact', date: '02/15/2023', status: 'In Progress' }
    ],
    metrics: {
      responseTime: '4.2 minutes',
      resolutionRate: '87%',
      safetyScore: '92/100'
    }
  };

  // Mock data for calendar tab
  const [calendarEvents, setCalendarEvents] = useState([
    { id: '1', title: 'Safety Meeting', date: '2023-02-28', time: '09:00 AM' },
    { id: '2', title: 'Inspection', date: '2023-03-02', time: '10:30 AM' },
    { id: '3', title: 'Team Briefing', date: '2023-03-05', time: '08:00 AM' }
  ]);

  // Mock data for timeline tab
  const [timelineEvents, setTimelineEvents] = useState([
    { id: '1', title: 'Gas Leak Detected', time: '02/23/2023 12:30', description: 'Initial detection of gas leak in Zone 1' },
    { id: '2', title: 'Emergency Response Activated', time: '02/23/2023 12:35', description: 'Emergency protocols initiated' },
    { id: '3', title: 'Evacuation Completed', time: '02/23/2023 12:55', description: 'All personnel evacuated from affected areas' },
    { id: '4', title: 'Containment Measures Applied', time: '02/23/2023 13:20', description: 'Technical team deployed containment measures' }
  ]);

  // Mock data for documents tab
  const [documents, setDocuments] = useState([
    { id: '1', title: 'Emergency Response Plan', type: 'PDF', lastModified: '01/15/2023' },
    { id: '2', title: 'Safety Protocols', type: 'DOCX', lastModified: '02/10/2023' },
    { id: '3', title: 'Site Maps', type: 'PNG', lastModified: '02/05/2023' },
    { id: '4', title: 'Incident Report Template', type: 'XLSX', lastModified: '01/20/2023' }
  ]);

  // Mock data for messages tab
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Michael Pitt', content: 'Status update on the gas leak?', time: '10:30 AM', read: true },
    { id: '2', sender: 'Zo Ben Shmuel', content: 'Containment measures in place. Need additional support.', time: '10:45 AM', read: false },
    { id: '3', sender: 'Alex Reynolds', content: 'Sending updated site photos now.', time: '11:15 AM', read: false }
  ]);

  // Mock data for settings tab
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 5
  });

  const handleTaskUpdate = (updatedTask: Task) => {
    const now = new Date();
    const timestamp = format(now, 'HH:mm');
    
    setProject({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ),
      eventLogs: [
        {
          id: Date.now().toString(),
          type: 'Task Updated',
          timestamp,
          description: `Task "${updatedTask.title}" was updated`,
          user: 'Richard T.'
        },
        ...project.eventLogs
      ]
    });
  };

  const handleTaskDelete = (taskId: string) => {
    const taskToDelete = project.tasks.find(task => task.id === taskId);
    const now = new Date();
    const timestamp = format(now, 'HH:mm');
    
    setProject({
      ...project,
      tasks: project.tasks.filter(task => task.id !== taskId),
      eventLogs: [
        {
          id: Date.now().toString(),
          type: 'Task Deleted',
          timestamp,
          description: `Task "${taskToDelete?.title}" was deleted`,
          user: 'Richard T.'
        },
        ...project.eventLogs
      ]
    });
  };

  const handleTaskAdd = (newTask: Task) => {
    const now = new Date();
    const timestamp = format(now, 'HH:mm');
    
    setProject({
      ...project,
      tasks: [...project.tasks, newTask],
      eventLogs: [
        {
          id: Date.now().toString(),
          type: 'Task Added',
          timestamp,
          description: `New task "${newTask.title}" was added`,
          user: 'Richard T.'
        },
        ...project.eventLogs
      ]
    });
  };

  const handleAddTeamMember = (newMember: TeamMember) => {
    const now = new Date();
    const timestamp = format(now, 'HH:mm');
    
    setProject({
      ...project,
      team: [...project.team, newMember],
      eventLogs: [
        {
          id: Date.now().toString(),
          type: 'Team Member Added',
          timestamp,
          description: `${newMember.name} (${newMember.role}) was added to the team`,
          user: 'Richard T.'
        },
        ...project.eventLogs
      ]
    });
  };

  // Calculate data for charts
  const tasksByStatus = project.tasks.reduce((acc, task) => {
    acc[task.status] = (acc[task.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tasksByPriority = project.tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Mock data for weekly trend
  const tasksTrend = [2, 4, 3, 5, 7, 6, 8];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <Charts 
              tasksByStatus={tasksByStatus} 
              tasksByPriority={tasksByPriority}
              tasksTrend={tasksTrend}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TaskList 
                tasks={project.tasks} 
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
                onTaskAdd={handleTaskAdd}
              />
              <div className="space-y-6">
                <HazardousMaterials materials={project.hazardousMaterials} />
                <NewsPanel news={project.newsItems} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <EventLogPanel logs={project.eventLogs} />
              <Procedures procedures={project.procedures} />
            </div>
            
            <Visuals visuals={project.visuals} />
          </div>
        );
      case 'tasks':
        return (
          <TaskList 
            tasks={project.tasks} 
            onTaskUpdate={handleTaskUpdate}
            onTaskDelete={handleTaskDelete}
            onTaskAdd={handleTaskAdd}
          />
        );
      case 'team':
        return (
          <TeamPanel 
            team={project.team}
            onAddMember={handleAddTeamMember}
          />
        );
      case 'map':
        return (
          <MapView 
            center={[31.255278975180, 34.80915054343513]}
          />
        );
      case 'reports':
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Incident Reports</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.incidents.map(report => (
                      <tr key={report.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            report.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            onClick={() => console.log(`View report ${report.id}`)}
                          >
                            View
                          </button>
                          <button 
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => console.log(`Download report ${report.id}`)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Response Time</p>
                  <p className="text-2xl font-bold">{reportData.metrics.responseTime}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Issue Resolution Rate</p>
                  <p className="text-2xl font-bold">{reportData.metrics.resolutionRate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Safety Score</p>
                  <p className="text-2xl font-bold">{reportData.metrics.safetyScore}</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Calendar</h2>
            
            <div className="flex justify-between mb-6">
              <button 
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => console.log('Previous month')}
              >
                Previous
              </button>
              <h3 className="text-xl font-semibold">March 2023</h3>
              <button 
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => console.log('Next month')}
              >
                Next
              </button>
            </div>
            
            <div className="mb-8">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 2; // Start from Feb 26 (2 days before March)
                  const isCurrentMonth = day > 0 && day <= 31;
                  const hasEvent = calendarEvents.some(event => {
                    const eventDay = parseInt(event.date.split('-')[2]);
                    return eventDay === day;
                  });
                  
                  return (
                    <div 
                      key={i} 
                      className={`p-2 min-h-[80px] border rounded-lg ${
                        isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'
                      } ${hasEvent ? 'border-blue-300' : 'border-gray-200'}`}
                      onClick={() => console.log(`Clicked on day ${day}`)}
                    >
                      <div className="text-right">{isCurrentMonth ? day : day <= 0 ? 28 + day : day - 31}</div>
                      {isCurrentMonth && hasEvent && (
                        <div className="mt-1">
                          {calendarEvents
                            .filter(event => parseInt(event.date.split('-')[2]) === day)
                            .map(event => (
                              <div 
                                key={event.id} 
                                className="text-xs p-1 mb-1 bg-blue-100 text-blue-800 rounded truncate"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  console.log(`Clicked on event ${event.id}`);
                                }}
                              >
                                {event.time} - {event.title}
                              </div>
                            ))
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {calendarEvents.map(event => (
                  <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="text-sm text-gray-500">{event.date}</div>
                    </div>
                    <div className="text-sm text-gray-600">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'timeline':
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Timeline</h2>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
              
              <div className="space-y-8">
                {timelineEvents.map((event, index) => (
                  <div key={event.id} className="relative pl-12">
                    {/* Circle marker */}
                    <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      {index + 1}
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">{event.title}</h3>
                        <span className="text-sm text-gray-500">{event.time}</span>
                      </div>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Documents</h2>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
                onClick={() => console.log('Upload document')}
              >
                <Plus className="w-4 h-4 mr-2" />
                <span>Upload Document</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {documents.map(doc => (
                    <tr key={doc.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{doc.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.lastModified}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => console.log(`View document ${doc.id}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          onClick={() => console.log(`Download document ${doc.id}`)}
                        >
                          Download
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => console.log(`Delete document ${doc.id}`)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-semibold">Messages</h2>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                </div>
                
                <button 
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
                  onClick={() => console.log('New message')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span>New Message</span>
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {messages.map(message => (
                <div 
                  key={message.id} 
                  className={`p-4 hover:bg-gray-50 ${!message.read ? 'bg-blue-50' : ''}`}
                  onClick={() => console.log(`Open message ${message.id}`)}
                >
                  <div className="flex items-start">
                    <div className="mr-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {message.sender.charAt(0)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{message.sender}</h3>
                        <span className="text-sm text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{message.content}</p>
                    </div>
                    
                    {!message.read && (
                      <div className="ml-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-gray-500">Receive alerts and notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.notifications}
                        onChange={() => setSettings({...settings, notifications: !settings.notifications})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-500">Use dark theme</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.darkMode}
                        onChange={() => setSettings({...settings, darkMode: !settings.darkMode})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Refresh</p>
                      <p className="text-sm text-gray-500">Automatically refresh data</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.autoRefresh}
                        onChange={() => setSettings({...settings, autoRefresh: !settings.autoRefresh})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Data Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Refresh Interval (minutes)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.refreshInterval}
                      onChange={(e) => setSettings({...settings, refreshInterval: parseInt(e.target.value)})}
                      className="w-full max-w-xs border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={() => console.log('Settings saved')}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          project={project}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;