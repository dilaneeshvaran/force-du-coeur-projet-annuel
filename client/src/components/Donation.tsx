import React, { useState } from 'react';
import Account from './Account';

interface DonationProps {
    donation: DonationInterface;
    onDonationChange: (id: number, newFrequency: 'monthly' | 'yearly' | 'punctual' | undefined, amount: number) => void;
}

export interface DonationInterface {
    id: number;
    amount: number;
    donationDate: Date;
    fullname: string;
    paymentMethod: string;
    email: string;
    donationFrequency: 'monthly' | 'yearly' | 'punctual';
    donatorId: number;
}

const Donation: React.FC<DonationProps> = ({ donation, onDonationChange }) => {
    const [donationAmount, setDonationAmount] = useState<number | ''>(donation.amount || '');
    const [donationFrequency, setDonationFrequency] = useState<'monthly' | 'yearly' | 'punctual'>(donation.donationFrequency);
    const [showDonationForm, setShowDonationForm] = useState<boolean>(false);
    const [tempFrequency, setTempFrequency] = useState<'monthly' | 'yearly' | 'punctual'>(donation.donationFrequency);
    const [tempAmount, setTempAmount] = useState<number | ''>(donation.amount || '');

    const handleDonation = () => {
        setDonationFrequency(tempFrequency);
        setDonationAmount(tempAmount);
        onDonationChange(donation.id, tempFrequency, Number(tempAmount));
        setShowDonationForm(false);
    };

    const handleCancelDonation = () => {
        onDonationChange(donation.id, 'punctual', 0);
        setDonationAmount('');
        setDonationFrequency('punctual');
        setShowDonationForm(false);
    };

    const handleFrequencyChange = (newFrequency: 'monthly' | 'yearly' | 'punctual') => {
        setTempFrequency(newFrequency);
    };

    const handleDonationFrequencyChange = (id: number, newFrequency: 'monthly' | 'yearly' | 'punctual' | undefined, amount: number) => {
        // Your function implementation here
    };

    const handleAmountChange = (newAmount: number) => {
        setTempAmount(newAmount);
    };

    return (
        <div key={donation.id}>
            {donationFrequency !== 'punctual' ? (
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

        </div>
    );
};

export default Donation;