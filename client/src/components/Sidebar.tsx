import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import '../styles/sidebar.css'

interface SidebarProps {
  className?: string;
  setCurrentMenuParent: (menu: string) => void;
}

function formatMenu(menu: string) {
  return menu
    .replace(/([A-Z])/g, ' $1') // add space before capital letters
    .replace(/^./, str => str.toUpperCase()); // uppercase for first letter of each word
}

const Sidebar: React.FC<SidebarProps> = ({ setCurrentMenuParent, className }) => {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState('monAssociation');

  const menuList = ['monAssociation', 'mesDocuments', 'messages', 'mesTaches', 'gestionDeMonCompteEtDossier']

  return (
    <nav
      style={{ zIndex: 1000 }}
      className={`sidebar is-primary ${className}`}
      role="navigation"
      aria-label="main navigation"
    >

      <div className="container-sidebar">

        {
          menuList.map((menu, index) => (
            <div style={
              {
                backgroundColor: currentMenu === menu ? '#f5f5f5' : 'white',
                borderLeft: currentMenu === menu ? '5px solid orange' : '5px solid white',
                cursor: 'pointer'
              }
            }
              onClick={() => {
                setCurrentMenu(menu);
                setCurrentMenuParent(menu);
              }}
              key={index}
              className="menu-item"
            >
              <h6>{formatMenu(menu)}</h6>
            </div>

          ))
        }
      </div>
    </nav >
  );
};

export default Sidebar;