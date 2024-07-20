import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/login.css';
import PasswordReset from './PasswordReset';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showReset, setShowReset] = useState(false);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8088/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();

                if (data && data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);

                    onLogin();
                    setErrorMessage('');
                } else {
                    console.error('Failed to login');
                    setErrorMessage('Email ou mdp incorrecte');
                }
            } else {
                console.error('Failed to login');
                setErrorMessage('Email ou mdp incorrecte');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('Erreur est survenue, réessayez!.');
        }
    };

    if (showReset) {
        return <PasswordReset onClose={() => setShowReset(false)} />;
    }

    return (
        <div className="form-container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input type="text" className='inputRejoindre' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label>Mot de passe:</label>
                    <input type="password" className='inputRejoindre' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <input type="submit" className='submitRejoindre' value="Connexion" />
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className='pwdResetBtn' onClick={() => setShowReset(true)}>Mot de passe oublié?</button>
        </div>
    );
};

export default Login;
