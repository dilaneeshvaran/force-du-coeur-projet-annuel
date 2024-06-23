import React, { useState } from 'react';
import '../styles/event.css';

interface Event {
    id: number;
    title: string;
    description: string;
    date: Date;
    location: string;
    availableSpots: number;
    membersOnly: boolean;
    participations: number;
    participants: string[];
    quota: number | null;
}


interface EventProps {
    event: Event;
    onUpdate: (updatedEvent: Event) => void;
    onDelete: () => void;
}

const Event: React.FC<EventProps> = ({ event, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState(event);

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

            onUpdate(updatedEvent);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const handleDateChange = (e: any) => {
        const newDate = new Date(e.target.value);
        if (!isNaN(newDate.getTime())) { // Check if the date conversion is successful
            setUpdatedEvent({ ...updatedEvent, date: newDate });
        } else {
            console.error('Invalid date format:', e.target.value);
        }
    };


    if (isEditing) {
        return (
            <div className='event-update-box'>
                <input value={updatedEvent.title} onChange={e => setUpdatedEvent({ ...updatedEvent, title: e.target.value })} />
                <input value={updatedEvent.description} onChange={e => setUpdatedEvent({ ...updatedEvent, description: e.target.value })} />
                <input value={updatedEvent.date instanceof Date ? updatedEvent.date.toISOString().substring(0, 10) : 'Invalid Date'} onChange={handleDateChange} />                <input value={updatedEvent.location} onChange={e => setUpdatedEvent({ ...updatedEvent, location: e.target.value })} />
                <input value={updatedEvent.availableSpots ? updatedEvent.availableSpots.toString() : ''} onChange={e => setUpdatedEvent({ ...updatedEvent, availableSpots: parseInt(e.target.value) })} />
                <input value={updatedEvent.membersOnly !== undefined ? updatedEvent.membersOnly.toString() : ''} onChange={e => setUpdatedEvent({ ...updatedEvent, membersOnly: e.target.value === 'true' })} />
                <input
                    value={updatedEvent.quota !== null ? updatedEvent.quota.toString() : ''}
                    onChange={e => setUpdatedEvent({ ...updatedEvent, quota: parseInt(e.target.value) || null })}
                    placeholder="Quorum"
                />
                <button onClick={handleUpdate}>Validate</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }
    return (
        <div className='event-box'>
            <h2>Titre : {event.title}</h2>
            <p>Description : {event.description}</p>
            <p>Date : {event.date.toString()}</p>
            <p>Lieu : {event.location}</p>
            <p>Nb de Places Max : {event.availableSpots}</p>
            <p>Membres Uniquement : {event.membersOnly}</p>
            <p>Participations Total : {event.participations}</p>
            <p>Quorum : {event.quota ?? 'No Quorum'}</p>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default Event;