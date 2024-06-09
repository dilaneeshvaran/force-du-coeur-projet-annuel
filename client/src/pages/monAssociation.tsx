import React, { useEffect, useState } from 'react';
import VoteBox from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  const [votes, setVotes] = useState<any>(null);
  const [voteChoices, setVoteChoices] = useState(null);
  const [error, setError] = useState<Error | null>(null);


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

  useEffect(() => {
    fetchVotes()
  }, []);


  const event = {
    description: 'This is an upcoming event.',
    date: new Date('2022-02-01'),
  };


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
            <EventBox event={event} />
          </div>
        </div >
      </>
    );
  }
}

export default MonAssociation;