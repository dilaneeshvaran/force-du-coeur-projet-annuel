import React, { useEffect, useState } from 'react';

function Performance() {
    const [donations, setDonations] = useState([
        { amount: 100 },
        { amount: 200 },
        { amount: 150 },
    ]);
    const [traffic, setTraffic] = useState([
        { revenue: 50 },
        { revenue: 75 },
        { revenue: 125 },
    ]);
    const [memberships, setMemberships] = useState([
        { fee: 300 },
        { fee: 200 },
        { fee: 250 },
    ]);

    const totalDonationRevenue = donations.reduce((total, donation) => total + donation.amount, 0);
    const totalTrafficRevenue = traffic.reduce((total, visit) => total + visit.revenue, 0);
    const totalMembershipRevenue = memberships.reduce((total, membership) => total + membership.fee, 0);

    const totalRevenue = totalDonationRevenue + totalTrafficRevenue + totalMembershipRevenue;

    return (
        <div>
            <h1>Performance pour le mois</h1>
            <p>Dons : {totalDonationRevenue}</p>
            <p>Cotisations : {totalMembershipRevenue}</p>
            <p>Total Revenue: {totalRevenue}</p>
            <p>Visiteurs : {traffic.length}</p>
            <p>Membres adhérés: {memberships.length}</p>
        </div>
    );
}

export default Performance;