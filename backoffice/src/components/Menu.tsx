import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '../styles/menu.css';
import fdcLogo from '../assets/favicon2.png';
import CampaignIcon from '@mui/icons-material/Campaign';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import SavingsIcon from '@mui/icons-material/Savings';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SpeedIcon from '@mui/icons-material/Speed';
import TopicIcon from '@mui/icons-material/Topic';
import { RiShutDownLine } from "react-icons/ri";
import '../styles/logout.css';

interface MenuProps {
    className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedIn);

        if (!loggedIn || !userId) {
            navigate('/backofficeHome');
        }
    }, [navigate, userId]);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8088/users/adminlogin', {
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
                    localStorage.setItem('isLoggedIn', 'true');
                    setIsLoggedIn(true);
                    navigate('/performance');

                    setErrorMessage('');
                } else {
                    console.error('Login échoué');
                    setErrorMessage('Email ou mot de passe incorrecte');
                }
            } else {
                console.error('Failed to login');
                setErrorMessage('Email ou mot de passe incorrecte');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setErrorMessage('Une erreur est survenue Réessayer.');
        }
    };

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <nav className={`navbar is-primary ${className}`} role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="logo">
                    <a href="https://github.com/dilaneeshvaran/force-du-coeur-projet-annuel" target="_blank" rel="noopener noreferrer">
                        <img src={fdcLogo} className="logofdc" alt="fdc logo" />
                    </a>
                </div>
                {isLoggedIn ? (
                    <>
                        <NavLink className={`navbar-item ${location.pathname === '/performance' ? 'is-active' : ''}`} to="/performance">
                            <SpeedIcon /> Performance
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/contentManager' ? 'is-active' : ''}`} to="/contentManager">
                            <NewspaperIcon /> Content Manage
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/userManagement' ? 'is-active' : ''}`} to="/userManagement">
                            <Diversity1Icon /> Members
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/taskManage' ? 'is-active' : ''}`} to="/taskManage">
                            <ChecklistRtlIcon /> Tasks Manage
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/financeInformation' ? 'is-active' : ''}`} to="/financeInformation">
                            <SavingsIcon /> Finance
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/documentManager' ? 'is-active' : ''}`} to="/documentManager">
                            <TopicIcon /> Documents
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/message' ? 'is-active' : ''}`} to="/message">
                            <MailOutlineIcon /> Messages
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/settings' ? 'is-active' : ''}`} to="/settings">
                            <VerifiedUserIcon /> Settings
                        </NavLink>
                        <NavLink className={`navbar-item ${location.pathname === '/alert' ? 'is-active' : ''}`} to="/alert">
                            <CampaignIcon /> Alerts
                        </NavLink>
                        <NavLink className={`navbar-logout ${location.pathname === '/backofficeHome' ? 'is-active' : ''}`} to="/backofficeHome" onClick={handleLogout}>
                            <RiShutDownLine className="logout-logo" size={30} />
                        </NavLink>

                    </>
                ) : (
                    <form className="login-form" onSubmit={handleLogin}>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input className="input-login" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                        <button type="submit">Login</button>
                    </form>
                )}

            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

        </nav>
    );
};

export default Menu;
