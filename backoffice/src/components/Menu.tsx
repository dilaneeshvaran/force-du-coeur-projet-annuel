import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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

interface MenuProps {
    className?: string;
    isLoggedIn: boolean;
    onLogout: () => void;
}


const Menu: React.FC<MenuProps> = ({ className, isLoggedIn, onLogout }) => {
    const [isOpen, setOpen] = useState(false);
    const location = useLocation();

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
                <NavLink className={`navbar-item ${location.pathname === '/home' ? 'is-active' : ''}`} to="/">
                    <SpeedIcon />Performance
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/evenements' ? 'is-active' : ''}`} to="/evenements">
                    <NewspaperIcon />Content Manage
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/missions' ? 'is-active' : ''}`} to="/missions">
                    <Diversity1Icon /> Members
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/equipes' ? 'is-active' : ''}`} to="/equipes">
                    <ChecklistRtlIcon />Tasks Manage
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/contact' ? 'is-active' : ''}`} to="/contact">
                    <SavingsIcon />Finance
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/inventory' ? 'is-active' : ''}`} to="/inventory">
                    <InventoryIcon />Inventory
                </NavLink>
                <NavLink className={`navbar-item ${location.pathname === '/rejoindre' ? 'is-active' : ''}`} to="/rejoindre">
                    <MailOutlineIcon /> Messages
                </NavLink>

                <NavLink className={`navbar-item ${location.pathname === '/espaceMembres' ? 'is-active' : ''}`} to="/espaceMembres">
                    <VerifiedUserIcon />Manage Users
                </NavLink>
                <NavLink className={`navbar-item ${location.pathname === '/espaceMembres' ? 'is-active' : ''}`} to="/espaceMembres">
                    <CampaignIcon /> Alerts
                </NavLink>
            </div>
        </nav>
    );
};

export default Menu;