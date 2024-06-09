import '../styles/mesDocuments.css';
import { useEffect, useState } from 'react';

interface Document {
    documentId: number;
    title: string;
    description?: string;
    file?: string;
    isArchived: boolean;
    senderId: number;
    receiverId: number;
}

function MesDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        fetch('http://localhost:8088/documents')
            .then(response => response.json())
            .then(data => {
                setDocuments(data)
            });
    }, []);

    const archiveDocument = (documentId: number) => {
        fetch(`http://localhost:8088/documents/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isArchived: 1 }),
        })
            .then(response => response.json())
            .then(() => {
                setDocuments(currentDocuments => currentDocuments.map(document => document.documentId === documentId ? { ...document, isArchived: true } : document));
            });
    };

    const unarchiveDocument = (documentId: number) => {
        fetch(`http://localhost:8088/documents/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isArchived: 0 }),
        })
            .then(response => response.json())
            .then(() => {
                setDocuments(documents.map(document => document.documentId === documentId ? { ...document, isArchived: false } : document));
            });
    };

    const getArchivedDocuments = () => {
        return documents.filter(document => document.isArchived);
    };

    const getNonArchivedDocuments = () => {
        return documents.filter(document => !document.isArchived);
    };

    const [selectedLink, setSelectedLink] = useState('received');

    const handleLinkClick = (link: string) => {
        setSelectedLink(link);
    };

    return (
        <div className="ged">
            <div className='nav-ged'>
                <a href='#' className='nav-ged-link' onClick={() => handleLinkClick('received')}>Documents Reçu</a>
                <a href='#' className='nav-ged-link' onClick={() => handleLinkClick('archived')}>Documents Archivés</a>
            </div>
            <div className='doc-list'>
                {(selectedLink === 'received' &&
                    <div>
                        {
                            documents.length === 0 ? <p>No documsents</p> : <div>
                                <h1>{document.title}</h1>
                                {
                                    documents.map(document => (
                                        <div key={document.documentId}>
                                            <h2>{document.title}</h2>
                                            <p>{document.description}</p>
                                            <input type="checkbox" checked={document.isArchived} onChange={() => document.isArchived ? unarchiveDocument(document.documentId) : archiveDocument(document.documentId)} /> Archive
                                        </div>
                                    ))
                                }
                            </div>
                        }

                    </div>
                )}
            </div>
        </div>
    );
}

export default MesDocuments;