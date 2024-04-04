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
//rejoignez nous : bénévole (inscription avec les infos de contact et, formulation de dossier en attente de validation:)
//la demande est accessible dans le backoffice pour validation par un admin, le benevole recoit les infos de login (mot de passe à reinitialiser)  par mail
//il peux modifier le mot de passe
//FAIRE UN DON  : poncutel ou mensuel
//ADHESION : 10€/mois ADHesion
//30€/mois ADHesion famille
//50€/mois ADHesion soutien
//100€/mois ADHesion bienfaiteur

//todo
//mot de passe oublié
//backoffice

const Navbar: React.FC<NavbarProps> = ({ className,isLoggedIn,onLogout }) => {
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