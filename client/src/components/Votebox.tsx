import React, { useState } from 'react';
import '../styles/votebox.css';
interface Vote {
    options: string[];
    result: string;
    status: 'active' | 'voting ended';
    startDate: Date;
    endDate: Date;
}

interface VoteBoxProps {
    vote: Vote;
}



const VoteBox: React.FC<VoteBoxProps> = ({ vote }) => {
    const [selectedOption, setSelectedOption] = useState('');


    const handleVote = () => {
        // handle vote with api call
        console.log(`You voted for ${selectedOption}`);
    };

    return (
        <div className="votebox">
            <h2>{vote.status === 'active' ? 'Voting' : 'Voting Ended'}</h2>
            <p>Start Date: {vote.startDate.toLocaleDateString()}</p>
            <p>End Date: {vote.endDate.toLocaleDateString()}</p>
            <h3>Options</h3>
            {vote.status === 'active' ? (
                <form className='voting-options'>
                    {vote.options.map((option, index) => (
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
                    {vote.options.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
            )}
            {vote.status === 'voting ended' && (
                <>
                    <h3>Result</h3>
                    <p>{vote.result}</p>
                </>
            )}
        </div>
    );
};

export default VoteBox;