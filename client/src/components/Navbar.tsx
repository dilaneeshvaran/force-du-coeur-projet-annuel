import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../styles/navbar.css'
import fdcLogo from '../assets/fdc-logo.png'
import Logout from '../components/Logout';
import Sidebar from "./Sidebar";

interface NavbarProps {
  className?: string;
  isLoggedIn: boolean;
  onLogout: () => void;
}


const Navbar: React.FC<NavbarProps> = ({ className, isLoggedIn, onLogout }) => {
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
          Accueil
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/evenements' ? 'is-active' : ''}`} to="/evenements">
          Evenements
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/missions' ? 'is-active' : ''}`} to="/missions">
          Nos Missions
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/equipes' ? 'is-active' : ''}`} to="/equipes">
          Nos équipes
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/contact' ? 'is-active' : ''}`} to="/contact">
          Contact
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/soutenir' ? 'is-active' : ''}`} to="/soutenir">
          Soutenir nos actions
        </NavLink>
        <NavLink className={`navbar-item ${location.pathname === '/rejoindre' ? 'is-active' : ''}`} to="/rejoindre">
          Nous Rejoindre
        </NavLink>

        <NavLink className={`navbar-item ${location.pathname === '/espaceMembres' ? 'is-active' : ''}`} to="/espaceMembres">
          Espace Membres
        </NavLink>
        {isLoggedIn && (
          <div className={`navbar-item ${location.pathname === '/logout' ? 'is-active' : ''}`}>
            <Logout onLogout={onLogout} />
          </div>
        )}


      </div>
    </nav>
  );
};

export default Navbar;