import React, { Dispatch, SetStateAction, useState } from 'react';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';
import MonAssociation from './monAssociation';
import MesDocuments from './mesDocuments';
import Messages from './messages';
import MesTaches from './mesTaches';
import '../styles/espaceMembres.css';
import ManageAccount from './manageAccount';
import '../styles/common.css';
import Login from '../components/Login';

interface EspaceMembresProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const EspaceMembres: React.FC<EspaceMembresProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [currentMenu, setCurrentMenu] = useState('monAssociation');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <div>
      {
        isLoggedIn ? <div>
          <div className='sidebarDiv'><Sidebar setCurrentMenuParent={(menu) => { setCurrentMenu(menu) }} /></div>
          <div className="content-container">
            {
              currentMenu === 'monAssociation' && <MonAssociation />
            }
            {
              currentMenu === 'mesDocuments' && <MesDocuments />
            }
            {
              currentMenu === 'messages' && <Messages />
            }
            {
              currentMenu === 'mesTaches' && <MesTaches />
            }
            {
              currentMenu === 'gestionDeMonCompteEtDossier' && <ManageAccount />
            }
          </div>
        </div> : <Login onLogin={handleLogin} />
      }
    </div>
  );
};

export default EspaceMembres;