import '../styles/messages.css';
import { useState } from 'react';

interface Message {
    id: number;
    subject: string;
    message?: string;
    type: 'sent' | 'received';
    fileAttachment?: string;
}

function Messages() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            subject: 'reunion',
            message: 'messages ici.....',
            type: 'received',
        },
        {
            id: 2,
            subject: 'changement de lieu de reunion',
            message: 'messages....',
            type: 'sent',
        }
    ]);

    const [selectedLink, setSelectedLink] = useState('received');

    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleLinkClick = (link: string) => {
        setSelectedLink(link);

    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('receiver', receiver);
        formData.append('subject', subject);
        formData.append('body', body);
        if (file) {
            formData.append('file', file);
        }

        // send formData to API
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };

    return (
        <div className="message-box">
            <div className='nav-message'>
                <a href='#' className='nav-message-link' onClick={() => handleLinkClick('send')}>Envoyer</a>
                <a href='#' className='nav-message-link' onClick={() => handleLinkClick('received')}>Reçu</a>
                <a href='#' className='nav-message-link' onClick={() => handleLinkClick('sent')}>Envoyés</a>
            </div>
            {selectedLink !== 'send' && (
                <div className='message-list'>
                    {messages.filter(message => message.type === selectedLink).map((message) => (
                        <div key={message.id}>
                            <h2>{message.subject}</h2>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
            )}
            {selectedLink === 'send' && (
                <form onSubmit={handleSubmit} className="message-list">
                    <label>
                        Receiver:
                        <input type="email" value={receiver} onChange={e => setReceiver(e.target.value)} />
                    </label>
                    <label>
                        Subject:
                        <input type="text" value={subject} onChange={e => setSubject(e.target.value)} />
                    </label>
                    <label>
                        Body:
                        <textarea value={body} onChange={e => setBody(e.target.value)} />
                    </label>
                    <label>
                        Attach file:
                        <input type="file" onChange={handleFileChange} />
                    </label>
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
}

export default Messages;