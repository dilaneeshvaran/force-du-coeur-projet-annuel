import React, { useEffect, useState } from 'react';
import "../styles/content.css";
import Event from '../components/Event';
import Vote from '../components/Vote';
import { createEvent, updateEvent, deleteEvent, createVote, updateVote, deleteVote } from './contentFunctions';
import AuthCheck from '../components/AuthCheck';

function ContentManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [votes, setVotes] = useState<Vote[]>([
        { title: 'Vote 1', description: 'Description 1', options: ['Option 1', 'Option 2'], deadline: new Date() },
        { title: 'Vote 2', description: 'Description 2', options: ['Option 3', 'Option 4'], deadline: new Date() },
    ]);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState<Event>({
        date: new Date(),
        description: '',
        title: '',
        location: '',
        availableSpots: 0,
        participations: 0,
        membersOnly: false,
        quota: null
    });
    const [isCreatingVote, setIsCreatingVote] = useState(false);
    const [newVote, setNewVote] = useState({ title: '', description: '', options: [''], deadline: new Date() });
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState<'events' | 'votes' | 'surveys'>('events');

    const [inputErrors, setInputErrors] = useState({
        title: false,
        description: false,
        date: false,
        location: false,
        availableSpots: false,
    });

    useEffect(() => {
        fetch('http://localhost:8088/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    function validateForm() {
        const errors = {
            title: !newEvent.title,
            description: !newEvent.description,
            date: !newEvent.date || isNaN(newEvent.date.getTime()) || newEvent.date < new Date(),
            location: !newEvent.location,
            availableSpots: newEvent.availableSpots <= 0,
        };
        setInputErrors(errors);
        return !Object.values(errors).some(error => error);
    }

    function submitEvent(e: any) {
        e.preventDefault();

        if (!validateForm()) {
            console.error('Form validation failed');
            return;
        }

        fetch('http://localhost:8088/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newEvent),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                setIsCreatingEvent(false);
                setConfirmationMessage('Evenement crée, rafraichissez la page pour l\'afficher !');
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 5000);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function validateDateTime(inputDateTime: any) {
        const inputDate = new Date(inputDateTime);
        const currentDate = new Date();
        return inputDate >= currentDate;
    }

    return (
        <div className="contentBox">
            <div className="creation-box">
                <button onClick={() => setIsCreatingEvent(true)} style={{ backgroundColor: isCreatingEvent === true ? 'gray' : 'green' }}>Créer un Event</button>
                {isCreatingEvent && (
                    <div className='creation-form'>
                        <label>Title</label>
                        <input
                            className={inputErrors.title ? 'invalid' : ''}
                            value={newEvent.title}
                            onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                        />
                        {inputErrors.title && <span className="error-message">Titre est vide</span>}
                        <br />
                        <label>Description</label>
                        <input
                            className={inputErrors.description ? 'invalid' : ''}
                            value={newEvent.description}
                            onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                            required
                        />
                        {inputErrors.description && <span className="error-message">Description est vide</span>}
                        <br />
                        <label>Date</label>
                        <input
                            type="datetime-local"
                            className={inputErrors.date ? 'invalid' : ''}
                            onChange={e => {
                                const isValid = validateDateTime(e.target.value);
                                if (isValid) {
                                    setNewEvent({ ...newEvent, date: new Date(e.target.value) });
                                } else {
                                    setInputErrors(prev => ({ ...prev, date: true }));
                                    console.error("Selected date and time cannot be in the past.");
                                }
                            }}
                            required
                        />
                        {inputErrors.date && <span className="error-message">Date est vide</span>}
                        <br />
                        <label>Lieu</label>
                        <input
                            className={inputErrors.location ? 'invalid' : ''}
                            onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                            required
                        />
                        {inputErrors.location && <span className="error-message">Lieu est vide</span>}
                        <br />
                        <label>Places Dispo</label>
                        <input
                            type="number"
                            className={inputErrors.availableSpots ? 'invalid' : ''}
                            onChange={e => setNewEvent({ ...newEvent, availableSpots: parseInt(e.target.value, 10) })}
                            required
                        />
                        {inputErrors.availableSpots && <span className="error-message">places doivent etre superieur à 0</span>}
                        <br />
                        <label>Membres Uniquement</label>
                        <input type="checkbox" onChange={e => setNewEvent({ ...newEvent, membersOnly: e.target.checked })} />
                        <br />
                        <label>Quorum</label>
                        <input type="number" onChange={e => setNewEvent({ ...newEvent, quota: e.target.value ? parseInt(e.target.value, 10) : null })} />
                        <button onClick={submitEvent} style={{ backgroundColor: isCreatingEvent === true ? 'green' : 'gray' }}>Validate</button>
                        <button onClick={() => setIsCreatingEvent(false)}>Annuler</button>
                    </div>
                )}
                <button onClick={() => setIsCreatingVote(true)} style={{ backgroundColor: isCreatingVote === true ? 'gray' : 'green' }}>Créer un Vote</button>
                {isCreatingVote && (
                    <div>
                        Title<input value={newVote.title} onChange={e => setNewVote({ ...newVote, title: e.target.value })} />
                        <br />Description<input value={newVote.description} onChange={e => setNewVote({ ...newVote, description: e.target.value })} />
                        <button onClick={() => { setVotes(prevVotes => createVote(prevVotes, newVote)); setIsCreatingVote(false); }}>Validate</button>
                        <button onClick={() => setIsCreatingVote(false)}>Annuler</button>
                    </div>
                )}
            </div>
            {showConfirmation && (
                <div className="confirmation-message">
                    {confirmationMessage}
                </div>
            )}
            <div className='manageContent' >
                <div style={{ marginRight: '20px' }}>
                    <button
                        onClick={() => setSelectedOption('events')}
                        style={{ backgroundColor: selectedOption === 'events' ? '#007bff' : 'gray' }}
                    >
                        Events
                    </button>
                    <button
                        onClick={() => setSelectedOption('votes')}
                        style={{ backgroundColor: selectedOption === 'votes' ? '#007bff' : 'gray' }}
                    >
                        Votes
                    </button>
                </div>
                <div className="content">
                    {selectedOption === 'events' && events.map((event, index) => (
                        <Event
                            key={index}
                            event={event}
                            onUpdate={(updatedEvent) => setEvents(prevEvents => updateEvent(prevEvents, updatedEvent, index))}
                            onDelete={() => setEvents(prevEvents => deleteEvent(prevEvents, index))}
                        />
                    ))}
                    {selectedOption === 'votes' && votes.map((vote, index) => (
                        <Vote
                            key={index}
                            vote={vote}
                            onUpdate={(updatedVote) => setVotes(prevVotes => updateVote(prevVotes, updatedVote, index))}
                            onDelete={() => setVotes(prevVotes => deleteVote(prevVotes, index))}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AuthCheck(ContentManager);
