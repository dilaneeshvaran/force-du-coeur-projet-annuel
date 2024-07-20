import React from 'react';
import '../App.css';
import '../styles/equipe.css';

const members = [
  { name: "CHARLÈNE", role: "Cheffe de Projet" },
  { name: "CHARLES", role: "Consultant" },
  { name: "SONIA", role: "Secrétaire" },
  { name: "JORDAN", role: "Trésorier" },
  { name: "DAVID", role: "Logistique" },
  { name: "JONATHAN", role: "Webmaster" },
];

function Equipes() {
  return (
    <div className="team-container">
      {members.map((member, index) => (
        <React.Fragment key={index}>
          <div className='member-block'>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
          {index < members.length - 1 && <div className='separator'></div>}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Equipes;
