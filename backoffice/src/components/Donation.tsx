import React from 'react';


type DonationType = {

    id?: number;
    amount?: number;
    donationDate?: Date;
    fullname?: string;
    email?: string;
    donatorId?: number;
    donationFrequency?: 'punctual';
};

type DonationProps = {
    donation: DonationType;
};

function Donation({ donation }: DonationProps) {
    return (
        <div>
            <p>Full Name: {donation.fullname}</p>
            <p>Email: {donation.email}</p>
            <p>Donation Amount: {donation.amount}</p>
            <p>Donator ID: {donation.donatorId}</p>
        </div>
    );
}

export default Donation;