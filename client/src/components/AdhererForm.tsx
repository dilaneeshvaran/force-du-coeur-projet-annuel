import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import '../styles/adhererForm.css';

interface AdhererFormProps {
    handleCloseClick: () => void;
}

const stripePromise = loadStripe('pk_test_51PScAqGc0PhuZBe9Uqm7XP3iXPKio8QNqbt4iNfSINUE06VzAPldOUwEgVn94rLLmQKd8STxK6fj12YKwBeiMRbS00DCyPSNGY');

export const AdhererForm: React.FC<AdhererFormProps> = ({ handleCloseClick }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<number>(10);
    const [errors, setErrors] = useState<string[]>([]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedAmount(Number(value));
    };

    const validatePassword = (password: string, confirmPassword: string) => {
        const errors = [];
        if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            errors.push("Mot de passe doit avoir au moins 8 caractères, avoir minimum une lettre majuscule, et un chiffre.");
        }
        if (password !== confirmPassword) {
            errors.push("Les mots de passe ne concordent pas.");
        }
        return errors;
    };

    const validatePhoneNumber = (phoneNumber: string) => {
        const phoneErrors = [];
        const phonePattern = /^\+?\d{10,15}$/;
        if (!phonePattern.test(phoneNumber)) {
            phoneErrors.push("Le numéro de téléphone doit être entre 10 et 15 chiffres et peut commencer par '+' pour le code du pays.");
        }
        return phoneErrors;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleValidateClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const passwordErrors = validatePassword(password, confirmPassword);
        const phoneErrors = validatePhoneNumber(phoneNumber);

        if (passwordErrors.length > 0 || phoneErrors.length > 0) {
            setErrors([...passwordErrors, ...phoneErrors]);
            return;
        }

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
            <form className='registerForm' onSubmit={handleValidateClick}>
                <label className='label-register'>
                    Nom:
                    <input className='inputRegister' type="text" name="firstname" required onChange={e => setFirstName(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Prénom:
                    <input className='inputRegister' type="text" name="lastname" required onChange={e => setLastName(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Date de naissance:
                    <input className='inputRegister'
                        type="date"
                        name="dob"
                        required
                        max="2020-12-31"
                        onChange={e => setDob(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Email:
                    <input className='inputRegister' type="email" name="email" required onChange={e => setEmail(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Mot de passe:
                    <input className='inputRegister' type="password" name="password" required onChange={handlePasswordChange} />
                </label><br />
                <label className='label-register'>
                    Confirmer Mot de passe:
                    <input className='inputRegister' type="password" name="confirmPassword" required onChange={handleConfirmPasswordChange} />
                </label><br />
                <label className='label-register'>
                    Téléphone:
                    <input className='inputRegister'
                        type="tel"
                        name="phoneNumber"
                        required
                        onChange={e => setPhoneNumber(e.target.value)}
                        pattern="\+?\d{10,15}"
                        placeholder='Ex: 0612345678'
                        title="Le numéro de téléphone doit commencer avec '0' ou '+(code pays)'" />
                </label><br />
                <label className='label-register'>
                    Pays:
                    <input className='inputRegister' type="text" name="country" required onChange={e => setCountry(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Ville:
                    <input className='inputRegister' type="text" name="city" required onChange={e => setCity(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Adresse:
                    <input className='inputRegister' type="text" name="address" required onChange={e => setAddress(e.target.value)} />
                </label><br />
                <label className='label-register'>
                    Adhésion:
                    <select className='selectRegister' value={selectedAmount} onChange={handleAmountChange}>
                        <option value="10">10€/mois Adhésion</option>
                        <option value="30">30€/mois Adhésion famille</option>
                        <option value="50">50€/mois Adhésion soutien</option>
                        <option value="100">100€/mois Adhésion bienfaiteur</option>
                    </select>
                </label><br />
                {errors.length > 0 && (
                    <div style={{ color: 'red' }}>
                        {errors.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
                <input className='submitRegister' type="submit" value="Adhérer" />
            </form>
            <button className='btn-register-close' onClick={handleCloseClick}>Fermer</button>
        </div>
    );
};

export default AdhererForm;
