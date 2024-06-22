import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/membership.css';

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
const stripePromise = loadStripe('pk_test_51PScAqGc0PhuZBe9Uqm7XP3iXPKio8QNqbt4iNfSINUE06VzAPldOUwEgVn94rLLmQKd8STxK6fj12YKwBeiMRbS00DCyPSNGY');

const Membership: React.FC<MembershipProps> = ({ membership, onMembershipChange }) => {
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);
    const [membershipData, setMembershipData] = useState<Membership | null>(null);
    const [selectedAmount, setSelectedAmount] = useState<number>(membership.amount);


    const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedAmount(Number(value));
    };

    const handleValidateClick = async () => {
        const newStatus = selectedAmount === 0 ? 'inactive' : 'active';

        if (newStatus === 'active') {
            try {
                const response = await fetch('http://localhost:8088/payments/processMembership', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: membership.userId,
                        membershipId: membership.id,
                        amount: selectedAmount,
                    }),
                });

                const session = await response.json();
                const stripe = await stripePromise;

                if (stripe) {
                    const result = await stripe.redirectToCheckout({
                        sessionId: session.id,
                    });

                    if (result.error) {
                        console.log(result.error.message);
                    }
                } else {
                    console.log("Stripe.js has not loaded yet.");
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:8088/memberships/user/${userId}`)
                .then(response => response.json())
                .then(data => setMembershipData(data));
        }
    }, []);

    return (
        <div key={membership.id}>
            <p>
                Membership Status: {membership.status}
                {membership.status === 'active' && `(${membership.amount}€/mois)`}
                {membership.status === 'active' && `Adhéré depuis ${new Date(membership.paymentDate).toLocaleDateString()}`}
            </p>
            <button onClick={() => setShowMembershipOptions(!showMembershipOptions)}>
                {membership.status === 'inactive' ? 'Adherer' : 'Changer Adhesion'}
            </button>
            {showMembershipOptions && (
                <>
                    <label className='mb-label'>
                        Membership:
                        <select className='mb-select' value={selectedAmount} onChange={handleAmountChange}>

                            <option value="0">Deactivate Membership</option>
                            <option value="10">10€/mois ADHesion</option>
                            <option value="30">30€/mois ADHesion famille</option>
                            <option value="50">50€/mois ADHesion soutien</option>
                            <option value="100">100€/mois ADHesion bienfaiteur</option>
                        </select>
                    </label>
                    <button className='mb-validate' onClick={handleValidateClick}>Validate</button>
                </>
            )}
        </div>
    );
};

export default Membership;