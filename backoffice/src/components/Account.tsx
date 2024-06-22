import React, { useState } from 'react';
import '../styles/account.css'

interface Account {
    id: number;
    username: string;
    email?: string;
    password: string;
    firstname: string;
    lastname?: string;
}

interface AccountProps {
    account: Account;
    onAccountChange?: (id: number, field: string, value: any) => void;
}

const Account: React.FC<AccountProps> = ({ account, onAccountChange }) => {
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [tempUsername, setTempUsername] = useState<string>(account.username);
    const [tempEmail, setTempEmail] = useState<string | undefined>(account.email);
    const [tempFirstname, setTempFirstname] = useState<string>(account.firstname);
    const [tempLastname, setTempLastname] = useState<string | undefined>(account.lastname);
    const [tempPassword, setTempPassword] = useState<string>(account.password);
    const [tempConfirmPassword, setTempConfirmPassword] = useState<string>('');
    const [showPasswordInputs, setShowPasswordInputs] = useState<boolean>(false);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [confirmationMessage, setConfirmationMessage] = useState<string>('');


    const handleUserInfoSave = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(tempEmail || '')) {
            setConfirmationMessage('email not valid');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
            return;
        }
        if (!tempEmail || !tempFirstname || !tempLastname) {
            setConfirmationMessage('svp ne laissez aucun champ vide!');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
            return;
        }
        const updatedAccount = {
            id: account.id,
            email: tempEmail,
            firstname: tempFirstname,
            lastname: tempLastname,
        };



        fetch('http://localhost:8088/users/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAccount)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        if (onAccountChange) {
            onAccountChange(account.id, 'username', tempUsername);
            onAccountChange(account.id, 'email', tempEmail);
            onAccountChange(account.id, 'firstname', tempFirstname);
            onAccountChange(account.id, 'lastname', tempLastname);
        }
        setShowEditForm(false);
        setConfirmationMessage('User info saved successfully!');
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
    };

    const handlePasswordSave = async () => {
        if (!tempPassword || !tempConfirmPassword) {
            setConfirmationMessage('saisissez un mot de passe valide!');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
            return;
        }
        if (tempPassword != tempConfirmPassword) {
            setConfirmationMessage('mot de passe ne concordent pas!');
            setShowConfirmation(true);
            setTimeout(() => setShowConfirmation(false), 2000);
            return;
        }
        const updatedAccount = {
            id: account.id,
            password: tempPassword
        };


        fetch('http://localhost:8088/users/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedAccount)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        if (onAccountChange) {
            onAccountChange(account.id, 'password', tempPassword);
        }
        setShowEditForm(false);
        setConfirmationMessage('User info saved successfully!');
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 2000);
    };

    return (
        <div key={account.id} className='account'>
            <div className="account-info">
                <div className="info-item">
                    <p className="info-title">Email:</p>
                    <p className="info-value">{account.email}</p>
                </div>
                <div className="info-item">
                    <p className="info-title">Firstname:</p>
                    <p className="info-value">{account.firstname}</p>
                </div>
                <div className="info-item">
                    <p className="info-title">Lastname:</p>
                    <p className="info-value">{account.lastname}</p>
                </div>
            </div>
            <button onClick={() => { setShowEditForm(!showEditForm); setShowPasswordInputs(showEditForm); }}>Mettre à jour les infos</button>
            <button onClick={() => { setShowPasswordInputs(!showPasswordInputs); setShowEditForm(showPasswordInputs); }}>Change Password</button>

            {
                showEditForm && (
                    <div>
                        <p>
                            Email: <input type="email" value={tempEmail || ''} onChange={(e) => setTempEmail(e.target.value)} />
                        </p>
                        <p>
                            Firstname:
                            <input type="text" value={tempFirstname} onChange={(e) => setTempFirstname(e.target.value)} />
                        </p>
                        <p>
                            Lastname:
                            <input type="text" value={tempLastname || ''} onChange={(e) => setTempLastname(e.target.value)} />
                        </p>
                        <button onClick={() => setShowEditForm(false)}>Cancel</button>

                        <button onClick={handleUserInfoSave}>Enregistrer</button>
                    </div>
                )
            }
            {
                showPasswordInputs && (
                    <>
                        <p>
                            Nouveau mot de passe:
                            <input type="password" onChange={(e) => setTempPassword(e.target.value)} required />
                        </p>
                        <p>
                            confirmer le mot de passe:
                            <input type="password" onChange={(e) => setTempConfirmPassword(e.target.value)} required />
                        </p>
                        <button onClick={() => setShowPasswordInputs(false)}>Cancel</button>
                        <button onClick={handlePasswordSave}>Enregistrer</button>

                    </>
                )
            }
            {showConfirmation && (
                <div className="confirmation-popup">
                    {confirmationMessage}
                </div>
            )}
        </div >
    );
};

export default Account;