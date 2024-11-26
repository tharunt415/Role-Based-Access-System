import React, { useState } from 'react';
import { X, Edit2 } from 'lucide-react';
import AttendanceChart from './components/AttendanceChart';
import RoleAccess from './components/RoleAccess';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'lady logi',
      email: 'log.lady@gmail.com',
      roles: ['Read Only'],
      access: { read: true, write: false },
      status: 'expired',
      created: '4/16/2017 at 12:16',
      title: 'System Analyst',
    },
    {
      id: 2,
      name: 'Moran',
      email: 'lucy.moran@gmail.com',
      roles: ['Administrator', 'Billing'],
      access: { read: true, write: true },
      status: 'pending',
      created: '3/30/2020 at 11:42',
      title: 'DevOps Engineer',
    },
    {
      id: 3,
      name: 'Audrey Horne',
      email: 'audrey.horne@gmail.com',
      roles: ['Read Only'],
      access: { read: true, write: false },
      status: 'active',
      created: '3/22/2016 at 09:32',
      title: 'Software Developer',
    },
  ]);

  const [roles] = useState(['Admin', 'Editor', 'Viewer', 'HR Manager', 'Project Manager']);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Users');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    roles: [''],
    access: { read: false, write: false },
    status: 'active',
    created: '',
    title: '',
  });

  const [editingUser, setEditingUser] = useState(null); // Tracks the user being edited

  // Add a new user
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        { ...newUser, id: users.length + 1, created: new Date().toLocaleString() },
      ]);
      setNewUser({
        name: '',
        email: '',
        roles: [''],
        access: { read: false, write: false },
        status: 'active',
        created: '',
        title: '',
      });
    }
  };

  // Delete an existing user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Update user details
  const handleUpdateUser = (id, updatedData) => {
    setUsers(users.map((user) => (user.id === id ? { ...user, ...updatedData } : user)));
  };

  // Enter edit mode for a user
  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  // Save changes made to a user
  const handleSaveUser = () => {
    if (editingUser) {
      handleUpdateUser(editingUser.id, editingUser);
      setEditingUser(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col space-y-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <button
          onClick={() => setActiveTab('Users')}
          className={`py-2 px-4 text-left rounded ${
            activeTab === 'Users' ? 'bg-gray-700' : 'hover:bg-gray-600'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('Attendance')}
          className={`py-2 px-4 text-left rounded ${
            activeTab === 'Attendance' ? 'bg-gray-700' : 'hover:bg-gray-600'
          }`}
        >
          Attendance
        </button>
        <button
          onClick={() => setActiveTab('Roles')}
          className={`py-2 px-4 text-left rounded ${
            activeTab === 'Roles' ? 'bg-gray-700' : 'hover:bg-gray-600'
          }`}
        >
          Roles Analytics
        </button>
      </aside>

      <main className="flex-grow p-6">
        {activeTab === 'Users' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Add User</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="border p-2 mb-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="border p-2 mb-2"
                />
                <select
                  value={newUser.roles[0]}
                  onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })}
                  className="border p-2 w-full mb-2"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newUser.access.read}
                      onChange={() =>
                        setNewUser({
                          ...newUser,
                          access: { ...newUser.access, read: !newUser.access.read },
                        })
                      }
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Read</span>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newUser.access.write}
                      onChange={() =>
                        setNewUser({
                          ...newUser,
                          access: { ...newUser.access, write: !newUser.access.write },
                        })
                      }
                      className="h-4 w-4"
                    />
                    <span className="ml-2">Write</span>
                  </div>
                </div>
                <button
                  onClick={handleAddUser}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add User
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {users
                .filter(
                  (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((user) => (
                  <div key={user.id} className="border p-4 rounded-lg bg-white hover:shadow-lg">
                    {editingUser?.id === user.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingUser.name}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, name: e.target.value })
                          }
                          className="border p-2 mb-2 w-full"
                        />
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, email: e.target.value })
                          }
                          className="border p-2 mb-2 w-full"
                        />
                        <select
                          value={editingUser.roles[0]}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, roles: [e.target.value] })
                          }
                          className="border p-2 w-full mb-2"
                        >
                          {roles.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <div className="flex items-center space-x-4 mb-2">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editingUser.access.read}
                              onChange={() =>
                                setEditingUser({
                                  ...editingUser,
                                  access: {
                                    ...editingUser.access,
                                    read: !editingUser.access.read,
                                  },
                                })
                              }
                              className="h-4 w-4"
                            />
                            <span className="ml-2">Read</span>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={editingUser.access.write}
                              onChange={() =>
                                setEditingUser({
                                  ...editingUser,
                                  access: {
                                    ...editingUser.access,
                                    write: !editingUser.access.write,
                                  },
                                })
                              }
                              className="h-4 w-4"
                            />
                            <span className="ml-2">Write</span>
                          </div>
                        </div>
                        <button
                          onClick={handleSaveUser}
                          className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-bold">{user.name}</h3>
                        <p>{user.email}</p>
                        <p className="text-sm text-gray-500">{user.title}</p>
                        <p className="text-sm text-gray-500">
                          Access: Read ({user.access.read ? 'Yes' : 'No'}), Write ({user.access.write ? 'Yes' : 'No'})
                        </p>
                        <div className="mt-4 flex justify-between">
                          <button onClick={() => handleEditUser(user)}>
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-500"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === 'Attendance' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Attendance</h1>
            <AttendanceChart />
          </div>
        )}

        {activeTab === 'Roles' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Role Analytics</h1>
            <RoleAccess roles={roles} />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserManagement;


