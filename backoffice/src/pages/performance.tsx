import React, { useEffect, useState } from 'react';
import AuthCheck from '../components/AuthCheck';

async function fetchData(url: any) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

function Performance() {
    const [totalDonationsMonth, setTotalDonationsMonth] = useState(0);
    const [membershipsMonth, setMembershipsMonth] = useState([]);
    const [totalMembershipRevenueMonth, setTotalMembershipRevenueMonth] = useState(0);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const donationsData = await fetchData('http://localhost:8088/donations/totalMonth');
                setTotalDonationsMonth(donationsData.totalDonationsMonth);

                const membershipsData = await fetchData('http://localhost:8088/memberships/totalMonth');
                setTotalMembershipRevenueMonth(membershipsData.totalMonthMembership);

                const membersData = await fetchData('http://localhost:8088/users/membersThisMonth');
                setMembershipsMonth(membersData);
            } catch (error) {
                console.error("Failed to fetch performance data:", error);
            }
        };

        fetchPerformanceData();
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