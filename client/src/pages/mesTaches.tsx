import '../styles/taches.css';
import { useState } from 'react';

interface Tache {
    id: number;
    name: string;
    description?: string;
    type: 'todo' | 'done';
}

function MesTaches() {
    const [taches, setTaches] = useState<Tache[]>([
        {
            id: 1,
            name: 'reunion',
            description: 'description ici.....',
            type: 'todo',
        },
        {
            id: 2,
            name: 'changement de lieu de reunion',
            description: 'description....',
            type: 'done',
        }
    ]);

    const [selectedType, setSelectedType] = useState('todo');

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MesTaches;