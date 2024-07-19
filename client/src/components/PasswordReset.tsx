import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/common.css';
import '../styles/login.css';

interface PasswordResetProps {
    onClose: () => void;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePasswordReset = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8088/users/request-reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                const resetToken = data.resetToken;

                const templateParams = {
                    user_email: email,
                    reset_link: `http://localhost:5173/reset-password/${resetToken}`
                };

                emailjs.send(
                    import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_ID!,
                    import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID!,
                    templateParams,
                    import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY!
                )
                    .then(() => {
                        setMessage('un email avec le lien pour réinitiliser votre mot de passe a vien été envoyé.');
                        setError('');
                    })
                    .catch((error) => {
                        console.error('Failed to send email:', error);
                        setError('Erreur de traitement !.');
                        setMessage('');
                    });
            } else {
                setError('EUne erreur est survenue ! Essayez plus tard.');
                setMessage('');
            }
        } catch (error) {
            console.error('Error processing your request:', error);
            setError('Une erreur est survenue ! Essayez plus tard.');
            setMessage('');
        }
    };

    return (
        <div className="form-container">
            <h1>Mot de passe oublié</h1>
            <form onSubmit={handlePasswordReset}>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="email" className='inputRejoindre' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <input type="submit" className='submitRejoindre' value="Valider" />
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
            <button onClick={onClose} className='close-button'>Fermer</button>
        </div>
    );
};

export default PasswordReset;
