import React, { useState } from 'react';
import Donation from '../components/Donation';
import Membership from '../components/Membership';
import AuthCheck from '../components/AuthCheck';

type DonationType = {
    fullName: string;
    email: string;
    donationTime: Date;
    donationType: 'periodic' | 'onetime';
    donationPeriod: 'monthly' | 'yearly' | null;
    donationAmount: number;
    donationDate: Date;
};

type MembershipType = {
    userName: string;
    email: string;
    startDate: Date;
    amountPaid: number;
};

function FinanceInformation() {
    const [donations, setDonations] = useState<DonationType[]>([]);
    const [memberships, setMemberships] = useState<MembershipType[]>([]);
    const [filter, setFilter] = useState<'all' | 'donations' | 'memberships'>('all');
    const [donationFilter, setDonationFilter] = useState<'all' | 'periodic' | 'onetime'>('all');
    const [startDateFilter, setStartDateFilter] = useState<Date | null>(null);
    const [endDateFilter, setEndDateFilter] = useState<Date | null>(null);

    const totalDonations = donations.reduce((total, donation) => total + donation.donationAmount, 0);
    const totalMemberships = memberships.reduce((total, membership) => total + membership.amountPaid, 0);
    const totalRaised = totalDonations + totalMemberships;

    const filteredDonations = donations.filter(donation => {
        return (donationFilter === 'all' || donation.donationType === donationFilter) &&
            (!startDateFilter || donation.donationDate >= startDateFilter) &&
            (!endDateFilter || donation.donationDate <= endDateFilter);
    });

    const filteredMemberships = memberships.filter(membership => {
        return (filter === 'all' || filter === 'memberships') &&
            (!startDateFilter || membership.startDate >= startDateFilter) &&
            (!endDateFilter || membership.startDate <= endDateFilter);
    });

    return (
        <div>
            <h2>Finance Information</h2>
            <p>Total Amount Raised: {totalRaised}</p>
            <p>Total Donations: {totalDonations}</p>
            <p>Total Membership Amount: {totalMemberships}</p>

            <h3>Filter</h3>
            <select value={filter} onChange={e => setFilter(e.target.value as 'all' | 'donations' | 'memberships')}>
                <option value="all">All</option>
                <option value="donations">Donations</option>
                <option value="memberships">Memberships</option>
            </select>

            {filter === 'donations' && (
                <select value={donationFilter} onChange={e => setDonationFilter(e.target.value as 'all' | 'periodic' | 'onetime')}>
                    <option value="all">All Donations</option>
                    <option value="periodic">Periodic Donations</option>
                    <option value="onetime">One-time Donations</option>
                </select>
            )}

            <label>Start Date</label><input type="date" onChange={e => setStartDateFilter(e.target.value ? new Date(e.target.value) : null)} />
            <label>End Date</label><input type="date" onChange={e => setEndDateFilter(e.target.value ? new Date(e.target.value) : null)} />

            <h3>Donations</h3>
            {filteredDonations.map((donation, index) => (
                <Donation key={index} donation={donation} />
            ))}

            <h3>Memberships</h3>
            {filteredMemberships.map((membership, index) => (
                <Membership key={index} membership={membership} />
            ))}
        </div>
    );
}

export default AuthCheck(FinanceInformation);