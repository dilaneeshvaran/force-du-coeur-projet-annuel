import React, { useState } from 'react';
import '../styles/event.css';

interface Event {
    id?: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    availableSpots: number;
    membersOnly: boolean;
    participations?: number;
    participants?: string[];
    quota: number | null;
}

interface EventProps {
    event: Event;
}

const Event: React.FC<EventProps> = ({ event }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState(event);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8088/events/${event.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEvent),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }


            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8088/events/${event.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                setMessage('Evenement supprimé !');
                setIsError(false);
                setShowConfirm(false);
            }

        } catch (error) {
            setMessage('Suppression a échoué : ' + error);
            setIsError(true);
            setShowConfirm(false);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = new Date(e.target.value);
        if (!isNaN(newDate.getTime())) {
            setUpdatedEvent({ ...updatedEvent, date: newDate });
        } else {
            console.error('Invalid date format:', e.target.value);
        }
    };

    if (isEditing) {
        return (
            <div className='event-update-box'>
                Titre<input value={updatedEvent.title} onChange={e => setUpdatedEvent({ ...updatedEvent, title: e.target.value })} />
                Description<input value={updatedEvent.description} onChange={e => setUpdatedEvent({ ...updatedEvent, description: e.target.value })} />
                Date (JJ/MM/AAA HH/MM)<input
                    type='datetime-local'
                    value={updatedEvent.date instanceof Date ? updatedEvent.date.toISOString().substring(0, 16) : ''}
                    onChange={handleDateChange}
                />
                Lieu (Address)<input value={updatedEvent.location} onChange={e => setUpdatedEvent({ ...updatedEvent, location: e.target.value })} />
                Places Dispo<input value={updatedEvent.availableSpots ? updatedEvent.availableSpots.toString() : ''} onChange={e => setUpdatedEvent({ ...updatedEvent, availableSpots: parseInt(e.target.value) })} />
                Uniquement Les Membres ? <input type="checkbox" checked={updatedEvent.membersOnly} onChange={e => setUpdatedEvent({ ...updatedEvent, membersOnly: e.target.checked })} />
                Quorum<input
                    value={updatedEvent.quota !== null ? updatedEvent.quota.toString() : ''}
                    onChange={e => setUpdatedEvent({ ...updatedEvent, quota: parseInt(e.target.value) || null })}
                    placeholder="Quorum"
                />
                <button className='updateValidate' onClick={handleUpdate}>Valider</button>
                <button onClick={() => setIsEditing(false)}>Annuler</button>
            </div>
        );
    }

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const formattedTime = date.toISOString().split('T')[1].substring(0, 5);
        return `${formattedDate} ${formattedTime}`;
    };

    const formattedDate = formatDate(event.date);

    return (
        <div className='event-box'>
            <h2>Titre : {event.title}</h2>
            <p>Description : {event.description}</p>
            <p>Date : {formattedDate}</p>
            <p>Lieu : {event.location}</p>
            <p>Nb de Places Max : {event.availableSpots}</p>
            <p>Membres Uniquement : {event.membersOnly ? 'Oui' : 'Non'}</p>
            <p>Participations Total : {event.participations}</p>
            <p>Quorum : {event.quota ?? 'No Quorum'}</p>
            <button onClick={() => setIsEditing(true)}>Mettre à jour</button>
            <button onClick={() => setShowConfirm(true)}>Supprimer</button>
            {showConfirm && (
                <div>
                    <p>Etes vous sur de supprimer l'évenement "{event.title}" ?</p>
                    <button onClick={handleDelete}>Oui</button>
                    <button onClick={() => setShowConfirm(false)}>Non</button>
                </div>
            )}
            {message && (
                <div style={{ color: isError ? 'red' : 'green' }}>
                    {message}
                </div>
            )}
        </div>
    );
}

export default Event;
