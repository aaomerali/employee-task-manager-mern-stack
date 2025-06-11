import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { Pencil, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'employee', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'active' },
  { id: 3, name: 'Ali Yılmaz', email: 'ali@example.com', role: 'employee', status: 'inactive' },
  { id: 4, name: 'Sara Nasser', email: 'sara@example.com', role: 'employee', status: 'pending' },
];

const ManageUsers = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'active' } : user
      )
    );
  };

  const handleReject = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'inactive' } : user
      )
    );
  };

  const handleActivate = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: 'active' } : user
      )
    );
  };

  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex flex-col sm:flex-row p-4 gap-4">
      <Sidebar />

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-2xl overflow-x-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>

          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm w-full sm:w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-purple-50 border-b">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 capitalize">
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : user.status === 'inactive'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  {user.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(user.id)}
                        className="p-1 rounded-full bg-green-100 hover:bg-green-200"
                        title="Approve"
                      >
                        <CheckCircle size={20} className="text-green-600" />
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className="p-1 rounded-full bg-red-100 hover:bg-red-200"
                        title="Reject"
                      >
                        <XCircle size={20} className="text-red-600" />
                      </button>
                    </>
                  )}

                  {user.status === 'inactive' && (
                    <button
                      onClick={() => handleActivate(user.id)}
                      className="p-1 rounded-full bg-green-100 hover:bg-green-200"
                      title="Activate"
                    >
                      <CheckCircle size={20} className="text-green-600" />
                    </button>
                  )}

                  {user.status === 'active' && (
                    <>
                      <button
                        onClick={() => handleToggleRole(user.id)}
                        className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                        title="Toggle Role"
                      >
                        <Pencil size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-1 rounded-full bg-red-100 hover:bg-red-200"
                        title="Delete"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-6">
                  No users match your search.
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
