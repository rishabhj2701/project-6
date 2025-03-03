export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed' | 'assigned';
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
  dueDate: string;
  category: string;
  location?: string;
  zone?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface EventLog {
  id: string;
  type: string;
  timestamp: string;
  description: string;
  user: string;
}

export interface HazardousMaterial {
  id: string;
  name: string;
  level: number;
}

export interface Procedure {
  id: string;
  title: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  timestamp: string;
  source: string;
  content: string;
}

export interface Visual {
  id: string;
  type: 'image' | 'video';
  title: string;
  url: string;
  timestamp: string;
  uploadedBy: string;
}

export interface ProjectData {
  id: string;
  title: string;
  startTime: string;
  status: string;
  tasks: Task[];
  team: TeamMember[];
  eventLogs: EventLog[];
  hazardousMaterials: HazardousMaterial[];
  procedures: Procedure[];
  newsItems: NewsItem[];
  visuals: Visual[];
}