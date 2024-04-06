import React, { Dispatch, SetStateAction, useState } from 'react';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';
import MonAssociation from './monAssociation';
import MesDocuments from './mesDocuments';
import Messages from './messages';
import '../styles/espaceMembres.css';

interface EspaceMembresProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const EspaceMembres: React.FC<EspaceMembresProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentMenu, setCurrentMenu] = useState('monAssociation');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    //verify the user using a backend service
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <div>
      {
        isLoggedIn ? <div>
          <Logout />
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
          </div>
        </div> : <div className="form-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>
                email:
              </label>
              <input type="text" className='inputRejoindre' value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div className="input-group">
              <label>
                mot de passe:
              </label>
              <input type="password" className='inputRejoindre' value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <input type="submit" className='submitRejoindre' value="Submit" />
          </form>
        </div>
      }
    </div>
  );
};

export default EspaceMembres;