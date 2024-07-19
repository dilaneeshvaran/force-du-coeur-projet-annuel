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
            <p>Nom Complet: {donation.fullname}</p>
            <p>Email: {donation.email}</p>
            <p>Montant de don: {donation.amount}</p>
            <p>id don: {donation.donatorId}</p>
        </div>
    );
}

export default Donation;