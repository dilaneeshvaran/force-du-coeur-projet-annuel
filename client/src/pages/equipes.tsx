import '../App.css'
import '../styles/equipe.css'

const members = [
  { name: "CHARLÈNE", role: "Cheffe de Projet"},
  { name: "CHARLES", role: "Consultant"},
  { name: "SONIA", role: "Secrétaire"},
  { name: "JORDAN", role: "Trésorier"},
  { name: "DAVID", role: "Logistique"},
  { name: "JONATHAN", role: "Webmaster"},
]

function Equipes() {

  return (
    <div className="team-container">
      {members.map((member, index) => (
        <div key={index} className='member-block'>
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}      
    </div>
  )
}

export default Equipes
