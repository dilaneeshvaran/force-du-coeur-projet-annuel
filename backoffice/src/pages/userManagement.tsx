import React, { useState } from 'react';
import "../styles/content.css"

interface User {
    id: number;
    name: string;
    role: 'member' | 'admin';
    isBanned: boolean;
    banPeriod: 'day' | 'week' | 'month' | 'permanent' | null;
}

function UserManagement() {
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'User 1', role: 'member', isBanned: false, banPeriod: null },
        { id: 2, name: 'User 2', role: 'member', isBanned: false, banPeriod: null },
        // Add more users as needed
    ]);

    const [selectedBanPeriod, setSelectedBanPeriod] = useState<'day' | 'week' | 'month' | 'permanent' | null>(null);
    const [selectedRole, setSelectedRole] = useState<'member' | 'admin' | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    const changeRole = (id: number, role: 'member' | 'admin') => {
        setUsers(users.map(user => user.id === id ? { ...user, role } : user));
        setSelectedRole(null);
        setSelectedUserId(null);
    };

    const banUser = (id: number, period: 'day' | 'week' | 'month' | 'permanent') => {
        setUsers(users.map(user => user.id === id ? { ...user, isBanned: true, banPeriod: period } : user));
        setSelectedBanPeriod(null);
        setSelectedUserId(null);
    };

    return (
        <div className='contentBox'>
            <div className='content'>
                <h2>User Management</h2>
                {users.map(user => (
                    <div key={user.id}>
                        <p>{user.name} ({user.role}) {user.isBanned && `(Banned for ${user.banPeriod})`}</p>
                        {selectedUserId === user.id && selectedRole !== null ? (
                            <>
                                <select onChange={(e) => setSelectedRole(e.target.value as 'member' | 'admin')}>
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <button onClick={() => changeRole(user.id, selectedRole)}>Validate Role Change</button>
                                <button onClick={() => { setSelectedRole(null); setSelectedUserId(null); }}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => { setSelectedUserId(user.id); setSelectedRole(user.role); }}>Change Role</button>
                        )}
                        {selectedUserId === user.id && selectedBanPeriod !== null ? (
                            <>
                                <select onChange={(e) => setSelectedBanPeriod(e.target.value as 'day' | 'week' | 'month' | 'permanent')}>
                                    <option value="day">Day</option>
                                    <option value="week">Week</option>
                                    <option value="month">Month</option>
                                    <option value="permanent">Permanent</option>
                                </select>
                                <button onClick={() => banUser(user.id, selectedBanPeriod)}>Confirm Ban</button>
                                <button onClick={() => { setSelectedBanPeriod(null); setSelectedUserId(null); }}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => { setSelectedUserId(user.id); setSelectedBanPeriod('day'); }}>Ban User</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserManagement;