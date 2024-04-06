import '../styles/messages.css';
import { useState } from 'react';

interface Message {
    id: number;
    subject: string;
    message?: string;
    type: 'sent' | 'received';
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

    const handleLinkClick = (link: string) => {
        setSelectedLink(link);
    };

    return (
        <div className="message-box">
            <div className='nav-message'>
                <a href='#' className='nav-message-link' onClick={() => handleLinkClick('received')}>Messages Reçu</a>
                <a href='#' className='nav-message-link' onClick={() => handleLinkClick('sent')}>Messages Envoyés</a>
            </div>
            <div className='message-list'>
                {messages.filter(message => message.type === selectedLink).map((message) => (
                    <div key={message.id}>
                        <h2>{message.subject}</h2>
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Messages;