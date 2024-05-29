import React from 'react';

interface Event {
    date: Date;
    place: string;
    description: string;
    images: string[];
}


interface EventProps {
    event: Event;
    onUpdate: (updatedEvent: Event) => void;
    onDelete: () => void; // Add this line
}

const Event: React.FC<EventProps> = ({ event, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>{event.description}</h2>
            <p>{event.place}</p>
            <p>{event.date.toString()}</p>
            <button onClick={() => onUpdate({ ...event, description: 'Updated description' })}>Update</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

export default Event;