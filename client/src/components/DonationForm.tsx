import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/donationForm.css'

const stripePromise = loadStripe('pk_test_51PScAqGc0PhuZBe9Uqm7XP3iXPKio8QNqbt4iNfSINUE06VzAPldOUwEgVn94rLLmQKd8STxK6fj12YKwBeiMRbS00DCyPSNGY');

interface DonationFormProps {
    handleCloseClick: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ handleCloseClick }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [email, setEmail] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8088/payments/processPayment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount,
                    name: name,
                    email: email,
                    userId: localStorage.getItem('userId') || null,
                    typeDonation: 'donation',
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
    };

    return (
        <div className='contentBoxDonation'>
            <h3>Faire un don</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Nom Prénom:
                    <input type="text" name="name" required onChange={e => setName(e.target.value)} />
                </label><br></br>
                <label>
                    Montant:
                    <input type="number" name="amount" required onChange={e => setAmount(Number(e.target.value))} />
                </label><br></br>
                <label>
                    Email:
                    <input type="email" name="email" required onChange={e => setEmail(e.target.value)} />
                </label><br></br>
                <input type="submit" value="Valider" />
            </form>
            <button onClick={handleCloseClick}>Fermer</button>
        </div>
    );
}