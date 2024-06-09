import React, { useState } from 'react';
import AuthCheck from '../components/AuthCheck';

function Messages() {
    const [tab, setTab] = useState('send');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [receiver, setReceiver] = useState('');
    const [group, setGroup] = useState('');

    const apiAdress = 'http://localhost:8088/messages';

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // use api
        const apiAddress = file ? 'http://localhost:8088/documents' : 'http://localhost:8088/messages';
        console.log({ subject, body, file, receiver, group, apiAddress });
    };

    return (
        <div className="contentBox">
            <div>
                <button onClick={() => setTab('send')}>Send</button>
                <button onClick={() => setTab('sent')}>Sent</button>
                <button onClick={() => setTab('received')}>Received</button>
            </div>
            {tab === 'send' && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Receiver:
                        <input type="email" value={receiver} onChange={e => setReceiver(e.target.value)} disabled={group !== ""} />
                    </label>
                    <label>
                        Group:
                        <select value={group} onChange={e => setGroup(e.target.value)}>
                            <option value="">Select group</option>
                            <option value="members">Members</option>
                            <option value="admins">Admins</option>
                            <option value="everyone">Everyone</option>
                            <option value="donators">Donators</option>
                            <option value="presidents">Presidents</option>
                        </select>
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
                        Attach document:
                        <input type="file" accept=".txt,.pdf,image/*" onChange={handleFileChange} />
                    </label>
                    <button type="submit">Send</button>
                </form>
            )}
            {tab === 'sent' && (
                <div>
                    {/*call api*/}
                    <p>No messages sent yet.</p>
                </div>
            )}
            {tab === 'received' && (
                <div>
                    {/*call api*/}
                    <p>No messages received yet.</p>
                </div>
            )}
        </div>
    );
}

export default AuthCheck(Messages);