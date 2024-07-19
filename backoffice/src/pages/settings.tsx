import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AuthCheck from '../components/AuthCheck';
import Membership from '../components/Membership';
import Account from '../components/Account';
import '../styles/settings.css';

function Settings() {
    const [isEditingMembership, setIsEditingMembership] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [editingAccount, setEditingAccount] = useState<Account | null>(null);
    const [editingMembership, setEditingMembership] = useState<Membership | null>(null);
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [accounts, setAccounts] = useState<Account[]>([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetch(`http://localhost:8088/memberships/user/${userId}`)
            .then(response => response.json())
            .then(data => setMemberships(data))
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

    const handleAccountChange = (id: number, field: string, value: any) => {
        console.log(`Update account with id ${id}: set ${field} to ${value}`);

        setAccounts((prevAccounts) => prevAccounts.map(acc => {
            if (acc.id === id) {
                return { ...acc, [field]: value };
            }
            return acc;
        }));
    };

    const handleMembershipChange = (id: number, newStatus: 'active' | 'inactive', amount: number) => {
        const newPaymentDate = newStatus === 'active' ? new Date() : new Date(0);
        setMemberships(memberships.map(mem => mem.id === id ? { ...mem, status: newStatus, amount: amount, paymentDate: newPaymentDate } : mem));
        setIsEditingMembership(false);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    return (
        <div>
            {!isEditingProfile && !isEditingMembership && (
                accounts.map((acc) => (
                    <button key={acc.id} className='btn-profil-change' onClick={() => {
                        setIsEditingProfile(true);
                        setEditingAccount(acc);
                    }}>Modifier les infos de profil</button>
                ))
            )}

            {isEditingProfile && (
                <>
                    {editingAccount && <Account account={editingAccount} onAccountChange={handleAccountChange} />}
                    <button className='setting-return' onClick={() => setIsEditingProfile(false)}>Return</button>
                </>
            )}

            <div className='setMembership'>
                {!isEditingMembership && !isEditingProfile && (
                    memberships.map((mem) => (
                        <button key={mem.id} className='btn-membership-change' onClick={() => {
                            setIsEditingMembership(true);
                            setEditingMembership(mem);
                        }}>Modifier l'adhésion</button>
                    ))
                )}

                {isEditingMembership && (
                    <>
                        {editingMembership && <Membership membership={editingMembership} onMembershipChange={handleMembershipChange} />}
                        <button className='setting-return' onClick={() => setIsEditingMembership(false)}>Retour</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthCheck(Settings);
