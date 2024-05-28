import '../styles/soutenir.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface SoutenirProps {
  isLoggedIn?: boolean;
}

function Soutenir({ isLoggedIn }: SoutenirProps) {
  const [isPonctuelClicked, setPonctuelClicked] = useState(false);

  const handlePonctuelClick = () => {
    setPonctuelClicked(true);
  }

  const handleCloseClick = () => {
    setPonctuelClicked(false);
  }

  return (
    <>
      <h1>Soutenir nos actions</h1>
      <div className="containerCB">
        {!isPonctuelClicked ? (
          <>
            <div className='contentBox'>
              <h3>Adhérer à 'Force du Coeur'</h3>
              <div className='ulCB'>
                <ul>
                  <li>Donnez votre force du coeur</li>
                  <li>Recevez notre t-shirt Force du coeur</li>
                  <li>Participez à nos événements</li>
                  <li>Recevez des sourires</li>
                </ul>
              </div>
              <div className='btnCB'>
                {isLoggedIn ? (
                  <Link to="/manageAccount?selectedType=membership" className='buttonCB'>Adhérer</Link>
                ) : (
                  <Link to="/espaceMembres" className='buttonCB'>Adhérer</Link>
                )}
              </div>
            </div>

            <div className='contentBox'>
              <h3>Faire un don</h3>
              <div className='ulCB'>
                <ul>
                  <li>Enlargir la zone d'aide</li>
                </ul>
              </div>
              <div className='btnContainer'>
                <div className='btnCB'><button onClick={handlePonctuelClick} className='buttonCB'>Ponctuel</button></div>
                <div className='btnCB'>
                  {isLoggedIn ? (
                    <Link to="/manageAccount?selectedType=donation" className='buttonCB'>Périodique</Link>
                  ) : (
                    <Link to="/espaceMembres" className='buttonCB'>Périodique</Link>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='contentBox'>
            <h3>Faire un don</h3>
            <form>
              <label>
                Name:
                <input type="text" name="name" required />
              </label><br></br>
              <label>
                Amount:
                <input type="number" name="amount" required />
              </label><br></br>
              <label>
                Email:
                <input type="email" name="email" required />
              </label><br></br>
              <input type="submit" value="Submit" />
            </form>
            <button onClick={handleCloseClick}>Close</button>
          </div>
        )}
      </div >
    </>
  )
}

export default Soutenir