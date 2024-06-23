import React, { useEffect, useState } from 'react';
import { Option } from '../pages/contentManager';
import '../styles/vote.css';

interface Vote {
    id?: number;
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    votingType?: 'one-round' | 'two-round';
    ongoingRound?: 'first-round' | 'second-round';
    votingMethod?: 'majority rule' | 'absolute majority';
    status?: 'open' | 'closed';
    createdBy?: number;
    options?: Option[];
}


interface VoteProps {
    vote: Vote;
}

const Vote: React.FC<VoteProps> = ({ vote }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedVote, setUpdatedVote] = useState(vote);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [options, setOptions] = useState<Option[]>(vote.options || []);
    const [isEditingOptions, setIsEditingOptions] = useState(false);
    const [updatedOptions, setUpdatedOptions] = useState(options);
    const [messageOption, setMessageOption] = useState('');
    const [isErrorOption, setIsErrorOption] = useState(false);
    const [showConfirmOption, setShowConfirmOption] = useState(false);
    const [optionsLab, setOptionsLab] = useState('');


    useEffect(() => {
        fetch(`http://localhost:8088/options/${vote.id}`)
            .then(response => response.json())
            .then(data => {
                setOptions(data);
                setUpdatedOptions(data);
            })
            .catch(error => console.error('Error fetching votes:', error));
    }, [vote.id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:8088/votes/${vote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedVote),
            });

            if (!response.ok) {
                throw new Error('Erreur avec votre demande');
            }

            setIsEditing(false);
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const handleUpdateOptions = async (optionId: any, newLabel: any) => {
        if (optionId === undefined) {
            console.error('Option ID is undefined');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8088/options/${optionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ label: newLabel }),
            });

            if (!response.ok) {
                throw new Error('Erreur avec votre demande');
            }

            setOptions(prevOptions =>
                prevOptions.map(option =>
                    option.id === optionId ? { ...option, label: newLabel } : option
                )
            );

            console.log("Option updated successfully");
        } catch (error) {
            console.error('Failed to update option:', error);
        }
    };



    const handleDeleteOptions = async (optionId: number | undefined) => {
        if (optionId === undefined) {
            console.error('Option ID is undefined');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8088/options/${optionId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur avec votre demande');
            }

            setMessageOption('Option supprimée !');
            setIsErrorOption(false);
            setShowConfirmOption(false);
            setOptions(prevOptions => prevOptions.filter(option => option.id !== optionId));
        } catch (error) {
            console.error('Failed to delete option:', error);
            setMessageOption('Suppression a échoué : ' + error);
            setIsErrorOption(true);
            setShowConfirmOption(false);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8088/votes/${vote.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur avec votre demande');
            } else {
                setMessage('Vote supprimé !');
                setIsError(false);
                setShowConfirm(false);
            }

        } catch (error) {
            setMessage('Suppression a échoué : ' + error);
            setIsError(true);
            setShowConfirm(false);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartDate = new Date(e.target.value);
        const newEndDate = new Date(e.target.value);
        if (!isNaN(newStartDate.getTime())) {
            setUpdatedVote({ ...updatedVote, startDate: newStartDate });
            setUpdatedVote({ ...updatedVote, endDate: newEndDate });
        } else {
            console.error('Invalid date format:', e.target.value);
        }
    };

    const handleOptionChange = (id: any, newValue: any) => {
        setOptions(prevOptions =>
            prevOptions.map(option =>
                option.id === id ? { ...option, label: newValue } : option
            )
        );
    };


    if (isEditing) {
        return (
            <div className='vote-update-box'>
                Titre<input value={updatedVote.title} onChange={e => setUpdatedVote({ ...updatedVote, title: e.target.value })} required />
                Description<input value={updatedVote.description} onChange={e => setUpdatedVote({ ...updatedVote, description: e.target.value })} />
                Date Début (JJ/MM/AAA HH/MM)<input
                    type='datetime-local'
                    value={updatedVote.startDate instanceof Date ? updatedVote.startDate.toISOString().substring(0, 16) : ''}
                    onChange={handleDateChange}
                    required />
                Date Fin (JJ/MM/AAA HH/MM)<input
                    type='datetime-local'
                    value={updatedVote.endDate instanceof Date ? updatedVote.endDate.toISOString().substring(0, 16) : ''}
                    onChange={handleDateChange}
                    required />
                Nb Tours
                <select value={updatedVote.votingType} onChange={e => setUpdatedVote({ ...updatedVote, votingType: e.target.value as 'one-round' | 'two-round' })} required>
                    <option value="one-round">One Round</option>
                    <option value="two-round">Two Round</option>
                </select >
                Tour Actuelle
                <select value={updatedVote.ongoingRound} onChange={e => setUpdatedVote({ ...updatedVote, ongoingRound: e.target.value as 'first-round' | 'second-round' })} required>
                    <option value="first-round">First Round</option>
                    <option value="second-round">Second Round</option>
                </select>
                Décision
                <select value={updatedVote.votingMethod} onChange={e => setUpdatedVote({ ...updatedVote, votingMethod: e.target.value as 'majority rule' | 'absolute majority' })} required>
                    <option value="majority rule">Majority Rule</option>
                    <option value="absolute majority">Absolute Majority</option>
                </select>
                Status<select value={updatedVote.status} onChange={e => setUpdatedVote({ ...updatedVote, status: e.target.value as 'open' | 'closed' })} required>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                </select>
                <button className='updateValidate' onClick={handleUpdate}>Validate</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    if (isEditingOptions) {
        return (
            <div className='vote-update-box'>
                <h2>Options de vote "{vote.title}"</h2>
                <ul>
                    {options.map((option) => (
                        <li className='vote-options' key={option.id}>
                            <input
                                value={option.label}
                                onChange={e => handleOptionChange(option.id, e.target.value)}
                            />
                            <button
                                className='saveOptionButton'
                                onClick={() => handleUpdateOptions(option.id, option.label)}
                            >
                                Enregistrer
                            </button>
                            <button
                                className='saveOptionButton'
                                onClick={() => {
                                    setShowConfirmOption(true);
                                    setOptionsLab(option.label ?? '');
                                }}
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                    {showConfirmOption && (
                        <div>
                            <p>Etes vous sur de supprimer l'option "{optionsLab}" ?</p>
                            <button onClick={() => handleDeleteOptions(options.find(opt => opt.label === optionsLab)?.id)}>Oui</button>
                            <button onClick={() => setShowConfirmOption(false)}>Non</button>
                        </div>
                    )}

                </ul>
                <button onClick={() => setIsEditingOptions(false)}>Ok</button>
            </div>
        );
    }





    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        const formattedTime = date.toISOString().split('T')[1].substring(0, 5);
        return `${formattedDate} ${formattedTime}`;
    };

    const formattedStartDate = formatDate(vote.startDate);
    const formattedEndDate = formatDate(vote.endDate);

    return (
        <div className='vote-box'>
            <h2>Titre : {vote.title}</h2>
            <p>Description : {vote.description}</p>
            <p>Date Début : {formattedStartDate}</p>
            <p>Date Fin : {formattedEndDate}</p>
            <p>Nb Tours : {vote.votingType}</p>
            <p>Tour Actuelle : {vote.ongoingRound}</p>
            <p>Décision : {vote.votingMethod}</p>
            <p>Status : {vote.status}</p>
            {options && options.length > 0 && (
                <ul>Options :
                    {options.map((option) => (
                        <li className='vote-options' key={option.id}>{option.label}</li>
                    ))}
                </ul>
            )}
            <button onClick={() => setIsEditing(true)}>Update Vote</button>
            <button onClick={() => setIsEditingOptions(true)}>Update Options</button>
            <button onClick={() => setShowConfirm(true)}>Delete</button>
            {showConfirm && (
                <div>
                    <p>Etes vous sur de supprimer le vote "{vote.title}" ?</p>
                    <button onClick={handleDelete}>Oui</button>
                    <button onClick={() => setShowConfirm(false)}>Non</button>
                </div>
            )}
            {message && (
                <div style={{ color: isError ? 'red' : 'green' }}>
                    {message}
                </div>
            )}
        </div >
    );
}

export default Vote;