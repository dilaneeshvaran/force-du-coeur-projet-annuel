import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/login.css';
import PasswordReset from './PasswordReset'; // Import the PasswordReset component

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showReset, setShowReset] = useState(false); // State to toggle PasswordReset

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
                    setErrorMessage('Email or password is incorrect');
                }
            } else {
                console.error('Failed to login');
                setErrorMessage('Email or password is incorrect');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('An error occurred. Please try again.');
        }
    };

    if (showReset) {
        return <PasswordReset onClose={() => setShowReset(false)} />; // Pass onClose prop to PasswordReset
    }

    return (
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>email:</label>
                    <input type="text" className='inputRejoindre' value={email} onChange={e => setEmail(e.target.value)} required />
                </div>

                <div className="input-group">
                    <label>mot de passe:</label>
                    <input type="password" className='inputRejoindre' value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <input type="submit" className='submitRejoindre' value="Submit" />
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button className='pwdResetBtn' onClick={() => setShowReset(true)}>Mot de passe oublié?</button>
        </div>
    );
};

export default Login;
