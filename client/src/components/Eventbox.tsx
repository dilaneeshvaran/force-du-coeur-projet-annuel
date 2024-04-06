import React, { useState } from 'react';
import '../styles/eventbox.css';

interface Event {
    description: string;
    date: Date;
}

interface EventBoxProps {
    event: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ event }) => {
    const [isParticipating, setIsParticipating] = useState(false);

    const handleParticipation = () => {
        setIsParticipating(!isParticipating);
    };

    return (
        <div className="eventbox">
            <h2>Upcoming Event</h2>
            <p>{event.description}</p>
            <p>Date: {event.date.toLocaleDateString()}</p>
            <button
                type="button"
                onClick={handleParticipation}
                style={{ backgroundColor: isParticipating ? 'green' : 'initial' }}
            >
                Participate
            </button>
        </div>
    );
};

export default EventBox;