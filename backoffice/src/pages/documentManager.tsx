import React, { useState, useEffect } from 'react';
import '../styles/document.css';

interface Document {
    id: number;
    title: string;
    description: string;
    file: string;
    isArchieved: boolean;
    senderId: number;
    receiverId: number | null;
}

interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

const DocumentManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('Send');
    const [sentDocuments, setSentDocuments] = useState<Document[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [receiverId, setReceiverId] = useState<number | null | string>(null);
    const [description, setDescription] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);

    useEffect(() => {
        if (activeTab === 'Send') {
            fetch('http://localhost:8088/users')
                .then(response => response.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(error => console.error('erreur fetch users!', error));
        }
    }, [activeTab]);

    useEffect(() => {
        if (activeTab === 'Sent') {
            fetch('http://localhost:8088/documents')
                .then(response => response.json())
                .then(data => {
                    setSentDocuments(data);
                })
                .catch(error => console.error('erreur fetch docs!', error));
        }
    }, [activeTab]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const uploadDocument = (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('title', title);
            formData.append('description', description);

            const receiverIdValue = receiverId === "EVERYBODY" ? "" : receiverId?.toString() || "";
            if (receiverId && receiverId !== "EVERYBODY") {
                formData.append('receiverId', receiverIdValue);
            }

            const userId = localStorage.getItem('userId');
            if (userId) {
                formData.append('senderId', userId);
            }

            fetch('http://localhost:8088/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (response.ok) {
                        setMessage('Document envoyé avec succès');
                        setShowMessage(true);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 5000);
                        setSelectedFile(null);
                        setTitle('');
                        setDescription('');
                        setReceiverId(null);
                    } else {
                        setMessage('Echec de l\'envoi du document');
                        setShowMessage(true);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 5000);
                        console.error('Upload failed');
                    }
                })
                .catch(error => console.error('Erreur upload doc:', error));
        }
    };

    const downloadDocument = (file: string) => {
        window.open(`http://localhost:8088/${file}`);
    };

    const getReceiverDetails = (receiverId: number | null) => {
        if (receiverId === null) {
            return 'Tout le monde';
        }
        const user = users.find(user => user.id === receiverId);
        return user ? `${user.firstname} ${user.lastname} - ${user.email}` : 'Unknown';
    };

    return (
        <div className='container-doc'>
            <div className='btns-doc'>
                <button onClick={() => setActiveTab('Send')} style={{ backgroundColor: activeTab === "Send" ? 'gray' : '#007bff' }}>Envoyer</button>
                <button onClick={() => setActiveTab('Sent')} style={{ backgroundColor: activeTab === "Sent" ? 'gray' : '#007bff' }}>Envoyé</button>
            </div>

            {activeTab === 'Send' && (
                <form className='doc-form' onSubmit={uploadDocument}>
                    <label>Titre: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required /></label>
                    <label>Description: <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required /></label>
                    <label>Récipient:
                        <select value={receiverId ?? ''} onChange={(e) => setReceiverId(e.target.value === "EVERYBODY" ? "EVERYBODY" : e.target.value)} required>
                            <option value="">Récipient(s)</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.firstname} {user.lastname} - {user.email}</option>
                            ))}
                            <option value="EVERYBODY">Tous les Membres</option>
                        </select>
                    </label>
                    <input type="file" onChange={handleFileChange} required />
                    <button className='docSumbit' type="submit">Envoyer le Document</button>
                </form>
            )}
            {showMessage && <div>{message}</div>}


            {activeTab === 'Sent' && (
                <div className='sent-docs'>
                    <ul>
                        {sentDocuments.map(doc => (
                            <li key={doc.id}>
                                Document : {doc.title} - {doc.description}
                                <br />
                                <strong>Envoyé à : </strong>{getReceiverDetails(doc.receiverId)}
                                <button className='docDownload' onClick={() => downloadDocument(doc.file)}>Télécharger</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DocumentManager;
