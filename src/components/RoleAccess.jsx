// import React from 'react';

// const RoleAccess = ({ roles }) => {
//   const roleDescriptions = {
//     Admin: 'Full access to all system functionality.',
//     Editor: 'Can edit content but cannot manage users.',
//     Viewer: 'Read-only access to view content.',
//     'HR Manager': 'Manages employee information and roles.',
//     'Project Manager': 'Oversees projects and assigns tasks.',
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-white">
//       <h2 className="text-xl font-bold mb-4">Role Descriptions</h2>
//       <ul className="list-disc pl-6">
//         {roles.map((role, index) => (
//           <li key={index} className="mb-2">
//             <strong>{role}</strong>: {roleDescriptions[role] || 'No description available.'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default RoleAccess;
import React, { useState } from 'react';
import { X, Edit2 } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const UserDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Lady Logi',
      role: 'Admin',
      engagement: 95,
      conversion: 85,
    },
    {
      id: 2,
      name: 'Moran',
      role: 'Editor',
      engagement: 75,
      conversion: 65,
    },
    {
      id: 3,
      name: 'Audrey Horne',
      role: 'Viewer',
      engagement: 50,
      conversion: 40,
    },
    {
      id: 4,
      name: 'Dale Cooper',
      role: 'HR Manager',
      engagement: 90,
      conversion: 88,
    },
  ]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Engagement Rate',
        data: [75, 80, 85, 90, 95, 100],
        borderColor: '#4CAF50',
        tension: 0.4,
      },
      {
        label: 'Conversion Rate',
        data: [65, 70, 75, 80, 85, 90],
        borderColor: '#2196F3',
        tension: 0.4,
      },
    ],
  };

  const [newUser, setNewUser] = useState({
    name: '',
    role: '',
    engagement: 0,
    conversion: 0,
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.role) {
      setUsers([
        ...users,
        { ...newUser, id: users.length + 1 },
      ]);
      setNewUser({ name: '', role: '', engagement: 0, conversion: 0 });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      
      {/* Main Content */}
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

        {/* Analytics Chart */}
        <div className="mb-6">
          <Line data={chartData} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total Visitors</h2>
            <p className="text-2xl font-bold">4,818</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Engagement Rate</h2>
            <p className="text-2xl font-bold">118,818</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Conversion Rate</h2>
            <p className="text-2xl font-bold">12,158,187</p>
          </div>
        </div>

        {/* Add User Section */}
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Add User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Role"
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Engagement"
            value={newUser.engagement}
            onChange={(e) => setNewUser({ ...newUser, engagement: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Conversion"
            value={newUser.conversion}
            onChange={(e) => setNewUser({ ...newUser, conversion: e.target.value })}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddUser}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>

        {/* User Performance Table */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-4">Your Customers</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th>Role</th>
                <th>Engagement (%)</th>
                <th>Conversion (%)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2">{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.engagement}</td>
                  <td>{user.conversion}</td>
                  <td className="flex space-x-2">
                    <button className="text-blue-600">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;

