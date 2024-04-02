import React, { useState } from 'react';
import '../styles/rejoindre.css';

function Rejoindre() {
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [fullname, setFullName] = useState('');
  const [ville, setVille] = useState('');
  const [pays, setPays] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(`Submitted Email: ${email}`);
  };

  return (
    <div className="form-container">
      <h1>Rejoignez nous</h1>
      <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label>
          Genre:
          </label>
          <div className="radio-group">
          <label>Homme<input type="radio" name="genre" value="homme" required /></label>
          <label>Femme<input type="radio" name="genre" value="femme" /></label>
      </div>
      </div>

        <div className="input-group">
        <label>
          Nom et Prénom:
          </label>
          <input type="text" className='inputRejoindre' value={fullname} onChange={e => setFullName(e.target.value)} required />
        </div>

        <div className="input-group">
        <label>
          Pays:
          </label>
          <input type="text" className='inputRejoindre' value={pays} onChange={e => setPays(e.target.value)} required />
          </div>

          <div className="input-group">
        <label>
          Ville:
          </label>
          <input type="text" className='inputRejoindre' value={ville} onChange={e => setVille(e.target.value)} required />
        </div>

        <div className="input-group">
        <label>
          Email:
          </label>
          <input type="email" className='inputRejoindre' value={email} onChange={e => setEmail(e.target.value)} required />
       </div>

        <div className="input-group">
        <label>
          Numéro de téléphone:
          </label>
          <input type="tel" className='inputRejoindre' value={telephone} onChange={e => { const val = e.target.value; setTelephone(val.replace(/\D/g, '')); }} required />
        </div>

        <div className="input-group">
                <label>
          Date de naissance:
          </label>
          <input type="date" className='inputRejoindre' value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} max={new Date().toISOString().split("T")[0]} required />
        </div>

        <div className="input-group">
        <label>
          Je confirm mes information pour devenir bénévole :
          </label>
          <input type="radio" checked={confirmed} onChange={() => setConfirmed(!confirmed)} required />
          </div>

        <input type="submit" className='submitRejoindre' value="Submit" />
      </form>
    </div>
  );
}

export default Rejoindre;