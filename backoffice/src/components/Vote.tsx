import React from 'react';

interface Vote {
    title: string;
    description: string;
    options: string[];
    deadline: Date;
}

interface VoteProps {
    vote: Vote;
    onUpdate: (updatedVote: Vote) => void;
    onDelete: () => void;
}

const Vote: React.FC<VoteProps> = ({ vote, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>{vote.title}</h2>
            <p>{vote.description}</p>
            <p>{vote.deadline.toString()}</p>
            <button onClick={() => onUpdate({ ...vote, title: 'Updated title' })}>Update</button>
            <button onClick={onDelete}>Delete Vote</button>
        </div>
    );
}

export default Vote;