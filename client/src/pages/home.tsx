import { useState } from 'react'
import '../App.css'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
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

export default Home
