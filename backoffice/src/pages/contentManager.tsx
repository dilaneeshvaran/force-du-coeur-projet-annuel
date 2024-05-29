import React, { useState } from 'react';
import "../styles/content.css"
import Event from '../components/Event';
import Vote from '../components/Vote';
import Survey from '../components/Survey';
import { createEvent, updateEvent, deleteEvent, createVote, updateVote, deleteVote, createSurvey, updateSurvey, deleteSurvey } from './contentFunctions';

function ContentManager() {

    const [events, setEvents] = useState<Event[]>([
        { date: new Date(), place: 'Place 1', description: 'Event 1', images: ['image1.jpg'] },
        { date: new Date(), place: 'Place 2', description: 'Event 2', images: ['image2.jpg'] },
    ]);
    const [votes, setVotes] = useState<Vote[]>([
        { title: 'Vote 1', description: 'Description 1', options: ['Option 1', 'Option 2'], deadline: new Date() },
        { title: 'Vote 2', description: 'Description 2', options: ['Option 3', 'Option 4'], deadline: new Date() },
    ]);
    const [surveys, setSurveys] = useState<Survey[]>([
        { title: 'Survey 1', description: 'Description 1', deadline: new Date() },
        { title: 'Survey 2', description: 'Description 2', deadline: new Date() },
    ]);

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
            <button onClick={() => setEvents(prevEvents => createEvent(prevEvents, { date: new Date(), place: 'New Place', description: 'New Event', images: ['newImage.jpg'] }))}>Create Event</button>
            <button onClick={() => setVotes(prevVotes => createVote(prevVotes, { title: 'New Vote', description: 'New Description', options: ['New Option 1', 'New Option 2'], deadline: new Date() }))}>Create Vote</button>
            <button onClick={() => setSurveys(prevSurveys => createSurvey(prevSurveys, { title: 'New Survey', description: 'New Description', deadline: new Date() }))}>Create Survey</button>
        </div >
    );
}

export default ContentManager;