import '../styles/taches.css';
import { useState } from 'react';
import Membership from '../components/Membership';
import Account from '../components/Account';
import Donation from '../components/Donation';

export interface Donation {
    amount: number | undefined;
    date: Date;
    frequency: 'monthly' | 'yearly' | 'none';
}

function ManageAccount() {
    const [account, setAccount] = useState<Account[]>([
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
            dateOfBirth: new Date('1990-01-01'),
            membershipStatus: 'inactive',
            donationFrequency: 'none',
        },
    ]);

    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const [selectedType, setSelectedType] = useState('account');

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleMembershipChange = (id: number, newStatus: string, amount: number) => {
        const newStartDate = newStatus === 'active' ? new Date() : undefined;
        setAccount(account.map(acc => acc.id === id ? { ...acc, membershipStatus: newStatus, membershipAmount: amount, membershipStartDate: newStartDate } : acc));
        setShowMembershipOptions(false);
    };


    const handleDonationFrequencyChange = (id: number, newFrequency: 'monthly' | 'yearly' | 'none' | undefined, amount: number) => {
        setAccount(account.map(acc => acc.id === id ? { ...acc, donationFrequency: newFrequency, donationAmount: amount, donations: newFrequency ? [...(acc.donations || []), { amount, date: new Date(), frequency: newFrequency }] : acc.donations } : acc));
    };


    const handleAccountChange = (id: number, field: string, value: any) => {
        console.log(`Update account with id ${id}: set ${field} to ${value}`);

        setAccount((prevAccount) => prevAccount.map(acc => {
            if (acc.id === id) {
                return { ...acc, [field]: value };
            }
            return acc;
        }));
    };

    return (
        <div className="taches-box">
            <div className='nav-taches'>
                <a href='#' className='nav-taches-link' onClick={() => handleTypeClick('account')}>Mon Compte</a>
                <a href='#' className='nav-taches-link' onClick={() => handleTypeClick('membership')}>Mon Adhesion</a>
                <a href='#' className='nav-taches-link' onClick={() => handleTypeClick('donation')}>Mes Dons</a>
            </div>
            <div className='taches-list'>
                {selectedType === 'account' && account.map((acc) => (
                    <Account account={acc} onAccountChange={handleAccountChange} />
                ))}
                {selectedType === 'membership' && account.map((acc) => (
                    <Membership account={acc} onMembershipChange={handleMembershipChange} />
                ))}
                {selectedType === 'donation' && account.map((acc) => (
                    <Donation account={acc} onDonationChange={handleDonationFrequencyChange} />
                ))}
            </div>
        </div>
    );
}

export default ManageAccount;