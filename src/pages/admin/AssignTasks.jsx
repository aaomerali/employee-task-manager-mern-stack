import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const dummyEmployees = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Ali Yılmaz', email: 'ali@example.com' },
];

const AssignTasks = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filterUserId, setFilterUserId] = useState('');

  const handleAssignTask = () => {
    if (!selectedUserId || !title || !description) return;

    const user = dummyEmployees.find(emp => emp.id.toString() === selectedUserId);

    const newTask = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      title,
      description,
      status: 'pending',
    };

    setTasks(prev => [...prev, newTask]);
    setTitle('');
    setDescription('');
    setSelectedUserId('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const filteredTasks = filterUserId
    ? tasks.filter(task => task.userId.toString() === filterUserId)
    : tasks;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col sm:flex-row p-4 gap-4">
      <Sidebar />

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Assign Tasks</h2>

        {/* Task Form */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Employee</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">-- Select --</option>
              {dummyEmployees.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Submit report"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Write task details here..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>

        <button
          onClick={handleAssignTask}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-xl transition duration-200 shadow"
        >
          Assign Task
        </button>

        {/* Filter Section */}
        <div className="mt-10 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Employee</label>
          <select
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Show All --</option>
            {dummyEmployees.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        {/* Task List */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Assigned Tasks</h3>
          {filteredTasks.length === 0 ? (
            <p className="text-gray-500">No tasks to show.</p>
          ) : (
            <ul className="space-y-4">
              {filteredTasks.map(task => (
                <li
                  key={task.id}
                  className="border border-gray-200 p-4 rounded-xl bg-gray-50 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="font-semibold text-purple-700">{task.title}</h4>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Assigned to: <strong>{task.userName}</strong> | Status: <span className="capitalize">{task.status}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignTasks;
