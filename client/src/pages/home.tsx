import { useState } from 'react'
import '../App.css'
import welcomeImage from '../assets/image_accueil.jpg'
import welcomeImage2 from '../assets/welcomeImage2.jpg'
import welcomeImage3 from '../assets/welcomeImage3.jpg'
import welcomeImage4 from '../assets/welcomeImage4.jpg'

import '../styles/home.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* 
      <div className="card">
        <button onClick={() => setCount((count) => count + 999999)}>
          dons : {count} $
        </button>
        <p>
          ce <code>client web app</code> est en cours de construction
        </p>
      </div>
      <p className="read-the-docs">
        Click on the logo to access the git repo
      </p>
      */}
      <div className="image-row">
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
        <img src={welcomeImage2} alt="Welcome"   className="welcome-image" />
        <img src={welcomeImage3} alt="Welcome" className="welcome-image" />
        <img src={welcomeImage4} alt="Welcome" className="welcome-image" />
      </div>
      
    </>
  )
}

export default Home
