import React, { useState } from 'react';
import "../styles/content.css"
import Event from '../components/Event';
import Vote from '../components/Vote';
import Survey from '../components/Survey';
import { createEvent, updateEvent, deleteEvent, createVote, updateVote, deleteVote, createSurvey, updateSurvey, deleteSurvey } from './contentFunctions';
import { Description } from '@mui/icons-material';
import AuthCheck from '../components/AuthCheck';

function ContentManager() {

    const [events, setEvents] = useState<Event[]>([
        { date: new Date(), description: 'Place 1', title: 'Event 1', images: ['image1.jpg'] },
        { date: new Date(), description: 'Place 2', title: 'Event 2', images: ['image2.jpg'] },
    ]);
    const [votes, setVotes] = useState<Vote[]>([
        { title: 'Vote 1', description: 'Description 1', options: ['Option 1', 'Option 2'], deadline: new Date() },
        { title: 'Vote 2', description: 'Description 2', options: ['Option 3', 'Option 4'], deadline: new Date() },
    ]);
    const [surveys, setSurveys] = useState<Survey[]>([
        { title: 'Survey 1', description: 'Description 1', deadline: new Date() },
        { title: 'Survey 2', description: 'Description 2', deadline: new Date() },
    ]);

    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const [newEvent, setNewEvent] = useState({ date: new Date(), description: '', title: '', images: [''] });

    const [isCreatingVote, setIsCreatingVote] = useState(false);
    const [newVote, setNewVote] = useState({ title: '', description: '', options: [''], deadline: new Date() });

    const [isCreatingSurvey, setIsCreatingSurvey] = useState(false);
    const [newSurvey, setNewSurvey] = useState({ title: '', description: '', deadline: new Date() });

    const [selectedOption, setSelectedOption] = useState<'events' | 'votes' | 'surveys'>('events');




    return (
        <div className="contentBox">
            <div style={{ backgroundColor: 'red', display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <button onClick={() => setSelectedOption('events')}>Events</button>
                    <button onClick={() => setSelectedOption('votes')}>Votes</button>
                    <button onClick={() => setSelectedOption('surveys')}>Surveys</button>
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
                    {selectedOption === 'surveys' && surveys.map((survey, index) => (
                        <Survey
                            key={index}
                            survey={survey}
                            onUpdate={(updatedSurvey) => setSurveys(prevSurveys => updateSurvey(prevSurveys, updatedSurvey, index))}
                            onDelete={() => setSurveys(prevSurveys => deleteSurvey(prevSurveys, index))}
                        />
                    ))}
                </div>
            </div>
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
            <button onClick={() => setIsCreatingSurvey(true)}>Create Survey</button>
            {isCreatingSurvey && (
                <div>
                    Title<input value={newSurvey.title} onChange={e => setNewSurvey({ ...newSurvey, title: e.target.value })} />
                    <br></br>Description<input value={newSurvey.description} onChange={e => setNewSurvey({ ...newSurvey, description: e.target.value })} />
                    <button onClick={() => { setSurveys(prevSurveys => createSurvey(prevSurveys, newSurvey)); setIsCreatingSurvey(false); }}>Validate</button>
                    <button onClick={() => setIsCreatingSurvey(false)}>Cancel</button>
                </div>
            )}
        </div >
    );
}

export default AuthCheck(ContentManager);