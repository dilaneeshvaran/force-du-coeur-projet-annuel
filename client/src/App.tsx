import { useState } from 'react'
import fdcLogo from './assets/fdc-logo.png'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/dilaneeshvaran/force-du-coeur-projet-annuel" target="_blank">
          <img src={fdcLogo} className="logo fdc" alt="fdc logo" />
        </a>
      </div>
      <h1>Force Du Coeur</h1>
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
    </>
  )
}

export default App
