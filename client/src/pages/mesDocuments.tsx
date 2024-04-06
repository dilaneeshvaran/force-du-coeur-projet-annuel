import '../styles/mesDocuments.css';
import { useState } from 'react';

interface Document {
    id: number;
    title: string;
    content?: string;
    file?: File;
    isArchived: boolean;
}

function MesDocuments() {
    //const [documents, setDocuments] = useState<Document[]>([]);
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: 1,
            title: 'deroulement de l evenement',
            content: 'bla bla',
            isArchived: false,
            file: new File(["content"], "sample.txt"),
        },
        {
            id: 1,
            title: 'planning event',
            content: 'test archive',
            isArchived: true,
            file: new File(["content"], "sample.txt"),
        }
    ]);


    const deleteDocument = (id: number) => {
        setDocuments(documents.filter(document => document.id !== id));
    };

    const archiveDocument = (id: number) => {
        setDocuments(documents.map(document => document.id === id ? { ...document, isArchived: true } : document));
    };

    const unarchiveDocument = (id: number) => {
        setDocuments(documents.map(document => document.id === id ? { ...document, isArchived: false } : document));
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
                {(selectedLink === 'received' ? getNonArchivedDocuments() : getArchivedDocuments()).map((document) => (
                    <div key={document.id}>
                        <h2>{document.title}</h2>
                        <p>{document.content}</p>
                        {document.file && (
                            <a href={URL.createObjectURL(document.file)} download={document.file.name}>
                                Download {document.file.name}
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MesDocuments;