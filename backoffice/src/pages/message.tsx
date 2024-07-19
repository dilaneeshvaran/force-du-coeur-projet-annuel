import React, { useEffect, useState } from 'react';
import emailjs from "@emailjs/browser";
import AuthCheck from '../components/AuthCheck';
import '../styles/message.css';

interface Message {
    id: number;
    userId: number;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    type: "received" | "sent";
    createdAt: string;
    senderMail: string;
    receiverMail: string;
    replyAdminId: number;
    replied: boolean;
}

const Messages: React.FC = () => {
    const [tab, setTab] = useState('received');
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [selectedMessageId, setSelectedMessageId] = useState(0);
    const [loading, setLoading] = useState(false);
    const userId = localStorage.getItem('userId');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        emailjs.init("y8pOzkgAPd8PgXyKt");
        fetchMessages();
    }, [tab]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const serviceId = "service_7z0c25j";
        const templateId = "template_xxv2hnr";
        try {
            setLoading(true);
            await emailjs.send(serviceId, templateId, {
                name: messages.find(message => message.id === selectedMessageId)?.fullName,
                recipient: receiver,
                subject: subject,
                message: message
            });

            await fetch(`http://localhost:8088/messages/${selectedMessageId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ replied: true })
            });

            await fetch('http://localhost:8088/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: messages.find(message => message.id === selectedMessageId)?.fullName,
                    email: messages.find(message => message.id === selectedMessageId)?.email,
                    createdAt: new Date().toISOString(),
                    replyAdminId: userId,
                    type: 'sent',
                    replied: false,
                    subject: subject,
                    message: message,
                    receiverMail: receiver,
                    concernedMsgId: selectedMessageId
                })
            });

            setConfirmationMessage("Mail déposé.");
            setTimeout(() => setConfirmationMessage(''), 5000);
            setReceiver('');
            setSubject('');
            setMessage('');
            setTab('replied');
            fetchMessages();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const apiAddress = 'http://localhost:8088/messages';

    const fetchMessages = async () => {
        let queryParams = '';
        switch (tab) {
            case 'received':
                queryParams = `type=received&replied=false`;
                break;
            case 'sent':
                queryParams = `type=sent`;
                break;
            case 'replied':
                queryParams = `replied=true`;
                break;
            default:
                break;
        }

        const response = await fetch(`${apiAddress}?${queryParams}`);
        const data = await response.json();
        setMessages(data);
    };

    return (
        <div className="contentBox">
            <div className='msg-options'>
                <button onClick={() => setTab('sent')} style={{ backgroundColor: tab === "sent" ? 'gray' : ' #007bff' }}>Envoyé</button>
                <button onClick={() => setTab('received')} style={{ backgroundColor: tab === "received" ? 'gray' : ' #007bff' }}>Reçu</button>
                <button onClick={() => setTab('replied')} style={{ backgroundColor: tab === "replied" ? 'gray' : ' #007bff' }}>Répondu</button>
            </div>
            {tab === 'reply' && (
                <form className='msgReplyForm' onSubmit={handleSubmit}>
                    <label>
                        Destinataire:
                        <input
                            type="email"
                            value={receiver}
                            onChange={e => setReceiver(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Sujet:
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            required
                        />
                    </label>
                    <button className='btn-send' type="submit" disabled={loading}>{loading ? 'Envoie en cours...' : 'Envoyer'}</button>
                    <button className='btn-close' onClick={() => setTab('received')}>Fermer</button>
                </form>
            )}
            {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}

            {tab === 'sent' && (
                <div >
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div className='message-box' key={message.id}>
                                <p>Nom et Prénom Destinaire : {message.fullName}</p>
                                <p>Email Destinaire : {message.email}</p>
                                <p>Objet : {message.subject}</p>
                                <p>Message : {message.message}</p>
                                <p> Message Envoyé le : {message.createdAt}</p>
                            </div>
                        ))
                    ) : (
                        <p>Pas de message envoyé.</p>
                    )}
                </div>
            )}
            {tab === 'received' && (
                <div>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div className='message-box' key={message.id}>
                                <p>Nom et Prénom Destinaire : {message.fullName}</p>
                                <p>Email Destinaire : {message.email}</p>
                                <p>Objet : {message.subject}</p>
                                <p>Message : {message.message}</p>
                                <p> Message Envoyé le : {message.createdAt}</p>
                                <button className='btn-reply' onClick={() => { setTab('reply'); setSelectedMessageId(message.id); setReceiver(message.email); }}>Répondre</button>
                            </div>
                        ))
                    ) : (
                        <p>Pas de message reçu.</p>
                    )}
                </div>
            )}
            {tab === 'replied' && (
                <div>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <div className='message-box' key={message.id}>
                                <p>Nom et Prénom Destinaire : {message.fullName}</p>
                                <p>Email Destinaire : {message.email}</p>
                                <p>Objet : {message.subject}</p>
                                <p>Message : {message.message}</p>
                                <p> Message Envoyé le : {message.createdAt}</p>
                            </div>
                        ))
                    ) : (
                        <p>Pas de message de réponse</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default AuthCheck(Messages);
