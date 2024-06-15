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
    const userId = 1;
    const [userVote, setUserVote] = useState<Option | null>(null);

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

    const handleVote = () => {
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
                })
                .catch(error => console.error('Error:', error));
        }
    };

    if (!vote) {
        return <div>Loading...</div>;
    }

    return (
        <div className="votebox">
            <div className="votebox-header">
                <h2>{vote.title} - {vote.status === 'open' ? 'Voting' : 'Closed'}</h2>
            </div>
            <div className="votebox-details">
                <p>Description: {vote.description}</p>
                <p>Start Date: {new Date(vote.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(vote.endDate).toLocaleDateString()}</p>
                <p>Voting Type: {vote.votingType}</p>
                <p>Ongoing Round: {vote.ongoingRound}</p>
                <p>Voting Method: {vote.votingMethod}</p>
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
                        <button type="button" onClick={handleVote}>Vote</button>
                    </form>
                ) : (
                    <ul>
                        {options.map((option, index) => (
                            <li key={index}>{option.label}</li>
                        ))}
                    </ul>
                )}
            </div>
            {vote.status === 'closed' && (
                <div className="votebox-result">
                    <h3>Result</h3>
                    <p>{vote.result}</p>
                </div>
            )}
        </div>
    );
};

export default VoteBox;