import Vote from "../components/Vote";
import Event from "../components/Event";


export const createVote = (votes: Vote[], newVote: Vote) => {
    return [...votes, newVote];
};

export const updateVote = (votes: Vote[], updatedVote: Vote, index: number) => {
    if (index < 0 || index >= votes.length) {
        console.error("Index out of bounds in updateVote");
        return votes;
    }
    const newVotes = [...votes];
    newVotes[index] = updatedVote;
    return newVotes;
};

export const deleteVote = (votes: Vote[], index: number) => {
    if (index < 0 || index >= votes.length) {
        console.error("Index out of bounds in deleteVote");
        return votes;
    }
    return votes.filter((_, i) => i !== index);
};

export const createEvent = (prevEvents: any, newEventData: any) => {
    const newEvent = {
        ...newEventData,
        location: '',
        availableSpots: 100,
        membersOnly: false,
        participations: 0,
        participants: [],
        quota: 10,
    };

    return [...prevEvents, newEvent];
};

export const updateEvent = (events: Event[], updatedEvent: Event, index: number) => {
    if (index < 0 || index >= events.length) {
        console.error("Index out of bounds in updateEvent");
        return events;
    }
    return events.map((event, i) => i === index ? updatedEvent : event);
};

export const deleteEvent = (events: Event[], index: number) => {
    if (index < 0 || index >= events.length) {
        console.error("Index out of bounds in deleteEvent");
        return events;
    }
    return events.filter((_, i) => i !== index);
};