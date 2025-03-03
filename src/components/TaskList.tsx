import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { 
  Check, 
  ChevronDown, 
  Clock, 
  Edit, 
  Filter, 
  MoreVertical, 
  Plus, 
  Search, 
  Trash2 
} from 'lucide-react';
import TaskModal from './TaskModal';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskAdd: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskDelete,
  onTaskAdd
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const categories = Array.from(new Set(tasks.map(task => task.category)));
  
  const filteredTasks = taskList.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || task.category === filterCategory;
    const matchesPriority = !filterPriority || task.priority === filterPriority;
    
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (currentTask) {
      onTaskUpdate(task);
    } else {
      onTaskAdd(task);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTask = (taskId: string) => {
    onTaskDelete(taskId);
    setShowDeleteConfirm(null);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(taskList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setTaskList(items);
  };

  const toggleTaskStatus = (task: Task) => {
    const newStatus = task.status === 'completed' ? 'in-progress' : 'completed';
    onTaskUpdate({ ...task, status: newStatus });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the filter function
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.filter-dropdown') && !target.closest('.filter-button')) {
      setShowFilters(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" onClick={handleClickOutside}>
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-semibold">Tasks</h2>
        
        <div className="flex items-center space-x-2">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </form>
          
          <div className="relative filter-dropdown">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center bg-white filter-button"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} className="mr-2" />
              <span>Filter</span>
              <ChevronDown size={16} className="ml-2" />
            </button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold">Filter by</h3>
                </div>
                <div className="p-3">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={filterCategory || ''}
                      onChange={(e) => setFilterCategory(e.target.value || null)}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <select 
                      className="w-full border border-gray-300 rounded-md p-2"
                      value={filterPriority || ''}
                      onChange={(e) => setFilterPriority(e.target.value || null)}
                    >
                      <option value="">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button 
                      onClick={() => {
                        setFilterCategory(null);
                        setFilterPriority(null);
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleAddTask}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <div 
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="divide-y divide-gray-200"
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            <button 
                              onClick={() => toggleTaskStatus(task)}
                              className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                task.status === 'completed' 
                                  ? 'bg-green-500 border-green-500 text-white' 
                                  : 'border-gray-400'
                              }`}
                            >
                              {task.status === 'completed' && <Check size={12} />}
                            </button>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                            
                            <div className="flex items-center mt-2 text-sm">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                task.priority === 'high' 
                                  ? 'bg-red-100 text-red-800' 
                                  : task.priority === 'medium'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                              }`}>
                                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                              </span>
                              
                              {task.assignedTo && (
                                <span className="ml-3 text-gray-600">
                                  Assigned to: {task.assignedTo}
                                </span>
                              )}
                              
                              <span className="ml-3 flex items-center text-gray-600">
                                <Clock size={14} className="mr-1" />
                                {task.dueDate}
                              </span>
                              
                              {task.zone && (
                                <span className="ml-3 text-gray-600">
                                  Zone: {task.zone}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="relative">
                            <button 
                              onClick={() => setShowDeleteConfirm(showDeleteConfirm === task.id ? null : task.id)}
                              className="p-1 rounded-full hover:bg-gray-200"
                            >
                              <MoreVertical size={16} />
                            </button>
                            
                            {showDeleteConfirm === task.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg z-10">
                                <button 
                                  onClick={() => handleEditTask(task)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                                >
                                  <Edit size={14} className="mr-2" />
                                  <span>Edit</span>
                                </button>
                                <button 
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
                                >
                                  <Trash2 size={14} className="mr-2" />
                                  <span>Delete</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No tasks found. Try adjusting your filters or add a new task.
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {isModalOpen && (
        <TaskModal
          task={currentTask}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          categories={categories}
        />
      )}
    </div>
  );
};

export default TaskList;