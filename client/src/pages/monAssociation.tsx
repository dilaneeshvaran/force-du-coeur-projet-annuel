import React, { useEffect, useState } from 'react';
import VoteBox from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  const [votes, setVotes] = useState<any>(null);
  const [voteChoices, setVoteChoices] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<any>(null);

  const fetchVotes = async () => {
    fetch('http://localhost:8088/votes')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setVotes(data))
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  }

  const fetchEvents = () => {
    fetch('http://localhost:8088/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  }

  useEffect(() => {
    fetchVotes()
    fetchEvents();
  }, []);


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!votes) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className='parent'>
          <div className='box'>
            {
              votes.map((vote: any) => {
                return <div>
                  <h1>
                    {vote.voteId}
                  </h1>;
                </div>
              })
            }
            {
              events && events.filter((event: any) => event.membersOnly).map((event: any) => {
                return <EventBox event={event} />
              })
            }
          </div>
        </div >
      </>
    );
  }
}

export default MonAssociation;

function setEvents(data: any): any {
  throw new Error('Function not implemented.');
}
