import React, { useEffect, useState } from 'react';
import '../App.css'
import '../styles/eventbox.css'

interface Event {
  title: string;
  description: string;
  date: string;
  location: string;
}

function Evenements() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:8088/events'); // Replace with your API endpoint
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <h1>Evenements</h1>
      {events.map((event, index) => (
        <div className="ec-container">
          <div key={index} className="event-card">
            <h2 className='event-title'>{event.title}</h2>
            <p className="event-desc">{event.description}</p>
            <p className='event-date'>{event.date}</p>
            <p className='event-location'>{event.location}</p>
          </div>
        </div>
      ))}
      <p>
        email : fdc@fdc.com
      </p>
    </>
  )
}

export default Evenements;