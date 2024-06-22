import React, { useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';

function Performance() {
    const [totalDonationsMonth, setTotalDonationsMonth] = useState(0);
    const [membershipsMonth, setMembershipsMonth] = useState([]);
    const [totalMembershipRevenueMonth, setTotalMembershipRevenueMonth] = useState(0);


    useEffect(() => {

        fetch('http://localhost:8088/donations/totalMonth')
            .then(response => response.json())
            .then(data => setTotalDonationsMonth(data.totalDonationsMonth));

        fetch('http://localhost:8088/memberships/totalMonth')
            .then(response => response.json())
            .then(data => setTotalMembershipRevenueMonth(data.totalMonthMembership));

        fetch('http://localhost:8088/users/membersThisMonth')
            .then(response => response.json())
            .then(data => setMembershipsMonth(data));
    }, []);

    const totalRevenue = totalDonationsMonth + totalMembershipRevenueMonth;
    return (
        <div>
            <h1>Performance pour le mois</h1>
            <p>Dons : {totalDonationsMonth}</p>
            <p>Cotisations : {totalMembershipRevenueMonth}</p>
            <p>Total Revenue: {totalRevenue}</p>
            <p>Membres adhérés: {membershipsMonth.length}</p>
        </div>
    );
}

export default AuthCheck(Performance);