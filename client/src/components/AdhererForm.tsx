import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/adhererForm.css'

interface AdhererFormProps {
    handleCloseClick: () => void;
}
const stripePromise = loadStripe('pk_test_51PScAqGc0PhuZBe9Uqm7XP3iXPKio8QNqbt4iNfSINUE06VzAPldOUwEgVn94rLLmQKd8STxK6fj12YKwBeiMRbS00DCyPSNGY');



export const AdhererForm: React.FC<AdhererFormProps> = ({ handleCloseClick }) => {
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [dob, setDob] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [country, setCountry] = useState<string>();
    const [city, setCity] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [selectedAmount, setSelectedAmount] = useState<number>(10);


    const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedAmount(Number(value));
    };

    const handleValidateClick = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8088/payments/processRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: selectedAmount,
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    email: email,
                    password: password,
                    phoneNumber: phoneNumber,
                    country: country,
                    city: city,
                    address: address,
                    typeRegister: 'register',
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
        <div className='contentBoxRegister'>
            <h3>Adhérer à 'Force du Coeur'</h3>
            <form onSubmit={handleValidateClick}>
                <label>
                    First Name:
                    <input type="text" name="firstname" required onChange={e => setFirstName(e.target.value)} />
                </label><br></br>
                <label>
                    Last Name:
                    <input type="text" name="lastname" required onChange={e => setLastName(e.target.value)} />
                </label><br></br>
                <label>
                    Date of Birth:
                    <input type="date" name="dob" required onChange={e => setDob(e.target.value)} />
                </label><br></br>
                <label>
                    Email:
                    <input type="email" name="email" required onChange={e => setEmail(e.target.value)} />
                </label><br></br>
                <label>
                    Password:
                    <input type="password" name="password" required onChange={e => setPassword(e.target.value)} />
                </label><br></br>
                <label>
                    Phone Number:
                    <input type="tel" name="phoneNumber" required onChange={e => setPhoneNumber(e.target.value)} />
                </label><br></br>
                <label>
                    Country:
                    <input type="text" name="country" required onChange={e => setCountry(e.target.value)} />
                </label><br></br>
                <label>
                    City:
                    <input type="text" name="city" required onChange={e => setCity(e.target.value)} />
                </label><br></br>
                <label>
                    Address:
                    <input type="text" name="address" required onChange={e => setAddress(e.target.value)} />
                </label><br></br>
                <label>

                    Membership:
                    <select value={selectedAmount} onChange={handleAmountChange}>
                        <option value="10">10€/mois ADHesion</option>
                        <option value="30">30€/mois ADHesion famille</option>
                        <option value="50">50€/mois ADHesion soutien</option>
                        <option value="100">100€/mois ADHesion bienfaiteur</option>
                    </select>
                </label><br></br>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={handleCloseClick}>Close</button>
        </div>
    );
}