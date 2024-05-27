import React, { useState } from 'react';
import Account from './Account'

interface MembershipProps {
    account: Account;
    onMembershipChange: (id: number, newStatus: string, amount: number) => void;
}

const Membership: React.FC<MembershipProps> = ({ account, onMembershipChange }) => {
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    return (
        <div key={account.id}>
            <p>
                Membership Status: {account.membershipStatus}
                {account.membershipStatus === 'active' && account.membershipAmount && `(${account.membershipAmount}€/mois)`}
                {account.membershipStatus === 'active' && account.membershipStartDate && `Adhéré depuis ${account.membershipStartDate.toLocaleDateString()}`}
            </p>
            <button onClick={() => setShowMembershipOptions(!showMembershipOptions)}>
                {account.membershipStatus === 'inactive' ? 'Adherer' : 'Changer Adhesion'}
            </button>
            {showMembershipOptions && (
                <>
                    <button onClick={() => onMembershipChange(account.id, 'active', 10)}>10€/mois ADHesion</button>
                    <button onClick={() => onMembershipChange(account.id, 'active', 30)}>30€/mois ADHesion famille</button>
                    <button onClick={() => onMembershipChange(account.id, 'active', 50)}>50€/mois ADHesion soutien</button>
                    <button onClick={() => onMembershipChange(account.id, 'active', 100)}>100€/mois ADHesion bienfaiteur</button>
                    <button onClick={() => onMembershipChange(account.id, 'inactive', 0)}>Deactivate Membership</button>
                </>
            )}
        </div>
    );
};

export default Membership;