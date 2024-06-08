import React, { useState } from 'react';
import { Donation as DonationType } from '../pages/manageAccount';
import Account from './Account';

interface DonationProps {
    account: Account;
    onDonationChange: (id: number, newFrequency: 'monthly' | 'yearly' | 'none' | undefined, amount: number) => void;
}

const Donation: React.FC<DonationProps> = ({ account, onDonationChange }) => {
    const [donationAmount, setDonationAmount] = useState<number | ''>(account.donationAmount || '');
    const [donationFrequency, setDonationFrequency] = useState<'monthly' | 'yearly' | 'none'>(account.donationFrequency || 'none');
    const [showDonationForm, setShowDonationForm] = useState<boolean>(false);
    const [tempFrequency, setTempFrequency] = useState<'monthly' | 'yearly' | 'none'>(account.donationFrequency || 'none');
    const [tempAmount, setTempAmount] = useState<number | ''>(account.donationAmount || '');

    const handleDonation = () => {
        setDonationFrequency(tempFrequency);
        setDonationAmount(tempAmount);
        onDonationChange(account.id, tempFrequency, Number(tempAmount));
        setShowDonationForm(false);
    };

    const handleCancelDonation = () => {
        onDonationChange(account.id, 'none', 0);
        setDonationAmount('');
        setDonationFrequency('none');
        setShowDonationForm(false);
    };

    const handleFrequencyChange = (newFrequency: 'monthly' | 'yearly' | 'none') => {
        setTempFrequency(newFrequency);
    };

    const handleAmountChange = (newAmount: number) => {
        setTempAmount(newAmount);
    };



    return (
        <div key={account.id}>
            {donationFrequency !== 'none' ? (
                <>
                    <p>Donation Frequency: {donationFrequency} ({donationAmount}€)</p>
                    <button onClick={() => setShowDonationForm(!showDonationForm)}>
                        {showDonationForm ? 'Close' : 'Manage Donation'}
                    </button>
                    {showDonationForm && (
                        <div>
                            <input
                                type="number"
                                value={tempAmount}
                                onChange={(e) => handleAmountChange(Number(e.target.value))}
                            />
                            <div>
                                <button onClick={() => handleFrequencyChange('monthly')}>Mensuel</button>
                                <button onClick={() => handleFrequencyChange('yearly')}>Annuel</button>
                            </div>
                            <button onClick={handleDonation}>Valider le don</button>
                            <button onClick={handleCancelDonation}>Arreter le don</button>
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p>No active donation</p>
                    <button onClick={() => setShowDonationForm(true)}>
                        {showDonationForm ? 'Close' : 'Create Donation'}
                    </button>
                    {showDonationForm && (
                        <div>
                            <input
                                type="number"
                                value={tempAmount}
                                onChange={(e) => handleAmountChange(Number(e.target.value))}
                            />
                            <div>
                                <button onClick={() => handleFrequencyChange('monthly')}>Mensuel</button>
                                <button onClick={() => handleFrequencyChange('yearly')}>Annuel</button>
                            </div>
                            <button onClick={handleDonation}>Valider le don</button>
                        </div>
                    )}
                </>
            )}
            {account.donations && (
                <div>
                    <h3>History of Donations:</h3>
                    {account.donations.map((donation: DonationType, index: number) => (
                        <p key={index}>Donated {donation.amount}€ on {new Date(donation.date).toLocaleDateString()} ({donation.frequency})</p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Donation;
