'use client';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-all duration-200 hover:border-gray-300">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 flex-1">{task.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-700 mb-3 line-clamp-2 leading-relaxed">{task.description}</p>
      )}

      <div className="flex gap-2 mb-3">
        <span className={`px-2 py-1 text-xs font-medium rounded ${statusColors[task.status]}`}>
          {task.status}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <p className="text-xs text-gray-600 font-medium">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

