import '../styles/participer.css'

function Participer() {

  return (
    <>
      <h1>Participez !</h1>
      <div className="containerCB">
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
          <div className='btnCB'><button className='buttonCB'>Adhérer</button></div>
          </div>

          <div className='contentBox'>
            <h3>Faire un don</h3>
          <div className='ulCB'>
            <ul>
            <li>Enlargir la zone d'aide</li>
          </ul>
          </div>
          <div className='btnCB'><button className='buttonCB'>Don</button></div>
          </div>
      </div>
    </>
  )
}

export default Participer
