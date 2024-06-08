import React, { useEffect, useState } from 'react';
import VoteBox from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  const [votes, setVotes] = useState(null);
  const [voteChoices, setVoteChoices] = useState(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    fetch('http://localhost:8088/voteChoices')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setVoteChoices(data))
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  }, []);

  const event = {
    description: 'This is an upcoming event.',
    date: new Date('2022-02-01'),
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!votes || !voteChoices) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className='parent'>
          <div className='box'>
            <VoteBox vote={votes} optionsData={voteChoices} />
          </div>
          <div className='box'>
            <EventBox event={event} />
          </div>
        </div >
      </>
    );
  }
}

export default MonAssociation;