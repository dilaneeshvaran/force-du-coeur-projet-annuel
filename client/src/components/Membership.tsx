import React, { useState } from 'react';

interface Membership {
    id: number;
    amount: number;
    paymentDate: Date;
    userId: number;
    status: 'active' | 'inactive';
}

interface MembershipProps {
    membership: Membership;
    onMembershipChange: (id: number, newStatus: 'active' | 'inactive', amount: number) => void;
}

const Membership: React.FC<MembershipProps> = ({ membership, onMembershipChange }) => {
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const handleMembershipChange = (newStatus: 'active' | 'inactive', amount: number) => {
        onMembershipChange(membership.id, newStatus, amount);
    };

    return (
        <div key={membership.id}>
            <p>
                Membership Status: {membership.status}
                {membership.status === 'active' && `(${membership.amount}€/mois)`}
                {membership.status === 'active' && `Adhéré depuis ${membership.paymentDate.toLocaleDateString()}`}
            </p>
            <button onClick={() => setShowMembershipOptions(!showMembershipOptions)}>
                {membership.status === 'inactive' ? 'Adherer' : 'Changer Adhesion'}
            </button>
            {showMembershipOptions && (
                <label>
                    Membership:
                    <select onChange={(e) => {
                        const value = e.target.value;
                        const newStatus = value === '0' ? 'inactive' : 'active';
                        handleMembershipChange(newStatus, Number(value));
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