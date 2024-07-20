import React, { useState, useEffect } from 'react';
import TaskBox from '../components/TaskBox';
import '../styles/taches.css';

interface Tache {
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

const MesTaches = () => {
    const [taches, setTaches] = useState<Tache[]>([]);
    const [selectedType, setSelectedType] = useState('ongoing');
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        const userId = Number(localStorage.getItem('userId'));
        const fetchTasks = async () => {
            const response = await fetch(`http://localhost:8088/tasks/user/${userId}`);
            const data = await response.json();
            setTaches(data);
        };

        fetchTasks();
    }, []);

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleCheckboxChange = (id: number, newStatus: 'completed' | 'failed' | 'ongoing') => {
        const updatedTaches = taches.map(tache => {
            if (tache.id === id) {
                const isUnchecking = tache.status === newStatus;
                let updatedStatus = isUnchecking ? 'ongoing' : newStatus;
                let updatedCompletedDate = null;
                let updatedFailedDate = null;

                if (newStatus === 'completed' && !isUnchecking) {
                    updatedCompletedDate = new Date().toISOString();
                } else if (newStatus === 'failed' && !isUnchecking) {
                    updatedFailedDate = new Date().toISOString();
                }

                return { ...tache, status: updatedStatus, completedDate: updatedCompletedDate, failedDate: updatedFailedDate };
            }
            return tache;
        });

        setTaches(updatedTaches);

        const taskToUpdate = updatedTaches.find(tache => tache.id === id);
        if (taskToUpdate) {
            fetch(`http://localhost:8088/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: taskToUpdate.status,
                    completedDate: taskToUpdate.completedDate,
                    failedDate: taskToUpdate.failedDate,
                }),
            })
                .then(response => response.json())
                .then(() => {
                    setMessage(`Tache mis à jour`);
                    setTimeout(() => setMessage(null), 3000);
                })
                .catch(error => console.error('Error:', error));
        }
    };

    return (
        <>
            <div className="taches-box">
                <div className='nav-taches'>
                    <a href='#' className={`nav-taches-link ${selectedType === 'ongoing' ? 'nav-taches-link-selected' : ''}`} onClick={() => handleTypeClick('ongoing')}>Tâches à faire</a>
                    <a href='#' className={`nav-taches-link ${selectedType === 'completed' ? 'nav-taches-link-selected' : ''}`} onClick={() => handleTypeClick('completed')}>Tâches fait</a>
                    <a href='#' className={`nav-taches-link ${selectedType === 'failed' ? 'nav-taches-link-selected' : ''}`} onClick={() => handleTypeClick('failed')}>Tâches échoués</a>
                </div>

                <div className='taches-list'>
                    {taches.filter(tache => tache.status === selectedType).map((tache) => (
                        <TaskBox key={tache.id} tache={tache} handleCheckboxChange={handleCheckboxChange} />
                    ))}
                </div>

                {message && <div className='message-conf'>{message}</div>}
            </div>
        </>
    );
};

export default MesTaches;
