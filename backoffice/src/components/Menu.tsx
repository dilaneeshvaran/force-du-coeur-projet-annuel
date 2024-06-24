import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '../styles/menu.css'
import fdcLogo from '../assets/fdc-logo.png'
import CampaignIcon from '@mui/icons-material/Campaign';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import SavingsIcon from '@mui/icons-material/Savings';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SpeedIcon from '@mui/icons-material/Speed';
import '../styles/logout.css';
import { RiShutDownLine } from "react-icons/ri";

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
            navigate('/login');
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

    const handleLogout = () => {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
    };

    return (
        <nav
            className={`navbar is-primary ${className}`}
            role="navigation"
            aria-label="main navigation"
        >

            <div className="container">
                <div className="logo">
                    <a href="https://github.com/dilaneeshvaran/force-du-coeur-projet-annuel" target="_blank">
                        <img src={fdcLogo} className="logofdc" alt="fdc logo" />
                    </a>
                </div>
                {isLoggedIn ? (
                    <>
                        {
                            <NavLink className={`navbar-item ${location.pathname === '/performance' ? 'is-active' : ''}`} to="/performance">
                                <SpeedIcon />Performance
                            </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/contentManager' ? 'is-active' : ''}`} to="/contentManager">
                            <NewspaperIcon />Content Manage
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/userManagement' ? 'is-active' : ''}`} to="/userManagement">
                            <Diversity1Icon /> Members
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/taskManage' ? 'is-active' : ''}`} to="/taskManage">
                            <ChecklistRtlIcon />Tasks Manage
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/financeInformation' ? 'is-active' : ''}`} to="/financeInformation">
                            <SavingsIcon />Finance
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/inventory' ? 'is-active' : ''}`} to="/inventory">
                            <InventoryIcon />Inventory
                        </NavLink>}
                        {<NavLink className={`navbar-item ${location.pathname === '/message' ? 'is-active' : ''}`} to="/message">
                            <MailOutlineIcon /> Messages
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/settings' ? 'is-active' : ''}`} to="/settings">
                            <VerifiedUserIcon />Settings
                        </NavLink>}

                        {<NavLink className={`navbar-item ${location.pathname === '/alert' ? 'is-active' : ''}`} to="/alert">
                            <CampaignIcon /> Alerts
                        </NavLink>}
                        {<NavLink className={`navbar-logout ${location.pathname === '/backofficeHome' ? 'is-active' : ''}`} to="/backofficeHome" onClick={handleLogout}>
                            <RiShutDownLine className="logout-logo" size={30} />
                        </NavLink>}
                    </>
                ) : (
                    <form onSubmit={handleLogin}>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
                        <button type="submit">Login</button>
                    </form>

                )}
                {errorMessage && <div className="error-message">{errorMessage}</div>}

            </div>
        </nav >
    );
};

export default Menu;