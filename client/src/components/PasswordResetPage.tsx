import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/login.css';

const PasswordResetPage: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password: string) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        return hasUpperCase && hasNumber;
    };

    const handlePasswordReset = async (event: React.FormEvent) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('mot de passes ne concordent pas.');
            return;
        }

        if (!validatePassword(newPassword)) {
            setError('Mot de passe doit contenir au moins 1 lettre majuscule et 1 nombre.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8088/users/reset-password/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword })
            });

            if (response.ok) {
                setMessage('Mot de passe a été mis a jour avec succès!. Redirection vers la page de connexion...');
                setError('');
                setTimeout(() => {
                    navigate('/espaceMembres');
                }, 2000);
            } else {
                setError('Erreur avec le changement de mot de passe!.');
                setMessage('');
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            setError('Erreur avec le changement de mot de passe! Réessayez plus tard.');
            setMessage('');
        }
    };

    return (
        <div className="form-container">
            <h1>Réinitialiser le Mot de passe</h1>
            <form onSubmit={handlePasswordReset}>
                <div className="input-group">
                    <label>Nouveau Mot de passe:</label>
                    <input
                        type="password"
                        className='inputRejoindre'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Confirmer le Mot de passe:</label>
                    <input
                        type="password"
                        className='inputRejoindre'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <input type="submit" className='submitRejoindre' value="Submit" />
            </form>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default PasswordResetPage;
