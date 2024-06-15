import '../styles/contact.css'

function Contact() {

  return (
    <>
      <h1>Contactez Nous</h1>
      <div className='containerContact'>

        <div className="contactForm">
          <h3>Contact Us</h3>
          <form>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="card">
          <p>
            <h3>Suivez la Force du Coeur sur les Réseau Sociaux</h3><br></br>
            Facebook : <a href="https://www.facebook.com/ForceDuCoeur">Force Du Coeur</a><br></br>
            X : <a href="https://www.facebook.com/ForceDuCoeur">Force Du Coeur</a><br></br>
            Instagram : <a href="https://www.instagram.com/forceducoeur/">@forceducoeur</a><br></br>
          </p>
        </div>
        <p>
          email : fdc@gmail.com
        </p>
      </div>
    </>
  )
}

export default Contact