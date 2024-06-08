import React, { useState } from 'react';


interface Event {
    date: Date;
    description: string;
    title: string;
    images: string[];
}


interface EventProps {
    event: Event;
    onUpdate: (updatedEvent: Event) => void;
    onDelete: () => void;
}

const Event: React.FC<EventProps> = ({ event, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedEvent, setUpdatedEvent] = useState(event);

    if (isEditing) {
        return (
            <div>
                <input value={updatedEvent.description} onChange={e => setUpdatedEvent({ ...updatedEvent, description: e.target.value })} />
                <input value={updatedEvent.title} onChange={e => setUpdatedEvent({ ...updatedEvent, title: e.target.value })} />
                <button onClick={() => { onUpdate(updatedEvent); setIsEditing(false); }}>Validate</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }
    return (
        <div>
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>{event.date.toString()}</p>
            <button onClick={() => setIsEditing(true)}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default Event;