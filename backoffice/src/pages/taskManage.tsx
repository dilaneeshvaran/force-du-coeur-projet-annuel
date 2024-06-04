import React, { useState } from 'react';
import Task from '../components/Task';
import AuthCheck from '../components/AuthCheck';

type TaskType = {
    title: string;
    description: string;
    deadline: Date;
    assignedTo: string;
    assignedDate: Date;
    status: 'ongoing' | 'completed' | 'failed'; // Add status property
};

// Fake users data
const users = ['User1', 'User2', 'User3'];

function TaskManager() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [newTask, setNewTask] = useState<TaskType>({ title: '', description: '', deadline: new Date(), assignedTo: '', assignedDate: new Date(), status: 'ongoing' });
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = () => {
        setTasks(prevTasks => [...prevTasks, { ...newTask, status: 'ongoing' }]); // Set default status to 'ongoing'
        setNewTask({ title: '', description: '', deadline: new Date(), assignedTo: '', assignedDate: new Date(), status: 'ongoing' });
        setIsCreating(false);
    };

    const handleUpdate = (updatedTask: TaskType, index: number) => {
        setTasks(prevTasks => prevTasks.map((task, i) => i === index ? updatedTask : task));
    };

    const handleDelete = (index: number) => {
        setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
    };

    return (
        <div>
            {tasks.map((task, index) => (
                <Task
                    key={index}
                    task={task}
                    onUpdate={(updatedTask) => handleUpdate(updatedTask, index)}
                    onDelete={() => handleDelete(index)}
                />
            ))}
            <button onClick={() => setIsCreating(true)}>Create New Task</button>
            {isCreating && (
                <div>
                    <h2>Create a new task</h2>
                    Title: <input value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} />
                    Description: <input value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                    Assigned To:
                    <select value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}>
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