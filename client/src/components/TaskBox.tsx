import React from 'react';
import '../styles/taskbox.css';

interface Task {
    id: number;
    title: string;
    description?: string;
    deadline: string | null;
    assigned_date: string | null;
    status: 'ongoing' | 'completed' | 'failed';
    completedDate?: string | null;
    failedDate?: string | null;
    assignedTo: number;
    createdBy: number;
}

interface TaskBoxProps {
    tache: Task;
    handleCheckboxChange: (id: number, newStatus: 'completed' | 'failed' | 'ongoing') => void;
}

const formatDate = (dateInput: string | null | undefined): string => {
    if (!dateInput) return 'Date not provided';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString();
};

const TaskBox: React.FC<TaskBoxProps> = ({ tache, handleCheckboxChange }) => {
    const handleStatusChange = (newStatus: 'completed' | 'failed' | 'ongoing') => {
        const statusToSet = tache.status === newStatus ? 'ongoing' : newStatus;
        handleCheckboxChange(tache.id, statusToSet);
    };

    return (
        <div className="task-box" key={tache.id}>
            <h2>{tache.title}</h2>
            <p>{tache.description}</p>
            <p>Assigné: {formatDate(tache.assigned_date)}</p>
            {tache.completedDate && <p>Fait le: {formatDate(tache.completedDate)}</p>}
            {tache.failedDate && <p>Échoué le: {formatDate(tache.failedDate)}</p>}
            <input
                type="checkbox"
                checked={tache.status === 'completed'}
                onChange={() => handleStatusChange('completed')}
                disabled={tache.status === 'failed'}
            /> Fait
            <input
                type="checkbox"
                checked={tache.status === 'failed'}
                onChange={() => handleStatusChange('failed')}
                disabled={tache.status === 'completed'}
            /> Échoué
        </div>
    );
};

export default TaskBox;
