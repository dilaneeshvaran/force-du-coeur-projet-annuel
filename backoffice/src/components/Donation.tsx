import React from 'react';

type DonationProps = {
    donation: {
        fullName: string;
        email: string;
        donationTime: Date;
        donationType: 'periodic' | 'onetime';
        donationPeriod: 'monthly' | 'yearly' | null;
        donationAmount: number;
        donationDate: Date;
    };
};

function Donation({ donation }: DonationProps) {
    return (
        <div>
            <p>Full Name: {donation.fullName}</p>
            <p>Email: {donation.email}</p>
            <p>Donation Time: {donation.donationTime.toString()}</p>
            <p>Donation Type: {donation.donationType}</p>
            {donation.donationType === 'periodic' && <p>Donation Period: {donation.donationPeriod}</p>}
            <p>Donation Amount: {donation.donationAmount}</p>
            <p>Donation Date: {donation.donationDate.toString()}</p>
        </div>
    );
}

export default Donation;