import React, { useEffect, useState } from 'react';
import VoteBox, { Option } from '../components/Votebox';
import '../styles/monAssociation.css';
import EventBox from '../components/Eventbox';

interface CustomError extends Error {
  message: string;
}

function MonAssociation() {
  const [votes, setVotes] = useState<any>(null);
  const [voteOptions, setVoteOptions] = useState<Option[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [events, setEvents] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'votes' | 'events'>('all');
  const [statusFilter, setStatusFilter] = useState<'ongoing' | 'ended'>('ongoing');

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
          console.log('no options for this vote');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:8088/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error as CustomError);
    }
  };

  useEffect(() => {
    fetchVotes();
    fetchEvents();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!votes || !voteOptions || !events) {
    return <div>Loading...</div>;
  } else {
    const filteredVotes = votes.filter((vote: any) => statusFilter === 'ongoing' ? isOngoing(vote.endDate) : !isOngoing(vote.endDate));
    const filteredEvents = events.filter((event: any) => event.membersOnly && (statusFilter === 'ongoing' ? isOngoing(event.endDate) : !isOngoing(event.endDate)));

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
              filter !== 'events' && (
                filteredVotes.length > 0 ? filteredVotes.map((vote: any) => {
                  const options = Array.isArray(voteOptions) ? voteOptions.filter((option: Option) => option.voteId === vote.id) : [];
                  return <VoteBox key={vote.id} vote={vote} options={options} />
                }) : <div>Aucun vote {statusFilter === 'ongoing' ? 'en cours' : 'terminé'}.</div>
              )
            }
          </div>
          <div className='event-box'>
            {
              filter !== 'votes' && (
                filteredEvents.length > 0 ? filteredEvents.map((event: any) => {
                  return <EventBox key={event.id} event={event} />
                }) : <div>Aucun événement {statusFilter === 'ongoing' ? 'en cours' : 'terminé'}.</div>
              )
            }
          </div>
        </div >
      </>
    );
  }
}

export default MonAssociation;