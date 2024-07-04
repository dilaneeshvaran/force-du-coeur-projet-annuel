import React, { useState, useEffect } from 'react';
import AuthCheck from '../components/AuthCheck';
import '../styles/finance.css';

type DonationType = {
    id?: number;
    amount?: number;
    donationDate?: Date;
    fullname?: string;
    email?: string;
    donatorId?: number;
};

type MembershipType = {
    id?: number;
    amount?: number;
    paymentDate?: Date;
    userId?: number;
};

type UserType = {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
};

type UsersStateType = {
    [key: number]: UserType;
};

function FinanceInformation() {
    const [donations, setDonations] = useState<DonationType[]>([]);
    const [memberships, setMemberships] = useState<MembershipType[]>([]);
    const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
    const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);
    const [viewType, setViewType] = useState<'donations' | 'memberships'>('donations');
    const [users, setUsers] = useState<UsersStateType>({});

    useEffect(() => {
        const fetchDonations = async () => {
            const response = await fetch('http://localhost:8088/donations');
            const data = await response.json();
            setDonations(data);
        };

        const fetchMemberships = async () => {
            const response = await fetch('http://localhost:8088/memberships');
            const data = await response.json();
            setMemberships(data);
        };

        fetchDonations();
        fetchMemberships();
    }, []);

    const fetchUserById = async (userId: number) => {
        if (!users[userId]) {
            const response = await fetch(`http://localhost:8088/users/${userId}`);
            const data: UserType = await response.json();
            setUsers((prevUsers) => ({ ...prevUsers, [userId]: data }));
        }
    };

    useEffect(() => {
        donations.forEach(donation => {
            if (donation.donatorId) {
                fetchUserById(donation.donatorId);
            }
        });

        memberships.forEach(membership => {
            if (membership.userId) {
                fetchUserById(membership.userId);
            }
        });
    }, [donations, memberships]);

    const filteredDonations = donations.filter(donation => {
        const donationDate = donation.donationDate ? new Date(donation.donationDate) : null;
        return (!startDateFilter || (donationDate && donationDate >= startDateFilter)) &&
            (!endDateFilter || (donationDate && donationDate <= endDateFilter));
    });

    const filteredMemberships = memberships.filter(membership => {
        const paymentDate = membership.paymentDate ? new Date(membership.paymentDate) : null;
        return (!startDateFilter || (paymentDate && paymentDate >= startDateFilter)) &&
            (!endDateFilter || (paymentDate && paymentDate <= endDateFilter));
    });

    return (
        <div className='content-dons-cotisations'>
            <h2 className='header-title'>Dons & Cotisations</h2>

            <label className='date-label'>Date Début</label>
            <input type="date" className='date-input' onChange={e => setStartDateFilter(e.target.value ? new Date(e.target.value) : null)} />
            <label className='date-label'>Date Fin</label>
            <input type="date" className='date-input' onChange={e => setEndDateFilter(e.target.value ? new Date(e.target.value) : null)} />

            <div className='finance-options'>
                <button className='finance-button' onClick={() => setViewType('donations')} style={{ backgroundColor: viewType === "donations" ? 'gray' : ' #0056b3' }}>Voir les Dons</button>
                <button className='finance-button' onClick={() => setViewType('memberships')} style={{ backgroundColor: viewType === "memberships" ? 'gray' : ' #0056b3' }}>Voir les Adhésions</button>
            </div>

            {viewType === 'donations' ? (
                <div className='donations-list'>
                    <h3 className='list-title'>Dons</h3>
                    {filteredDonations.map((donation, index) => (
                        <div className='dons-labels' key={donation.id}>
                            <p className='label-text'>Nom et Prénom: {donation.fullname}</p>
                            <p className='label-text'>
                                Date de don : {
                                    donation.donationDate ? (
                                        (() => {
                                            const date = new Date(donation.donationDate);
                                            const day = date.getDate().toString().padStart(2, '0');
                                            const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                            const year = date.getFullYear().toString().slice(-2);
                                            const hours = date.getHours().toString().padStart(2, '0');
                                            const minutes = date.getMinutes().toString().padStart(2, '0');
                                            return `${day}/${month}/${year} à : ${hours}h${minutes}`;
                                        })()
                                    ) : 'N/A'
                                }
                            </p>                            <p className='label-text'>Email: {donation.email}</p>
                            <p className='label-text'>Montant: {donation.amount}</p>
                            {donation.donatorId && users[donation.donatorId] && (
                                <p className='label-text'>Membre adhéré: {users[donation.donatorId].firstname} {users[donation.donatorId].lastname} (email: {users[donation.donatorId].email})</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='memberships-list'>
                    <h3 className='list-title'>Adhésions</h3>
                    {filteredMemberships.map((membership, index) => (
                        <div className='cotisations-labels' key={membership.id}>
                            {membership.userId && users[membership.userId] && (
                                <p className='label-text'>Nom et Prénom: {users[membership.userId].firstname} {users[membership.userId].lastname} (email: {users[membership.userId].email})</p>
                            )}
                            <p className='label-text'>Montant: {membership.amount}</p>
                            <p className='label-text'>Date de Payment: {
                                membership.paymentDate ? (
                                    (() => {
                                        const date = new Date(membership.paymentDate);
                                        const day = date.getDate().toString().padStart(2, '0');
                                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                        const year = date.getFullYear().toString().slice(-2);
                                        const hours = date.getHours().toString().padStart(2, '0');
                                        const minutes = date.getMinutes().toString().padStart(2, '0');
                                        return `${day}/${month}/${year} à : ${hours}h${minutes}`;
                                    })()
                                ) : 'N/A'
                            }</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}

export default AuthCheck(FinanceInformation);
