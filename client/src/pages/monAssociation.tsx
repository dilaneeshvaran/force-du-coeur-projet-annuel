import React, { useEffect, useState } from 'react';
import VoteBox, { Option } from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  const [votes, setVotes] = useState<any>(null);
  const [voteOptions, setVoteOptions] = useState<Option[]>([]);
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
      .then(data => {
        setVotes(data);
        data.forEach((vote: any) => fetchVoteOptions(vote.id));
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  };

  const fetchVoteOptions = async (voteId: number) => {
    fetch(`http://localhost:8088/options/${voteId}`)
      .then(response => response.json())
      .then(data => {
        setVoteOptions(prevOptions => [...prevOptions, ...data]);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  };

  const fetchEvents = () => {
    fetch('http://localhost:8088/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  };

  useEffect(() => {
    fetchVotes();
    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!votes || !voteOptions) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div className='parent'>
          <div className='vote-box'>
            {
              votes.map((vote: any) => {
                const options = voteOptions.filter((option: Option) => option.voteId === vote.id);
                return <VoteBox key={vote.id} vote={vote} options={options} />
              })
            }
          </div>
          <div className='event-box'>
            {
              events && events.filter((event: any) => event.membersOnly).map((event: any) => {
                return <EventBox key={event.id} event={event} />
              })
            }
          </div>
        </div >
      </>
    );
  }
}

export default MonAssociation;