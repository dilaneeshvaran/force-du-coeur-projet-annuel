import React, { useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';
import '../styles/alerts.css';
import '../styles/content.css';

type Alert = {
    id: number;
    label: string;
    description: string;
    date: string;
    isArchived: boolean;
};

function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [filter, setFilter] = useState<'archived' | 'non-archived'>('non-archived');
    const [showConfirm, setShowConfirm] = useState<null | number>(null);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const response = await fetch('http://localhost:8088/alerts');
                const data: Alert[] = await response.json();
                setAlerts(data);
            } catch (error) {
                console.error('Error fetching alerts:', error);
            }
        }

        fetchAlerts();
    }, []);

    const handleArchiveChange = (id: number, isArchived: boolean) => {
        setAlerts(prevAlerts =>
            prevAlerts.map(alert =>
                alert.id === id ? { ...alert, isArchived } : alert
            )
        );

        // Simulate API call
        fetch(`http://localhost:8088/alerts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isArchived }),
        }).catch(error => console.error('Error updating alert:', error));
    };

    const handleDelete = async (id: number) => {
        try {
            await fetch(`http://localhost:8088/alerts/${id}`, {
                method: 'DELETE',
            });

            setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
        } catch (error) {
            console.error('Error deleting alert:', error);
        }
    };

    const confirmDelete = (id: number) => {
        setShowConfirm(id);
    };

    const cancelDelete = () => {
        setShowConfirm(null);
    };

    const filteredAlerts = alerts
        .filter(alert => (filter === 'archived' ? alert.isArchived : !alert.isArchived))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Date(dateString).toLocaleString('en-GB', options).replace(',', '');
    };

    return (
        <div className="contentBox">
            <div className="content">
                <h2 className='h2-alert'>Alerts</h2>
                <div className='filter-alert'>
                    <label htmlFor="filter">Filtrer: </label>
                    <select id="filter" value={filter} onChange={e => setFilter(e.target.value as 'archived' | 'non-archived')}>
                        <option value="non-archived">Alerts</option>
                        <option value="archived">Alerts Archivé</option>
                    </select>
                </div>
                {filteredAlerts.map(alert => (
                    <div key={alert.id} className="alertBox">
                        <h3>{alert.label}</h3>
                        <p>{alert.description}</p>
                        <p>{formatDate(alert.date)}</p>
                        <label className='archive-label'>
                            <input
                                type="checkbox"
                                checked={alert.isArchived}
                                onChange={e => handleArchiveChange(alert.id, e.target.checked)}
                            />
                            Archiver
                        </label>
                        <button onClick={() => confirmDelete(alert.id)}>Supprimer</button>
                        {showConfirm === alert.id && (
                            <div className="confirmBox">
                                <p>Etes vous sur de supprimer l'alert?</p>
                                <button onClick={() => handleDelete(alert.id)}>Oui</button>
                                <button onClick={cancelDelete}>Non</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AuthCheck(Alerts);
