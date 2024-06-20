import React, { useEffect, useState } from 'react';
import VoteBox, { Option } from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

function MonAssociation() {
  const [votes, setVotes] = useState<any>(null);
  const [voteOptions, setVoteOptions] = useState<Option[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'votes' | 'events'>('all'); // New state variable
  const [statusFilter, setStatusFilter] = useState<'ongoing' | 'ended'>('ongoing'); // New state variable

  const handleStatusFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value as 'ongoing' | 'ended');
  };


  const isOngoing = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    return end > now;
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'votes' | 'events');
  };

  const fetchVotes = async () => {
    fetch('http://localhost:8088/votes')
      .then(response => response.json())
      .then(async (data) => {
        setVotes(data);
        const optionsPromises = data.map((vote: { id: number }) => fetchVoteOptions(vote.id));
        const allOptions = await Promise.all(optionsPromises);
        setVoteOptions(allOptions.flat());
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
      });
  };

  const fetchVoteOptions = async (voteId: number) => {
    return fetch(`http://localhost:8088/options/${voteId}`)
      .then(response => {
        if (!response.ok) {
          console.log('No options found for this voteId');
          throw new Error('No options found for this voteId');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  console.log(voteOptions);

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
          <div className='filterVoteEvent'>
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">Tous</option>
              <option value="votes">Votes</option>
              <option value="events">Evenements</option>
            </select>
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="ongoing">En Cours</option>
              <option value="ended">Terminés</option>
            </select>
          </div>
          <div className='vote-box'>
            {
              filter !== 'events' && votes.filter((vote: any) => statusFilter === 'ongoing' ? isOngoing(vote.endDate) : !isOngoing(vote.endDate)).map((vote: any) => {
                const options = Array.isArray(voteOptions) ? voteOptions.filter((option: Option) => option.voteId === vote.id) : [];
                return <VoteBox key={vote.id} vote={vote} options={options} />
              })
            }
          </div>
          <div className='event-box'>
            {
              filter !== 'votes' && events && events.filter((event: any) => event.membersOnly && (statusFilter === 'ongoing' ? isOngoing(event.endDate) : !isOngoing(event.endDate))).map((event: any) => {
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