import React, { useEffect, useState } from 'react';
import '../styles/votebox.css';

interface Vote {
    id: number;
    title: string;
    description: string;
    options: Option[];
    result: string;
    status: 'open' | 'closed';
    startDate: Date;
    endDate: Date;
    votingType: string;
    ongoingRound: number;
    votingMethod: string;
}

interface VoteBoxProps {
    vote: Vote;
    options: Option[];
}

export interface Option {
    id: number;
    label: string;
    voteId: number;
    votes: number;
}

const VoteBox: React.FC<VoteBoxProps> = ({ vote, options }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [hasVoted, setHasVoted] = useState(false);
    const userId = localStorage.getItem('userId');
    const [userVote, setUserVote] = useState<Option | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [winner, setWinner] = useState<Option | null>(null);

    const handleVote = () => {
        if (selectedOption) {
            setShowConfirm(true);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:8088/votes/${vote.id}/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.hasVoted) {
                    setHasVoted(true);
                    setUserVote(data.vote);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [userId, vote.id]);

    useEffect(() => {
        fetch(`http://localhost:8088/user_votes/${userId}/vote/${vote.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.option) {
                    setSelectedOption(data.option);
                }
            })
            .catch(error => console.error('Error:', error));
    }, [userId, vote.id]);

    useEffect(() => {
        fetch(`http://localhost:8088/user_votes/winner/${vote.id}`)
            .then(response => response.json())
            .then(data => {
                if (data.winnerOptionLabel) {
                    const winnerOption = options.find(option => option.label === data.winnerOptionLabel);
                    setWinner(winnerOption ?? null);
                }
            })
            .catch(error => console.error('Error:', error));
    }
        , [vote.id]);


    const updateOptionVotes = (optionId: string) => {
        fetch(`http://localhost:8088/options/${optionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ votes: 1 }), // increment votes by 1
        })
            .then(response => response.json())
            .then(data => {
                console.log('Votes updated:', data);
            })
            .catch(error => console.error('Error:', error));
    }

    const handleConfirm = () => {
        if (selectedOption) {

            fetch('http://localhost:8088/user_votes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, voteId: selectedOption.voteId, optionId: selectedOption.id }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Vote successful:', data);
                    setHasVoted(true);
                    updateOptionVotes(selectedOption.id.toString());
                    setShowConfirm(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setShowConfirm(false);
                });
        }
    };

    if (!vote) {
        return <div>Chargement...</div>;
    }

    return (
        <div className="votebox">
            <div className="votebox-header">
                <h2>{vote.title} - {vote.status === 'open' ? 'Voting' : 'Closed'}</h2>
            </div>
            <div className="votebox-details">
                <p>Description: {vote.description}</p>
                <p>Date Début: {new Date(vote.startDate).toLocaleDateString()}</p>
                <p>Date Fin: {new Date(vote.endDate).toLocaleDateString()}</p>
                <p>Type: {vote.votingType}</p>
                <p>Tour en cours: {vote.ongoingRound}</p>
                <p>Methode de Vote: {vote.votingMethod}</p>
            </div>
            <div className="votebox-options">
                <h3>Options</h3>
                {vote.status === 'open' && !hasVoted ? (
                    <form className='voting-options'>
                        {options.map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name="vote"
                                    value={option.label}
                                    onChange={e => setSelectedOption(option)}
                                />
                                <label
                                    htmlFor={`option-${index}`}
                                    className={userVote && userVote.id === option.id ? 'chosen-option' : ''}
                                >
                                    {option.label}
                                </label>
                            </div>
                        ))}
                        <button type="button" onClick={handleVote}>Voter</button>
                        {showConfirm && (
                            <div className="confirm-box">
                                <p>Etes vous sur de voter pour {selectedOption?.label}?</p>
                                <button type="button" onClick={handleConfirm}>Oui</button>
                                <button type="button" onClick={() => setShowConfirm(false)}>Non</button>
                            </div>
                        )}
                    </form>
                ) : (
                    <ul>
                        {options.map((option, index) => (
                            <li key={index} className={selectedOption && selectedOption.id === option.id ? 'chosen-option' : ''}>
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {vote.status === 'closed' && (
                <div className="votebox-result">
                    <h3>Résultat</h3>
                    <p>{winner?.label}</p>
                </div>
            )}
        </div>
    );
};

export default VoteBox;