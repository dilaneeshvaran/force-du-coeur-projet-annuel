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
  const [option1, setOption1] = useState(false);
const [option2, setOption2] = useState(false);
const [option3, setOption3] = useState(false);

const handleCheckboxChange = (setFunction: React.Dispatch<React.SetStateAction<boolean>>) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setFunction(event.target.checked);
};

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

        <div className="checkbox-group">
  <label>
    Quel type de bénévolat vous correspond le mieux ? (vous pourrez évoluer vers un autre type):
  </label>
  <div>
    <div className='checkbox-label'>
  <label>
  <input type="checkbox" checked={option1} onChange={handleCheckboxChange(setOption1)} value="missionCourte" />
  Une mission courte sur un objectif précis (Réseau social/communication, événementiel, administratif, etc.)
</label>
</div>
<div className='checkbox-label'>
<label>
  <input type="checkbox" checked={option2} onChange={handleCheckboxChange(setOption2)} value="missionLongue" />
  Une mission plus longue (Voyage humanitaire, mission de plusieurs mois, etc.)
</label>
</div>
<div className='checkbox-label'>
<label>
  <input type="checkbox" checked={option3} onChange={handleCheckboxChange(setOption3)} value="missionPonctuelle" />
  Des missions ponctuelles pour soutenir les équipes (événements, collectes, etc.)
</label>
</div>
  </div>
</div>

        <div className="radio-group">
        <label>
        <input type="radio" checked={confirmed} onChange={() => setConfirmed(!confirmed)} required />
          Je confirm mes information pour devenir bénévole :
          </label>
          </div>

        <input type="submit" className='submitRejoindre' value="Submit" />
      </form>
    </div>
  );
}

export default Rejoindre;