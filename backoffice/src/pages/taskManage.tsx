import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import AuthCheck from '../components/AuthCheck';
import '../styles/taskManage.css';

type TaskType = {
    id?: number;
    title: string;
    description: string;
    deadline: Date;
    assignedTo: number;
    assigned_date: Date;
    status: 'ongoing' | 'completed' | 'failed';
    createdBy: number;
    failedDate?: Date;
    completedDate?: Date;
};

type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const userId = Number(localStorage.getItem('userId'));
    const [newTask, setNewTask] = useState<TaskType>({
        title: '',
        description: '',
        deadline: new Date(),
        assignedTo: 0,
        assigned_date: new Date(),
        status: 'ongoing',
        createdBy: userId || 0
    });
    const [users, setUsers] = useState<UserType[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8088/tasks')
            .then(response => response.json())
            .then(data => {
                const parsedTasks = data.map((task: TaskType) => ({
                    ...task,
                    deadline: new Date(task.deadline),
                    assigned_date: new Date(task.assigned_date)
                }));
                setTasks(parsedTasks);
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const validateDateTime = (inputDateTime: Date) => {
        const inputDate = new Date(inputDateTime);
        const currentDate = new Date();
        return inputDate >= currentDate;
    };

    const handleCreate = () => {
        if (!validateDateTime(newTask.deadline)) {
            alert('Deadline must be in the future.');
            return;
        }

        fetch('http://localhost:8088/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const createdTask = {
                    ...data,
                    deadline: new Date(data.deadline),
                    assigned_date: new Date(data.assigned_date)
                };
                setTasks(prevTasks => [...prevTasks, createdTask]);
                setNewTask({
                    title: '',
                    description: '',
                    deadline: new Date(),
                    assignedTo: 0,
                    assigned_date: new Date(),
                    status: 'ongoing',
                    createdBy: userId || 0
                });
                setIsCreating(false);
            })
            .catch(error => {
                console.error('Error creating task:', error);
                alert('Failed to create task. Please try again.');
            });
    };

    const handleUpdate = (updatedTask: TaskType) => {
        const currentDate = new Date();
        if (updatedTask.status === 'failed') {
            updatedTask.failedDate = currentDate;
        } else if (updatedTask.status === 'completed') {
            updatedTask.completedDate = currentDate;
        }
        fetch(`http://localhost:8088/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Task status:", data.status);



                const updatedTaskWithDate = {
                    ...data,
                    deadline: new Date(data.deadline),
                    assigned_date: new Date(data.assigned_date),
                    failedDate: data.status === 'failed' ? new Date() : data.failedDate ? new Date(data.failedDate) : undefined,
                    completedDate: data.status === 'completed' ? new Date() : data.completedDate ? new Date(data.completedDate) : undefined,
                };
                setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? updatedTaskWithDate : task));
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const handleDelete = (taskId: number) => {
        fetch(`http://localhost:8088/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <div>
            <div className='create-task'>
                <button className='task-create-btn' onClick={() => setIsCreating(true)}>Créer un task</button>
                {isCreating && (
                    <div>
                        <h2>Créer une tâche</h2>
                        Titre: <input className='input-task' value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                        Description: <input className='input-task' value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                        Deadline: <input className='input-task' type="date" value={newTask.deadline.toISOString().split('T')[0]} onChange={e => setNewTask({ ...newTask, deadline: new Date(e.target.value) })} />
                        Assigner :
                        <select className='select-task-user' value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: Number(e.target.value) })}>
                            <option value="">Choisir l'utilisateur</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.firstname} ({user.email})
                                </option>
                            ))}
                        </select>
                        <button className='task-create-btn' onClick={handleCreate}>Créer</button>
                        <button className='task-cancel-btn' onClick={() => setIsCreating(false)}>Annuler</button>
                    </div>
                )}
            </div>
            <div className='task-list'>
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdate}
                        onDelete={() => handleDelete(task.id!)}
                    />
                ))}

            </div>
        </div>
    );
}

export default AuthCheck(TaskManager);
