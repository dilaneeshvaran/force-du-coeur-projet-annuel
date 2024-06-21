import '../styles/soutenir.css'
import { useState } from 'react';
import { AdhererForm } from '../components/AdhererForm';
import { DonationForm } from '../components/DonationForm';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PScAqGc0PhuZBe9Uqm7XP3iXPKio8QNqbt4iNfSINUE06VzAPldOUwEgVn94rLLmQKd8STxK6fj12YKwBeiMRbS00DCyPSNGY');


interface SoutenirProps {
  isLoggedIn?: boolean;
  onMembershipChange?: (id: any, newStatus: string, amount: any) => void;
}

function Soutenir({ isLoggedIn }: SoutenirProps) {
  const [isPonctuelClicked, setPonctuelClicked] = useState(false);
  const [isAdhererClicked, setAdhererClicked] = useState(false);
  const [isTitleVisible, setIsTitleVisible] = useState(true);

  const handlePonctuelClick = () => {
    setPonctuelClicked(true);
  }

  const handleAdhererClick = () => {
    setAdhererClicked(true);
    setIsTitleVisible(false);
  }

  const handleCloseClick = () => {
    setPonctuelClicked(false);
    setAdhererClicked(false);
  }

  return (
    <>
      {isTitleVisible && <h1 className='soutenirTitle'>Soutenir nos actions</h1>}
      <div className="containerCB">
        {!isPonctuelClicked && !isAdhererClicked ? (
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
                  <Link to="/manageAccount?selectedType=membership" className='buttonCB'>
                    Adhérer
                  </Link>
                ) : (
                  <button onClick={handleAdhererClick} className='buttonCB'>
                    Adhérer
                  </button>
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
                <div className='btnCB2'>
                  <button onClick={handlePonctuelClick} className='buttonCB2'>Ponctuel</button>
                </div>
              </div>
            </div>
          </>
        ) : isPonctuelClicked ? (
          <DonationForm handleCloseClick={handleCloseClick} />
        ) : (
          <AdhererForm handleCloseClick={handleCloseClick} />
        )}
      </div>
    </>
  )
}

export default Soutenir