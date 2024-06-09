import '../styles/mesDocuments.css';
import { useEffect, useState } from 'react';

interface Document {
    id: number;
    title: string;
    description?: string;
    file?: string;
    isArchieved: boolean;
    senderId: number;
    receiverId: number;
}

function MesDocuments() {
    const [documents, setDocuments] = useState<Document[]>([]);

    useEffect(() => {
        const userId = Number(localStorage.getItem('userId'));
        console.log("userId", userId)
        fetch(`http://localhost:8088/documents/by-user/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setDocuments(data);
            })
            .catch(error => {
                console.error('Failed to fetch documents:', error);
            });
    }, []);

    const archiveDocument = (documentId: number) => {
        fetch(`http://localhost:8088/documents/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isArchieved: true }),
        })
            .then(response => response.json())
            .then(() => {
                setDocuments(currentDocuments => currentDocuments.map(document => documentId === documentId ? { ...document, isArchieved: true } : document));
            });
        console.log(":::::::::docId", documentId);
    };

    const unarchiveDocument = (documentId: number) => {
        fetch(`http://localhost:8088/documents/${documentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isArchieved: 0 }),
        })
            .then(response => response.json())
            .then(() => {
                setDocuments(documents.map(document => document.id === documentId ? { ...document, isArchieved: false } : document));
            });
    };

    const getArchivedDocuments = () => {
        return documents.filter(document => document.isArchieved);
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
                            documents.filter(document => !document.isArchieved).length === 0 ? <p>No documents</p> : <div>
                                {
                                    documents.filter(document => !document.isArchieved).map(document => (
                                        <div key={document.id}>
                                            <h2>{document.title}</h2>
                                            <p>{document.description}</p>
                                            <input type="checkbox" checked={document.isArchieved} onChange={() => document.isArchieved ? unarchiveDocument(document.id) : archiveDocument(document.id)} /> Archive
                                        </div>
                                    ))
                                }
                            </div>
                        }
                    </div>
                )}
                {(selectedLink === 'archived' &&
                    <div>
                        {
                            documents.filter(document => document.isArchieved).length === 0 ? <p>No archived documents</p> : <div>
                                {
                                    documents.filter(document => document.isArchieved).map(document => (
                                        <div key={document.id}>
                                            <h2>{document.title}</h2>
                                            <p>{document.description}</p>
                                            <input type="checkbox" checked={document.isArchieved} onChange={() => document.isArchieved ? unarchiveDocument(document.id) : archiveDocument(document.id)} /> Unarchive
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