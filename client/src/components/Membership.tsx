import React, { useState } from 'react';
import Account from './Account'

interface MembershipProps {
    account: Account;
    onMembershipChange: (id: number, newStatus: 'active' | 'inactive', amount: number) => void;
}

const Membership: React.FC<MembershipProps> = ({ account }) => {
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);
    const [membershipStatus, setMembershipStatus] = useState(account.membershipStatus);
    const [membershipAmount, setMembershipAmount] = useState(account.membershipAmount);

    const onMembershipChange = (newStatus: string, amount: number) => {
        setMembershipStatus(newStatus);
        setMembershipAmount(amount);
    };

    return (
        <div key={account.id}>
            <p>
                Membership Status: {membershipStatus}
                {membershipStatus === 'active' && membershipAmount && `(${membershipAmount}€/mois)`}
                {membershipStatus === 'active' && account.membershipStartDate && `Adhéré depuis ${account.membershipStartDate.toLocaleDateString()}`}
            </p>
            <button onClick={() => setShowMembershipOptions(!showMembershipOptions)}>
                {membershipStatus === 'inactive' ? 'Adherer' : 'Changer Adhesion'}
            </button>
            {showMembershipOptions && (
                <label>
                    Membership:
                    <select onChange={(e) => {
                        const value = e.target.value;
                        const newStatus = value === '0' ? 'inactive' : 'active';
                        onMembershipChange(newStatus, Number(value));
                    }}>
                        <option value="0">Deactivate Membership</option>
                        <option value="10">10€/mois ADHesion</option>
                        <option value="30">30€/mois ADHesion famille</option>
                        <option value="50">50€/mois ADHesion soutien</option>
                        <option value="100">100€/mois ADHesion bienfaiteur</option>
                    </select>
                </label>
            )}
        </div>
    );
};

export default Membership;