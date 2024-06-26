import React, { useState, useEffect } from 'react';
import Task from '../components/Task';
import AuthCheck from '../components/AuthCheck';

type TaskType = {
    id?: number;
    title: string;
    description: string;
    deadline: Date;
    assignedTo: string;
    assignedDate: Date;
    status: 'ongoing' | 'completed' | 'failed';
};

function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [newTask, setNewTask] = useState<TaskType>({
        title: '',
        description: '',
        deadline: new Date(),
        assignedTo: '',
        assignedDate: new Date(),
        status: 'ongoing'
    });
    const [users, setUsers] = useState<string[]>([]);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8088/tasks')
            .then(response => response.json())
            .then(data => {
                const parsedTasks = data.map((task: TaskType) => ({
                    ...task,
                    deadline: new Date(task.deadline),
                    assignedDate: new Date(task.assignedDate)
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

    const handleCreate = () => {
        fetch('http://localhost:8088/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then(response => response.json())
            .then(data => {
                setTasks(prevTasks => [...prevTasks, data]);
                setNewTask({
                    title: '',
                    description: '',
                    deadline: new Date(),
                    assignedTo: '',
                    assignedDate: new Date(),
                    status: 'ongoing'
                });
                setIsCreating(false);
            })
            .catch(error => console.error('Error creating task:', error));
    };

    const handleUpdate = (updatedTask: TaskType) => {
        fetch(`http://localhost:8088/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
            .then(response => response.json())
            .then(data => {
                setTasks(prevTasks => prevTasks.map(task => task.id === updatedTask.id ? data : task));
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
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onUpdate={handleUpdate}
                    onDelete={() => handleDelete(task.id!)}
                />
            ))}
            <button onClick={() => setIsCreating(true)}>Create New Task</button>
            {isCreating && (
                <div>
                    <h2>Create a new task</h2>
                    Title: <input value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                    Description: <input value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                    Deadline: <input type="date" value={newTask.deadline.toISOString().split('T')[0]} onChange={e => setNewTask({ ...newTask, deadline: new Date(e.target.value) })} />
                    Assigned To:
                    <select value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                        <option value="">Select User</option>
                        {users.map(user => <option key={user} value={user}>{user}</option>)}
                    </select>
                    <button onClick={handleCreate}>Create</button>
                    <button onClick={() => setIsCreating(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default AuthCheck(TaskManager);
