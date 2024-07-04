import React, { useEffect, useState } from 'react';
import "../styles/content.css";
import Event from '../components/Event';
import Vote from '../components/Vote';
import AuthCheck from '../components/AuthCheck';

export interface Option {
    id?: number;
    label?: string;
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
        updatedOptions[index] = { ...updatedOptions[index], label: value };
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
            setConfirmationMessage('mauvais informations !');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);
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
                    setConfirmationMessage('échec de création !');
                    setShowConfirmation(true);
                    setTimeout(() => setShowConfirmation(false), 5000);
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
                setConfirmationMessage('échec de création !');
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 5000);
                console.error('Error:', error);
            });
    }

    async function createVote() {
        //check for min options
        if (newOptions.length < 2) {
            setConfirmationMessage('Il faut ajouter minimum 2 options !');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 5000);
            return;
        }
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
                setConfirmationMessage('il manque des informations ou les infos saisi sont incorrectes !');
                setShowConfirmation(true);
                setTimeout(() => setShowConfirmation(false), 5000);
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
                    body: JSON.stringify({ label: option.label, voteId }),
                });

                if (!optionResponse.ok) {
                    setConfirmationMessage('Création des options échoué !');
                    setShowConfirmation(true);
                    setTimeout(() => setShowConfirmation(false), 5000);
                    throw new Error('Network response was not ok');
                }

                const optionData = await optionResponse.json();
                console.log('Option creation success:', optionData);
            }

            setIsCreatingVote(false);
            setConfirmationMessage('Votes et Options ajoutées, rafrâichir la page pour les afficher!');
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
                <button onClick={() => { { } setIsCreatingEvent(true), setIsCreatingVote(false) }} style={{ backgroundColor: isCreatingEvent === true ? 'green' : 'gray' }}>Créer un Event</button>
                <button onClick={() => { { } setIsCreatingVote(true), setIsCreatingEvent(false) }} style={{ backgroundColor: isCreatingVote === true ? 'green' : 'gray' }}>Créer un Vote</button>

                {isCreatingEvent && (
                    <div className='creation-form'>
                        <label>Titre</label>
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
                {isCreatingVote && (
                    <div className='creation-form'>
                        Titre<input value={newVote.title} onChange={e => setNewVote({ ...newVote, title: e.target.value })} />
                        <br />Description<input value={newVote.description} onChange={e => setNewVote({ ...newVote, description: e.target.value })} />
                        <br />Date Début<input type="date" onChange={e => setNewVote({ ...newVote, startDate: new Date(e.target.value) })} />
                        <br />Date Fin<input type="date" onChange={e => setNewVote({ ...newVote, endDate: new Date(e.target.value) })} />
                        <br />Nb de Tours<select value={newVote.votingType} onChange={e => setNewVote({ ...newVote, votingType: e.target.value as 'one-round' | 'two-round' })}>
                            <option value="one-round">1 Tour</option>
                            <option value="two-round">2 Tours</option>
                        </select>
                        <br />Décision<select value={newVote.votingMethod} onChange={e => setNewVote({ ...newVote, votingMethod: e.target.value as 'majority rule' | 'absolute majority' })}>
                            <option value="majority rule">principe de la majorité</option>
                            <option value="absolute majority">Majorité absolue</option>
                        </select>
                        {newOptions.map((option, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                Option {index + 1}
                                <input
                                    style={{ marginLeft: '10px', marginRight: '10px' }}
                                    value={option.label || ''}
                                    onChange={e => handleOptionChange(index, e.target.value)}
                                />
                                <button className='dlt-options' onClick={() => handleRemoveOption(index)}>Supprimer Option</button>
                            </div>
                        ))}
                        <button className='add-options' onClick={() => setNewOptions([...newOptions, { label: '' }])}>Ajouter Option</button>
                        <button onClick={createVote} style={{ backgroundColor: isCreatingVote === true ? 'green' : 'gray' }}>Valider</button>
                        <button onClick={() => setIsCreatingVote(false)}>Annuler</button>
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
                        Evenements
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
