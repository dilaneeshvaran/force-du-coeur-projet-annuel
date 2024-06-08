import React from 'react';


interface Survey {
    title: string;
    description: string;
    deadline: Date;
}

interface SurveyProps {
    survey: Survey;
    onUpdate: (updatedSurvey: Survey) => void;
    onDelete: () => void;

}

const Survey: React.FC<SurveyProps> = ({ survey, onUpdate, onDelete }) => {
    return (
        <div>
            <h2>{survey.title}</h2>
            <p>{survey.description}</p>
            <p>{survey.deadline.toString()}</p>
            <button onClick={() => onUpdate({ ...survey, title: 'Updated title' })}>Update</button>
            <button onClick={onDelete}>Delete Survey</button>
        </div>
    );
}

export default Survey;