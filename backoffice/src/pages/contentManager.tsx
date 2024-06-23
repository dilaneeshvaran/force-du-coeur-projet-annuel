import React, { useEffect, useState } from 'react';
import "../styles/content.css";
import Event from '../components/Event';
import Vote from '../components/Vote';
import AuthCheck from '../components/AuthCheck';

export interface Option {
    id?: number;
    option?: string;
    voteId?: number;
    votes?: number;
}


function ContentManager() {
    const [events, setEvents] = useState<Event[]>([]);
    const [votes, setVotes] = useState<Vote[]>([]);
    const [isCreatingEvent, setIsCreatingEvent] = useState(false);
    const userId = localStorage.getItem('userId');
    const [newOptions, setNewOptions] = useState<Option[]>([]);

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
    const [newVote, setNewVote] = useState<Vote>({
        title: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
        votingType: 'one-round',
        ongoingRound: 'first-round',
        votingMethod: 'majority rule',
        status: 'open',
        createdBy: parseInt(userId || '0', 10)
    });

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

    //fetch data
    useEffect(() => {
        fetch('http://localhost:8088/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8088/votes')
            .then(response => response.json())
            .then(data => setVotes(data))
            .catch(error => console.error('Error fetching votes:', error));
    }, []);

    //validate the inputs for event creation
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

    const handleOptionChange = (index: number, value: string) => {
        const updatedOptions = [...newOptions];
        updatedOptions[index] = { ...updatedOptions[index], option: value };
        setNewOptions(updatedOptions);
    };
    const handleRemoveOption = (indexToRemove: number) => {
        setNewOptions(newOptions.filter((_, index) => index !== indexToRemove));
    };

    //form submission for event creation
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

    async function createVote() {
        try {
            //vote creation
            const voteResponse = await fetch('http://localhost:8088/votes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newVote),
            });

            if (!voteResponse.ok) {
                throw new Error('Network response was not ok');
            }

            const voteData = await voteResponse.json();
            console.log('Vote creation success:', voteData);

            const voteId = voteData.id;

            //create the options one by one for the vote
            for (const option of newOptions) {
                const optionResponse = await fetch('http://localhost:8088/options', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ label: option.option, voteId }),
                });

                if (!optionResponse.ok) {
                    throw new Error('Network response was not ok');
                }

                const optionData = await optionResponse.json();
                console.log('Option creation success:', optionData);
            }

            setIsCreatingVote(false);
            setConfirmationMessage('Vote and options created, refresh the page to display!');
            setNewOptions([]);
            setNewVote({
                title: '',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                votingType: 'one-round',
                ongoingRound: 'first-round',
                votingMethod: 'majority rule',
                status: 'open',
                createdBy: parseInt(userId || '0', 10)
            });
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    //date and time validation
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
                        <br />Start Date<input type="date" onChange={e => setNewVote({ ...newVote, startDate: new Date(e.target.value) })} />
                        <br />End Date<input type="date" onChange={e => setNewVote({ ...newVote, endDate: new Date(e.target.value) })} />
                        <br />Voting Type<select value={newVote.votingType} onChange={e => setNewVote({ ...newVote, votingType: e.target.value as 'one-round' | 'two-round' })}>
                            <option value="one-round">One Round</option>
                            <option value="two-round">Two Round</option>
                        </select>
                        <br />Ongoing Round<select value={newVote.ongoingRound} onChange={e => setNewVote({ ...newVote, ongoingRound: e.target.value as 'first-round' | 'second-round' })}>
                            <option value="first-round">First Round</option>
                            <option value="second-round">Second Round</option>
                        </select>
                        <br />Voting Method<select value={newVote.votingMethod} onChange={e => setNewVote({ ...newVote, votingMethod: e.target.value as 'majority rule' | 'absolute majority' })}>
                            <option value="majority rule">Majority Rule</option>
                            <option value="absolute majority">Absolute Majority</option>
                        </select>
                        <br />Status<select value={newVote.status} onChange={e => setNewVote({ ...newVote, status: e.target.value as 'open' | 'closed' })}>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>

                        {newOptions.map((option, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                Option {index + 1}
                                <input
                                    style={{ marginLeft: '10px', marginRight: '10px' }}
                                    value={option.option || ''}
                                    onChange={e => handleOptionChange(index, e.target.value)}
                                />
                                <button onClick={() => handleRemoveOption(index)}>Remove Option</button>
                            </div>
                        ))}
                        <button onClick={() => setNewOptions([...newOptions, { option: '' }])}>Add Option</button>
                        <button onClick={createVote}>Validate</button>
                        <button onClick={() => setIsCreatingVote(false)}>Cancel</button>
                    </div>
                )}


            </div>
            {
                showConfirmation && (
                    <div className="confirmation-message">
                        {confirmationMessage}
                    </div>
                )
            }
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
                        />
                    ))}
                    {selectedOption === 'votes' && votes.map((vote, index) => (
                        <Vote
                            key={index}
                            vote={vote}
                        />
                    ))}
                </div>
            </div>
        </div >
    );
}

export default AuthCheck(ContentManager);
