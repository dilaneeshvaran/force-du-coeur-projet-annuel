import React from 'react';
import '../styles/taskbox.css';

interface Task {
    id: number;
    title: string;
    description?: string;
    deadline: Date;
    assignedDate: Date;
    status: 'ongoing' | 'completed' | 'failed';
    completedDate?: Date | null;
    failedDate?: Date | null;
    assignedTo: number;
    createdBy: number;
}

interface TaskBoxProps {
    tache: Task;
    handleCheckboxChange: (id: number, newStatus: 'completed' | 'failed' | 'ongoing') => void;
}

const TaskBox: React.FC<TaskBoxProps> = ({ tache, handleCheckboxChange }) => {
    return (
        <div className="task-box" key={tache.id}>
            <h2>{tache.title}</h2>
            <p>{tache.description}</p>
            <p>Assigned: {new Date(tache.assignedDate).toLocaleDateString()}</p>
            {tache.completedDate && <p>Done: {new Date(tache.completedDate).toLocaleDateString()}</p>}
            <input type="checkbox" checked={tache.status === 'completed'} onChange={() => handleCheckboxChange(tache.id, 'completed')} /> Done
            <input type="checkbox" checked={tache.status === 'failed'} onChange={() => handleCheckboxChange(tache.id, 'failed')} /> Failed
        </div>
    );
};

export default TaskBox;