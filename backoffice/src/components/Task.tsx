import React, { useState, useEffect } from 'react';

export type TaskProps = {
    task: {
        id?: number;
        title: string;
        description: string;
        deadline: Date;
        assignedTo: string;
        assignedDate: Date;
        status: 'ongoing' | 'completed' | 'failed';
    };
    onUpdate: (updatedTask: TaskProps['task']) => void;
    onDelete: () => void;
};

function Task({ task, onUpdate, onDelete }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleUpdate = () => {
        onUpdate(editedTask);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    Title: <input value={editedTask.title} onChange={e => setEditedTask({ ...editedTask, title: e.target.value })} />
                    Description: <input value={editedTask.description} onChange={e => setEditedTask({ ...editedTask, description: e.target.value })} />
                    Assigned To: <input value={editedTask.assignedTo} onChange={e => setEditedTask({ ...editedTask, assignedTo: e.target.value })} />
                    Status:
                    <select value={editedTask.status} onChange={e => setEditedTask({ ...editedTask, status: e.target.value as TaskProps['task']['status'] })}>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h2>{task.title}</h2>
                    <p>{task.description}</p>
                    <p>Deadline: {task.deadline.toLocaleDateString()}</p>
                    <p>Assigned to: {task.assignedTo}</p>
                    <p>Assigned date: {task.assignedDate.toLocaleDateString()}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={onDelete}>Delete</button>
                </>
            )}
        </div>
    );
}

export default Task;
