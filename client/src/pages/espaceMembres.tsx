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

interface EspaceMembresProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const EspaceMembres: React.FC<EspaceMembresProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentMenu, setCurrentMenu] = useState('monAssociation');
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8088/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      console.log(":::::::::::::::" + JSON.stringify(response));

      if (response.ok) {
        const data = await response.json();

        if (data && data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);

          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
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
            {
              currentMenu === 'mesTaches' && <MesTaches />
            }
            {
              currentMenu === 'gestionDeMonCompteEtDossier' && <ManageAccount />
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
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
      }
    </div>
  );
};

export default EspaceMembres;