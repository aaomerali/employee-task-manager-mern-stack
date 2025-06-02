import { useState } from 'react';
import Sidebar from '../../components/Sidebar'
import { Pencil, Trash2 } from 'lucide-react';

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'employee', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active' },
  { id: 3, name: 'Ali Yılmaz', email: 'ali@example.com', role: 'employee', status: 'inactive' },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(dummyUsers);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleToggleRole = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role: user.role === 'admin' ? 'employee' : 'admin' }
          : user
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col sm:flex-row p-4 gap-4">
      <Sidebar />

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Users</h2>

        <table className="min-w-full text-left border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-purple-50 border-b">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button
                    onClick={() => handleToggleRole(user.id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Toggle Role"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
