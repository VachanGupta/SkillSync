import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Navigation from '../components/Navigation';

const STATUS_OPTIONS = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'on-hold', label: 'On Hold' },
];

const getStatusLabel = (value) => {
  return STATUS_OPTIONS.find((option) => option.value === value)?.label || 'Not Started';
};

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('not-started');
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      console.log('Loading goals from:', api.defaults.baseURL + '/goals');
      const res = await api.get('/goals');
      setGoals(res.data);
    } catch (err) {
      console.error('Error loading goals:', err);
      const fullUrl = err.config?.baseURL + err.config?.url;
      console.error('Failed URL:', fullUrl);
      const errorMsg = err.response?.data?.msg || 
                      (err.response?.status === 404 ? `API endpoint not found (${fullUrl}). Is the backend server running on http://localhost:5001?` : 
                       err.request ? `Cannot connect to server (${fullUrl}). Please ensure the backend is running.` : 
                       err.message || 'Failed to load goals');
      alert(errorMsg);
    }
  };

  useEffect(() => { load(); }, []);

  const createGoal = async (e) => {
    e.preventDefault();
    try {
      await api.post('/goals', { title, description });
      setTitle('');
      setDescription('');
      setProgress(0);
      setStatus('not-started');
      load();
    } catch (err) { console.error(err); alert(err.response?.data?.msg || err.message); }
  };

  const startEdit = (g) => {
    setEditing(g);
    setTitle(g.title);
    setDescription(g.description || '');
    setProgress(g.progress || 0);
    setStatus(g.status || 'not-started');
  };

  const cancelEdit = () => {
    setEditing(null);
    setTitle('');
    setDescription('');
    setProgress(0);
    setStatus('not-started');
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      // Automatically set status based on progress
      let finalStatus = status;
      if (progress === 100) {
        finalStatus = 'completed';
      } else if (progress > 0 && progress < 100) {
        finalStatus = 'in-progress';
      } else if (progress === 0) {
        finalStatus = 'not-started';
      }
      
      await api.put(`/goals/${editing._id}`, { title, description, progress, status: finalStatus });
      cancelEdit(); load();
    } catch (err) { console.error(err); alert(err.response?.data?.msg || err.message); }
  };

  const updateProgress = async (goalId, newProgress) => {
    try {
      const goal = goals.find(g => g._id === goalId);
      if (!goal) return;
      
      // Automatically set status based on progress
      let newStatus = goal.status || 'not-started';
      if (newProgress === 100) {
        newStatus = 'completed';
      } else if (newProgress > 0 && newProgress < 100) {
        newStatus = 'in-progress';
      } else if (newProgress === 0) {
        newStatus = 'not-started';
      }
      
      await api.put(`/goals/${goalId}`, { 
        title: goal.title, 
        description: goal.description, 
        progress: newProgress,
        status: newStatus
      });
      load();
    } catch (err) { 
      console.error(err); 
      alert(err.response?.data?.msg || err.message); 
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this goal?')) return;
    try { await api.delete(`/goals/${id}`); load(); } catch (err) { console.error(err); alert(err.response?.data?.msg || err.message); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Goals</h2>
        <form onSubmit={editing ? saveEdit : createGoal} className="mb-6 bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input
              value={title}
              onChange={e=>setTitle(e.target.value)}
              placeholder="Goal Title"
              required
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
            <input
              value={description}
              onChange={e=>setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          {editing && (
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Progress: {progress}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  onChange={e=>setProgress(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={status}
                  onChange={e=>setStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                >
                  {STATUS_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
            >
              {editing ? 'Save Changes' : 'Create Goal'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
              <p className="text-lg">No goals yet. Create your first learning goal above!</p>
            </div>
          ) : (
            goals.map(g => (
              <div key={g._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{g.title}</h3>
                    {g.description && (
                      <p className="text-gray-600 mb-3">{g.description}</p>
                    )}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress: {g.progress || 0}%</span>
                        <span className="text-sm text-gray-500">Status: <span className="font-semibold">{getStatusLabel(g.status)}</span></span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${g.progress || 0}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={g.progress || 0}
                          onChange={e => updateProgress(g._id, parseInt(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-xs text-gray-500 w-12 text-right">{g.progress || 0}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <button
                      onClick={()=>startEdit(g)}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={()=>del(g._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
