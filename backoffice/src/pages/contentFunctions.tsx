import Survey from "../components/Survey";
import Vote from "../components/Vote";
import Event from "../components/Event";


export const createSurvey = (surveys: Survey[], newSurvey: Survey) => {
    return [...surveys, newSurvey];
};

export const updateSurvey = (surveys: Survey[], updatedSurvey: Survey, index: number) => {
    if (index < 0 || index >= surveys.length) {
        console.error("Index out of bounds in updateSurvey");
        return surveys;
    }
    const newSurveys = [...surveys];
    newSurveys[index] = updatedSurvey;
    return newSurveys;
};

export const deleteSurvey = (surveys: Survey[], index: number) => {
    if (index < 0 || index >= surveys.length) {
        console.error("Index out of bounds in deleteSurvey");
        return surveys;
    }
    return surveys.filter((_, i) => i !== index);
};

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

export const createEvent = (events: Event[], newEvent: Event) => {
    return [...events, newEvent];
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