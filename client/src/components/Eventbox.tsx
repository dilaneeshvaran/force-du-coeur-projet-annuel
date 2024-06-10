import React, { useState, useEffect } from 'react';
import '../styles/eventbox.css';

interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
    availableSpots: number;
    membersOnly: boolean;
}

interface EventBoxProps {
    event: Event;
}

const EventBox: React.FC<EventBoxProps> = ({ event }) => {
    const [isParticipating, setIsParticipating] = useState(false);
    const [availableSpots, setAvailableSpots] = useState(event.availableSpots);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`http://localhost:8088/participations?userId=${userId}&eventId=${event.id}`)
            .then(response => response.json())
            .then(data => setIsParticipating(data.length > 0))
            .catch(error => console.error('Error:', error));
    }, [event.id, userId]);

    const handleParticipation = () => {
        const newAvailableSpots = isParticipating ? availableSpots + 1 : availableSpots - 1;
        setAvailableSpots(newAvailableSpots);
        setIsParticipating(!isParticipating);

        fetch(`http://localhost:8088/events/${event.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...event,
                availableSpots: newAvailableSpots,
            }),
        })
            .then(response => response.json())
            .catch(error => console.error('Error:', error));

        if (isParticipating) {
            fetch(`http://localhost:8088/participations?userId=${userId}&eventId=${event.id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        fetch(`http://localhost:8088/participations/${data[0].id}`, {
                            method: 'DELETE',
                        })
                            .then(response => response.json())
                            .catch(error => console.error('Error:', error));
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            fetch(`http://localhost:8088/participations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    eventId: event.id,
                }),
            })
                .then(response => response.json())
                .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div className="eventbox">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
            <p>Available Spots: {availableSpots}</p>
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