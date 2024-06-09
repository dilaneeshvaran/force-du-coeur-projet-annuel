import React, { useState } from 'react';
import '../styles/votebox.css';

interface Vote {
    options: string[];
    result: string;
    status: 'open' | 'closed';
    startDate: Date;
    endDate: Date;
}

interface VoteBoxProps {
    vote: Vote;
    optionsData: any[];
}

const VoteBox: React.FC<VoteBoxProps> = ({ vote, optionsData }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleVote = () => {
        // handle vote with api call
        console.log(`You voted for ${selectedOption}`);
    };

    if (!vote) {
        return <div>Loading...</div>;
    }

    return (
        <div className="votebox">
            <h2>{vote.status === 'open' ? 'Voting' : 'closed'}</h2>
            <p>Start Date: {new Date(vote.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(vote.endDate).toLocaleDateString()}</p>
            <h3>Options</h3>
            {vote.status === 'open' ? (
                <form className='voting-options'>
                    {optionsData.map((option, index) => (
                        <div key={index}>
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="vote"
                                value={option}
                                onChange={e => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor={`option-${index}`}>{option}</label>
                        </div>
                    ))}
                    <button type="button" onClick={handleVote}>Vote</button>
                </form>
            ) : (
                <ul>
                    {optionsData.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
            )}
            {vote.status === 'closed' && (
                <>
                    <h3>Result</h3>
                    <p>{vote.result}</p>
                </>
            )}
        </div>
    );
};

export default VoteBox;