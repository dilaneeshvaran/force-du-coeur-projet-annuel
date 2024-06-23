import React from 'react';
import { Option } from '../pages/contentManager';

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
    return (
        <div>
            <h2>{vote.title}</h2>
            <p>{vote.description}</p>
            <button >Update</button>
            <button >Delete Vote</button>
        </div >
    );
}

export default Vote;