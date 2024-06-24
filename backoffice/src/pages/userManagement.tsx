import React, { useState, useEffect } from 'react';
import "../styles/userManage.css";
import AuthCheck from '../components/AuthCheck';
import { FirstPage } from '@mui/icons-material';

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    dateOfBirth: Date;
    memberSince: Date;
    phoneNumber: number;
    address: string;
    city: string;
    country: string;
    role: 'user' | 'admin';
    isBan: boolean;
}

function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [filter, setFilter] = useState<'all' | 'banned' | 'admin' | 'user'>('all');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [actionToConfirm, setActionToConfirm] = useState<() => void>(() => { });
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching votes:', error));
    }, []);

    const updateUser = async (id: number, updates: Partial<User>) => {
        const response = await fetch(`http://localhost:8088/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (response.ok) {
            setUsers(users.map(user => user.id === id ? { ...user, ...updates } : user));
        }
    };

    const changeRole = (id: number, role: 'user' | 'admin', firstname: string, lastname: string) => {
        setConfirmationMessage(`Etes vous sur de changer le role de ${firstname} ${lastname} en ${role}?`);
        setActionToConfirm(() => () => updateUser(id, { role }));
        setSelectedUserId(id);
        setShowConfirmation(true);
    };

    const toggleBanStatus = (id: number, isCurrentlyBanned: boolean, firstname: string, lastname: string) => {
        const newBanStatus = !isCurrentlyBanned;
        setConfirmationMessage(`Etes vous sur de ${newBanStatus ? 'ban' : 'unban'} ${firstname} ${lastname}?`);
        setActionToConfirm(() => () => updateUser(id, { isBan: newBanStatus }));
        setSelectedUserId(id);

        setShowConfirmation(true);
    };

    const filteredUsers = users.filter(user => {
        switch (filter) {
            case 'banned':
                return user.isBan;
            case 'admin':
                return user.role === 'admin';
            case 'user':
                return user.role === 'user';
            default:
                return true;
        }
    });

    function validateDateTime(inputDateTime: any): string {
        if (isNaN(Date.parse(inputDateTime))) {
            return "Invalid Date";
        } else {
            const date = new Date(inputDateTime);
            return date.toLocaleDateString();
        }
    }

    const handleConfirmAction = () => {
        actionToConfirm();
        setShowConfirmation(false);
    };

    const handleCancelAction = () => {
        setShowConfirmation(false);
    };

    return (
        <div className='contentBoxUsers'>

            <div className='content-users'>
                <h2>Gestion des membres</h2>
                <select onChange={(e) => setFilter(e.target.value as 'all' | 'banned' | 'admin' | 'user')}>
                    <option value="all">All Users</option>
                    <option value="banned">Banned Users</option>
                    <option value="admin">Admins</option>
                    <option value="user">Members</option>
                </select>

                {filteredUsers.map(user => (
                    <div className='userList' key={user.id}>
                        <p>({user.role}) {user.isBan ? 'Banni' : ''}</p>
                        <p>Nom: {user.firstname}</p>
                        <p>Prenom: {user.lastname}</p>
                        <p>Email: {user.email}</p>
                        <p>Date de Naissance: {validateDateTime(user.dateOfBirth)}</p>
                        <p>Membre depuis: {validateDateTime(user.memberSince)}</p>
                        <p>Numero de tél: {user.phoneNumber}</p>
                        <p>Address: {user.address}</p>
                        <p>Ville: {user.city}</p>
                        <p>Pays: {user.country}</p>
                        {showConfirmation && selectedUserId === user.id && (
                            <div className="confirmationDialog">
                                <p>{confirmationMessage}</p>
                                <button className='userM-btn' onClick={handleConfirmAction}>Oui</button>
                                <button className='userM-btn' onClick={() => {
                                    handleCancelAction();
                                    setSelectedUserId(null);
                                }}>Non</button>
                            </div>
                        )}
                        <button className='userM-btn' onClick={() => toggleBanStatus(user.id, user.isBan, user.firstname, user.lastname)} disabled={false}>
                            {user.isBan ? 'Unban' : 'Ban'}
                        </button>
                        <button className='userM-btn' onClick={() => changeRole(user.id, user.role === 'admin' ? 'user' : 'admin', user.firstname, user.lastname,)}>
                            Changer le role en {user.role === 'admin' ? 'membre' : 'admin'}
                        </button>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default AuthCheck(UserManagement);