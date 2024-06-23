import React, { useEffect, useState } from 'react';
import "../styles/content.css"
import Event from '../components/Event';
import Vote from '../components/Vote';
import { createEvent, updateEvent, deleteEvent, createVote, updateVote, deleteVote } from './contentFunctions';
import { Description } from '@mui/icons-material';
import AuthCheck from '../components/AuthCheck';

function ContentManager() {

    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch('http://localhost:8088/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);


    const [votes, setVotes] = useState<Vote[]>([
        { title: 'Vote 1', description: 'Description 1', options: ['Option 1', 'Option 2'], deadline: new Date() },
        { title: 'Vote 2', description: 'Description 2', options: ['Option 3', 'Option 4'], deadline: new Date() },
    ]);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ date: new Date(), description: '', title: '', images: [''] });

    const [isCreatingVote, setIsCreatingVote] = useState(false);
    const [newVote, setNewVote] = useState({ title: '', description: '', options: [''], deadline: new Date() });

    const [selectedOption, setSelectedOption] = useState<'events' | 'votes' | 'surveys'>('events');




    return (
        <div className="contentBox">
            <div className="creation-box">
                <button onClick={() => setIsCreatingEvent(true)}>Create Event</button>
                {isCreatingEvent && (
                    <div>
                        Title<input value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />
                        <br></br>Description<input value={newEvent.description} onChange={e => setNewEvent({ ...newEvent, description: e.target.value })} />
                        <button onClick={() => { setEvents(prevEvents => createEvent(prevEvents, newEvent)); setIsCreatingEvent(false); }}>Validate</button>
                        <button onClick={() => setIsCreatingEvent(false)}>Cancel</button>
                    </div>
                )}
                <button onClick={() => setIsCreatingVote(true)}>Create Vote</button>
                {isCreatingVote && (
                    <div>
                        Title<input value={newVote.title} onChange={e => setNewVote({ ...newVote, title: e.target.value })} />
                        <br></br>Description<input value={newVote.description} onChange={e => setNewVote({ ...newVote, description: e.target.value })} />
                        <button onClick={() => { setVotes(prevVotes => createVote(prevVotes, newVote)); setIsCreatingVote(false); }}>Validate</button>
                        <button onClick={() => setIsCreatingVote(false)}>Cancel</button>
                    </div>
                )}
            </div>
            <div className='manageContent' style={{ backgroundColor: 'red', display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <button onClick={() => setSelectedOption('events')}>Events</button>
                    <button onClick={() => setSelectedOption('votes')}>Votes</button>
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

        </div >
    );
}

export default AuthCheck(ContentManager);