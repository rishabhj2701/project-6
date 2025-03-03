import { ProjectData } from './types';
import { format } from 'date-fns';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date: Date) => format(date, 'MM/dd/yyyy');
const formatDateTime = (date: Date) => format(date, 'MM/dd/yyyy HH:mm');

export const mockProject: ProjectData = {
  id: 'GAS-2023-001',
  title: 'Gas Leak Response', startTime: formatDateTime(yesterday),
  status: 'active',
  tasks: [
    {
      id: '1',
      title: 'Permit to work - hot work',
      description: 'Issue permit for hot work in zone 1',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Michael Pitt',
      dueDate: formatDateTime(yesterday),
      category: 'permits'
    },
    {
      id: '2',
      title: 'Location check-in',
      description: 'Verify safety conditions at location',
      status: 'completed',
      priority: 'medium',
      assignedTo: 'Zo Ben Shmuel',
      dueDate: formatDateTime(yesterday),
      category: 'safety',
      zone: '1'
    },
    {
      id: '3',
      title: 'Stop hot work in zone 1',
      description: 'Immediately halt all hot work activities',
      status: 'assigned',
      priority: 'high',
      assignedTo: 'Zo Ben Shmuel',
      dueDate: formatDateTime(yesterday),
      category: 'safety',
      zone: '1'
    },
    {
      id: '4',
      title: 'Check the smell in zone 1',
      description: 'Investigate reported gas odor',
      status: 'assigned',
      priority: 'high',
      assignedTo: 'Zo Ben Shmuel',
      dueDate: formatDateTime(yesterday),
      category: 'investigation',
      zone: '1'
    },
    {
      id: '5',
      title: 'Evacuate personnel',
      description: 'Clear all non-essential personnel from affected areas',
      status: 'open',
      priority: 'high',
      assignedTo: '',
      dueDate: formatDateTime(today),
      category: 'safety'
    },
    {
      id: '6',
      title: 'Set up perimeter',
      description: 'Establish safety perimeter around affected zone',
      status: 'open',
      priority: 'medium',
      assignedTo: '',
      dueDate: formatDateTime(today),
      category: 'safety'
    },
    {
      id: '7',
      title: 'Monitor air quality',
      description: 'Continuous monitoring of gas levels in affected areas',
      status: 'in-progress',
      priority: 'high',
      assignedTo: 'Alex Reynolds',
      dueDate: formatDateTime(today),
      category: 'monitoring',
      zone: '1'
    },
    {
      id: '8',
      title: 'Notify local authorities',
      description: 'Contact emergency services and local government',
      status: 'completed',
      priority: 'high',
      assignedTo: 'Michael Pitt',
      dueDate: formatDateTime(yesterday),
      category: 'communication'
    },
    {
      id: '9',
      title: 'Prepare incident report',
      description: 'Document all actions and findings for official report',
      status: 'open',
      priority: 'medium',
      assignedTo: '',
      dueDate: formatDateTime(new Date(today.setDate(today.getDate() + 1))),
      category: 'documentation'
    }
  ],
  team: [
    {
      id: '1',
      name: 'Michael Pitt',
      role: 'Event Manager',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Zo Ben Shmuel',
      role: 'Safety Officer',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
    },
    {
      id: '3',
      name: 'Alex Reynolds',
      role: 'Field Technician',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '4',
      name: 'Jin Benito',
      role: 'Emergency Response',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    },
    {
      id: '5',
      name: 'Sarah Chen',
      role: 'Environmental Specialist',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg'
    },
    {
      id: '6',
      name: 'David Kowalski',
      role: 'Maintenance Supervisor',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ],
  eventLogs: [
    {
      id: '1',
      type: 'Event Modified',
      timestamp: '15:57',
      description: 'Event Level: NLG Red responders Changed To NLG escalation',
      user: 'Safety Manager'
    },
    {
      id: '2',
      type: 'Management Team Added',
      timestamp: '15:57',
      description: 'NLG escalation team - DOMRC',
      user: 'Safety Manager'
    },
    {
      id: '3',
      type: 'Event Modified',
      timestamp: '12:56',
      description: 'Status updated to critical',
      user: 'Safety Manager'
    },
    {
      id: '4',
      type: 'User location shared',
      timestamp: '12:55',
      description: 'POINT (34.80915054343513 31.255278975180)',
      user: 'Field Team'
    },
    {
      id: '5',
      type: 'Manager Status Added',
      timestamp: '12:55',
      description: 'Status set to SAS',
      user: 'Safety Manager'
    },
    {
      id: '6',
      type: 'Task Completed',
      timestamp: '14:30',
      description: 'Permit to work - hot work has been completed',
      user: 'Michael Pitt'
    },
    {
      id: '7',
      type: 'Task Assigned',
      timestamp: '14:15',
      description: 'Monitor air quality assigned to Alex Reynolds',
      user: 'Michael Pitt'
    },
    {
      id: '8',
      type: 'Emergency Response',
      timestamp: '13:45',
      description: 'First responders arrived on site',
      user: 'Jin Benito'
    }
  ],
  hazardousMaterials: [
    {
      id: '1',
      name: 'Ammonium Nitrate',
      level: 3
    },
    {
      id: '2',
      name: 'Ammonium Anhydrous',
      level: 4
    },
    {
      id: '3',
      name: 'Methane',
      level: 3
    },
    {
      id: '4',
      name: 'Hydrogen Sulfide',
      level: 4
    },
    {
      id: '5',
      name: 'Propane',
      level: 2
    }
  ],
  procedures: [
    {
      id: '1',
      title: 'SOP Emergency Event',
      description: 'Standard operating procedure for emergency events'
    },
    {
      id: '2',
      title: 'Oil Leakage Protocol',
      description: 'Protocol for handling oil leaks and spills'
    },
    {
      id: '3',
      title: 'Transport of Hazardous Materials',
      description: 'Guidelines for safe transport of hazardous materials'
    },
    {
      id: '4',
      title: 'Gas Leak Response Protocol',
      description: 'Detailed procedures for responding to gas leaks including detection, containment, and evacuation'
    },
    {
      id: '5',
      title: 'Emergency Evacuation Plan',
      description: 'Step-by-step instructions for facility evacuation during emergencies'
    }
  ],
  newsItems: [
    {
      id: '1',
      title: 'Gas leak reported at facility',
      timestamp: formatDateTime(yesterday),
      source: 'Internal Alert',
      content: 'A gas leak has been reported at the north facility. Emergency teams dispatched.'
    },
    {
      id: '2',
      title: 'BBC coverage of incident',
      timestamp: formatDateTime(yesterday),
      source: 'BBC',
      content: 'Local news covering the industrial incident. No casualties reported.'
    },
    {
      id: '3',
      title: 'Evacuation complete',
      timestamp: formatDateTime(new Date(yesterday.getTime() + 30 * 60000)),
      source: 'Internal Update',
      content: 'All personnel have been successfully evacuated from the affected areas. Headcount complete with no missing persons.'
    },
    {
      id: '4',
      title: 'Environmental impact assessment',
      timestamp: formatDateTime(today),
      source: 'Environmental Team',
      content: 'Preliminary assessment shows minimal environmental impact. Air quality monitoring continues in surrounding areas.'
    }
  ],
  visuals: [
    {
      id: '1',
      type: 'image',
      title: 'Gas Leak',
      url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      timestamp: '02/24/2023 14:02',
      uploadedBy: 'Alex Reynolds'
    },
    {
      id: '2',
      type: 'image',
      title: 'Fire Sprayed',
      url: 'https://images.unsplash.com/photo-1599202875854-23e12bf4b0a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      timestamp: '02/24/2023 14:04',
      uploadedBy: 'Jin Benito'
    },
    {
      id: '3',
      type: 'image',
      title: 'Gas Leak Detected',
      url: 'https://images.unsplash.com/photo-1635048424329-5b66c3fb8c9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      timestamp: '02/23/2023 16:03',
      uploadedBy: 'Alex Reynolds'
    },
    {
      id: '4',
      type: 'image',
      title: 'Factory',
      url: 'https://images.unsplash.com/photo-1565715101841-4e7ce0a8489b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      timestamp: '04/20/2023 11:37',
      uploadedBy: 'Michael Pitt'
    },
    {
      id: '5',
      type: 'image',
      title: 'Evacuation Zone',
      url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      timestamp: '02/23/2023 13:15',
      uploadedBy: 'Zo Ben Shmuel'
    },
    {
      id: '6',
      type: 'image',
      title: 'Emergency Response Team',
      url: 'https://images.unsplash.com/photo-1582139329546-2a1d1bf5e16f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
      timestamp: '02/23/2023 14:22',
      uploadedBy: 'Jin Benito'
    }
  ]
};