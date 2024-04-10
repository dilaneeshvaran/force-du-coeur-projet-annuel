import '../styles/taches.css';
import { useState } from 'react';

interface Tache {
    id: number;
    name: string;
    description?: string;
    type: 'todo' | 'done';
    assignedDate: Date;
    doneDate?: Date;
}

function MesTaches() {
    const [taches, setTaches] = useState<Tache[]>([
        {
            id: 1,
            name: 'tache 1',
            description: 'description.....',
            type: 'todo',
            assignedDate: new Date(),
        },
        {
            id: 2,
            name: 'tache 2',
            description: 'description....',
            type: 'done',
            assignedDate: new Date(),
            doneDate: new Date(),
        }
    ]);

    const [selectedType, setSelectedType] = useState('todo');

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleCheckboxChange = (id: number) => {
        setTaches(taches.map(tache => tache.id === id ? { ...tache, type: tache.type === 'todo' ? 'done' : 'todo', doneDate: tache.type === 'todo' ? new Date() : undefined } : tache));
    };

    return (
        <div className="taches-box">
            <div className='nav-taches'>
                <a href='#' className='nav-taches-link' onClick={() => handleTypeClick('todo')}>Tâches</a>
                <a href='#' className='nav-taches-link' onClick={() => handleTypeClick('done')}>Tâches fait</a>
            </div>
            <div className='taches-list'>
                {taches.filter(tache => tache.type === selectedType).map((tache) => (
                    <div key={tache.id}>
                        <h2>{tache.name}</h2>
                        <p>{tache.description}</p>
                        <p>Assigned: {tache.assignedDate.toLocaleDateString()}</p>
                        {tache.doneDate && <p>Done: {tache.doneDate.toLocaleDateString()}</p>}
                        <input type="checkbox" checked={tache.type === 'done'} onChange={() => handleCheckboxChange(tache.id)} /> Done
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MesTaches;