import React, { Dispatch, SetStateAction, useState } from 'react';
import Logout from '../components/Logout';
import Sidebar from '../components/Sidebar';

interface EspaceMembresProps {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

const EspaceMembres: React.FC<EspaceMembresProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    //verify the user using a backend service
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  if (isLoggedIn) {
    return (
      <div>
        <Logout />
        <Sidebar />
        <h1>Welcome, {email}!</h1>
        {/* Your protected content goes here */}
      </div>
    );
  }

  return (
    <div className="form-container">
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
  );
};

export default EspaceMembres;