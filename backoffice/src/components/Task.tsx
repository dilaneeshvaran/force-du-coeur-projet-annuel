import React, { useState, useEffect } from 'react';
import '../styles/task.css';

export type TaskProps = {
    task: {
        id?: number;
        title: string;
        description: string;
        deadline: Date;
        assignedTo: number;
        assigned_date: Date;
        status: 'ongoing' | 'completed' | 'failed';
        createdBy: number;
    };
    onUpdate: (updatedTask: TaskProps['task']) => void;
    onDelete: () => void;
};

type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
};

function Task({ task, onUpdate, onDelete }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleUpdate = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    const getUserNameById = (userId: number) => {
        const user = users.find(user => user.id === userId);
        return user ? `${user.firstname} (${user.email})` : 'Unknown';
    };

    return (
        <div className='task-container'>
            {isEditing ? (
                <>
                    Titre: <input value={editedTask.title} onChange={e => setEditedTask({ ...editedTask, title: e.target.value })} />
                    Description: <input value={editedTask.description} onChange={e => setEditedTask({ ...editedTask, description: e.target.value })} />
                    Assigné à:
                    <select className='select-task-user' value={editedTask.assignedTo} onChange={e => setEditedTask({ ...editedTask, assignedTo: Number(e.target.value) })}>
                        <option value="">Choisir l'utilisateur</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.firstname} ({user.email})
                            </option>
                        ))}
                    </select>
                    Status:
                    <select className='select-task-user' value={editedTask.status} onChange={e => setEditedTask({ ...editedTask, status: e.target.value as TaskProps['task']['status'] })}>
                        <option value="ongoing">Encours</option>
                        <option value="completed">Complété</option>
                        <option value="failed">échoué</option>
                    </select>
                    <button className='task-save-btn' onClick={handleUpdate}>Enregistrer</button>
                    <button className='task-cancel-btn' onClick={() => setIsEditing(false)}>Annuler</button>
                </>
            ) : (
                <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Deadline: {task.deadline ? task.deadline.toLocaleDateString() : 'Not set'}</p>
                    <p>Assigné à: {getUserNameById(task.assignedTo)}</p>
                    <p>Date Assigné: {task.assigned_date ? task.assigned_date.toLocaleDateString() : 'Not set'}</p>
                    <p>Status: {task.status}</p>
                    <button className='task-edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
                    <button className='task-delete-btn' onClick={onDelete}>Delete</button>
                </>
            )}

        </div>
    );
}

export default Task;
