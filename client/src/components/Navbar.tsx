import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../styles/navbar.css'
import fdcLogo from '../assets/fdc-logo.png'



interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
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
              Home
            </NavLink>

            <NavLink className={`navbar-item ${location.pathname === '/contact' ? 'is-active' : ''}`} to="/contact">
              Contact
            </NavLink>

            <NavLink className={`navbar-item ${location.pathname === '/participer' ? 'is-active' : ''}`} to="/participer">
            Participer
            </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;