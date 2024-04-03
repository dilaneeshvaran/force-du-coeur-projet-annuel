import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../styles/sidebar.css'

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav
      className={`sidebar is-primary ${className}`}
      role="navigation"
      aria-label="main navigation"
    >
     
      <div className="container-sidebar">
            <NavLink className={`sidebar-item ${location.pathname === '/' ? 'is-active' : ''}`} to="">
              Mes Documents
            </NavLink>

            <NavLink className={`sidebar-item ${location.pathname === '/' ? 'is-active' : ''}`} to="">
            Messages
            </NavLink>

            <NavLink className={`sidebar-item ${location.pathname === '/' ? 'is-active' : ''}`} to="">
            Mes Taches
            </NavLink>

            <NavLink className={`sidebar-item ${location.pathname === '/' ? 'is-active' : ''}`} to="">
            Gestion de mon compte & dossier
            </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;