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
      const response = await fetch('http://localhost:8088/events/nonMembersOnly');
      const data = await response.json();
      const futureEvents = data.filter((event: Event) => new Date(event.date) > new Date());
      setEvents(futureEvents);
    };

    fetchEvents();
  }, []);

  return (
    <>
      <div className='content-event'>
        <h1 className='title-event'>Evenements</h1>
        <div className='eventContainer'>
          {events.map((event, index) => (
            <div key={index} className="eventbox">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Lieu: {event.location}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Evenements;