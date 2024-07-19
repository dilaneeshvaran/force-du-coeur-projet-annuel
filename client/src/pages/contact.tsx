import React, { useState } from 'react';
import '../styles/contact.css'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

function Contact() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageStatus, setMessageStatus] = useState("");
  const [isMessageSent, setIsMessageSent] = useState(false);
  const type = "received";
  const concernedMsgId = 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:8088/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, email, message, type, concernedMsgId }),
    });

    if (response.ok) {
      setMessageStatus('Message envoyé');
      setIsMessageSent(true);
      setfullName("");
      setEmail("");
      setMessage("");
    } else {
      setMessageStatus('Message non envoyé');
      setIsMessageSent(false);
    }

    //message duration
    setTimeout(() => {
      setMessageStatus("");
    }, 3000);
  };

  return (
    <>
      <h1>Contactez Nous</h1>
      <div className='containerContact'>

        <div className="contactForm">
          <h3>Contactez Force de Coeur</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="fullName" placeholder="Nom et Prénom" required value={fullName} onChange={e => setfullName(e.target.value)} />
            <input type="email" name="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <textarea name="message" placeholder="Message" required value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <button type="submit">Envoyer le Message</button>
          </form>
          {messageStatus && <div className={isMessageSent ? "messageStatus success" : "messageStatus failure"}>{messageStatus}</div>}
        </div>
        <div className="socialmedia-box">
          <p>
            <h3>Suivez la Force du Coeur sur les Réseau Sociaux</h3><br></br>
            <a className='sm-link' href="https://github.com/dilaneeshvaran/force-du-coeur-projet-annuel" target="_blank">
              <FaFacebookF />
            </a>
            <a className='sm-link' href="https://www.instagram.com/forceducoeur.asso/" target="_blank">
              <FaInstagram />
            </a>
            <a className='sm-link' href="https://github.com/dilaneeshvaran/force-du-coeur-projet-annuel" target="_blank">
              <FaXTwitter />
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Contact