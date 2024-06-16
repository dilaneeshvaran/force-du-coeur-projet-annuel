import '../styles/taches.css';
import { useState } from 'react';
import Membership from '../components/Membership';
import Account from '../components/Account';
import Donation, { DonationInterface } from '../components/Donation';
import { useLocation } from 'react-router-dom';

function ManageAccount() {
    const [memberships, setMemberships] = useState<Membership[]>([
        {
            id: 1,
            amount: 0,
            paymentDate: new Date(),
            userId: 1,
            status: 'inactive',
        },
    ]);
    const [donations, setDonations] = useState<DonationInterface[]>([
        {
            id: 1,
            amount: 0,
            donationDate: new Date(),
            fullname: "billa",
            paymentMethod: "paypal",
            email: "k@l.com",
            donationFrequency: 'monthly',
            donatorId: 1
        },
    ]);
    const [accounts, setAccounts] = useState<Account[]>([]); // Define the account state

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSelectedType = queryParams.get('selectedType') || 'account';

    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const [selectedType, setSelectedType] = useState(initialSelectedType);

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
    };

    const handleMembershipChange = (id: number, newStatus: 'active' | 'inactive', amount: number) => {
        const newPaymentDate = newStatus === 'active' ? new Date() : new Date(0);
        setMemberships(memberships.map(mem => mem.id === id ? { ...mem, status: newStatus, amount: amount, paymentDate: newPaymentDate } : mem));
        setShowMembershipOptions(false);
    };

    const handleDonationFrequencyChange = (id: number, newFrequency: 'monthly' | 'yearly' | 'punctual' | undefined, amount: number) => {
        if (newFrequency === undefined) {
            return;
        }
        setDonations(donations.map(don => don.id === id ? { ...don, donationFrequency: newFrequency, donationAmount: amount } : don));
    };

    const handleAccountChange = (id: number, field: string, value: any) => {
        console.log(`Update account with id ${id}: set ${field} to ${value}`);

        setAccounts((prevAccount) => prevAccount.map(acc => {
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
                {selectedType === 'account' && accounts.map((acc) => (
                    <Account account={acc} onAccountChange={handleAccountChange} />
                ))}
                {selectedType === 'membership' && memberships.map((mem) => (
                    <Membership membership={mem} onMembershipChange={handleMembershipChange} />
                ))}
                {selectedType === 'donation' && donations.map((don) => (
                    <Donation donation={don} onDonationChange={handleDonationFrequencyChange} />
                ))}
            </div>
        </div>
    );
}

export default ManageAccount;