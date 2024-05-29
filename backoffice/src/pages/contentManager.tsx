import React, { useState } from 'react';

interface Event {
    date: Date;
    place: string;
    description: string;
    images: string[];
}

interface EventComponentProps {
    event: Event;
    onUpdate: (updatedEvent: Event) => void;
}

interface Vote {
    title: string;
    description: string;
    options: string[];
    deadline: Date;
}

interface VoteComponentProps {
    vote: Vote;
    onUpdate: (updatedVote: Vote) => void;
}

interface Survey {
    title: string;
    description: string;
    deadline: Date;
}

interface SurveyComponentProps {
    survey: Survey;
    onUpdate: (updatedSurvey: Survey) => void;
}

function EventComponent({ event, onUpdate }: EventComponentProps) {
    return (
        <div>
            <h2>{event.description}</h2>
            <p>{event.place}</p>
            <p>{event.date.toString()}</p>
            <button onClick={() => onUpdate({ ...event, description: 'Updated description' })}>Update</button>
        </div>
    );
}


function VoteComponent({ vote, onUpdate }: VoteComponentProps) {
    return (
        <div>
            <h2>{vote.title}</h2>
            <p>{vote.description}</p>
            <p>{vote.deadline.toString()}</p>
            <button onClick={() => onUpdate({ ...vote, title: 'Updated title' })}>Update</button>
        </div>
    );
}

function SurveyComponent({ survey, onUpdate }: SurveyComponentProps) {
    return (
        <div>
            <h2>{survey.title}</h2>
            <p>{survey.description}</p>
            <p>{survey.deadline.toString()}</p>
            <button onClick={() => onUpdate({ ...survey, title: 'Updated title' })}>Update</button>
        </div>
    );
}

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
        <div>
            <div style={{ backgroundColor: 'red', display: 'flex' }}>
                <div style={{ marginRight: '20px' }}>
                    <button onClick={() => setSelectedOption('events')}>Events</button>
                    <button onClick={() => setSelectedOption('votes')}>Votes</button>
                    <button onClick={() => setSelectedOption('surveys')}>Surveys</button>
                </div>
                <div>
                    {selectedOption === 'events' && events.map((event, index) => (
                        <EventComponent key={index} event={event} onUpdate={updatedEvent => {
                            const newEvents = [...events];
                            newEvents[index] = updatedEvent;
                            setEvents(newEvents);
                        }} />
                    ))}
                    {selectedOption === 'votes' && votes.map((vote, index) => (
                        <VoteComponent key={index} vote={vote} onUpdate={updatedVote => {
                            const newVotes = [...votes];
                            newVotes[index] = updatedVote;
                            setVotes(newVotes);
                        }} />
                    ))}
                    {selectedOption === 'surveys' && surveys.map((survey, index) => (
                        <SurveyComponent key={index} survey={survey} onUpdate={updatedSurvey => {
                            const newSurveys = [...surveys];
                            newSurveys[index] = updatedSurvey;
                            setSurveys(newSurveys);
                        }} />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default ContentManager;