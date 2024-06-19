import '../styles/manageAccount.css';
import { useEffect, useState } from 'react';
import Membership from '../components/Membership';
import Account from '../components/Account';
import Donation, { DonationInterface } from '../components/Donation';
import { useLocation } from 'react-router-dom';

function ManageAccount() {
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [donations, setDonations] = useState<DonationInterface[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`http://localhost:8088/memberships/user/${userId}`)
            .then(response => response.json())
            .then(data => setMemberships(data))
            .catch(error => console.error('Error:', error));

        fetch(`http://localhost:8088/donations/user/${userId}`)
            .then(response => response.json())
            .then(data => setDonations(data))
            .catch(error => console.error('Error:', error));
    }, [userId]);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:8088/users/${userId}`)
                .then(response => response.json())
                .then(data => setAccounts(Array.isArray(data) ? data : [data]))
                .catch(error => console.error('Error:', error));
        }
    }, []);


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
        <div className="acc-box">
            <div className='nav-acc'>
                <a href='#' className={`nav-acc-link ${selectedType === 'account' ? 'nav-acc-link-selected' : ''}`} onClick={() => handleTypeClick('account')}>Mon Compte</a>
                <a href='#' className={`nav-acc-link ${selectedType === 'membership' ? 'nav-acc-link-selected' : ''}`} onClick={() => handleTypeClick('membership')}>Mon Adhesion</a>
            </div>

            <div className='acc-list'>
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