import React, { useState } from 'react';
import { Donation } from '../pages/manageAccount'

interface Account {
    id: number;
    name: string;
    email?: string;
    dateOfBirth: Date;
    membershipStatus: string;
    membershipAmount?: number;
    membershipStartDate?: Date;
    donationFrequency?: 'monthly' | 'yearly' | 'none';
    donationAmount?: number;
    donations?: Donation[];
}

interface AccountProps {
    account: Account;
    onAccountChange?: (id: number, field: string, value: any) => void;
}

const Account: React.FC<AccountProps> = ({ account, onAccountChange }) => {
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [tempName, setTempName] = useState<string>(account.name);
    const [tempEmail, setTempEmail] = useState<string | undefined>(account.email);
    const [tempDateOfBirth, setTempDateOfBirth] = useState<Date>(account.dateOfBirth);

    const handleSave = () => {
        if (onAccountChange) {
            onAccountChange(account.id, 'name', tempName);
            onAccountChange(account.id, 'email', tempEmail);
            onAccountChange(account.id, 'dateOfBirth', tempDateOfBirth);
        }
        setShowEditForm(false);
    };

    return (
        <div key={account.id}>
            <h2>{account.name}</h2>
            <p>{account.email}</p>
            <p>Date Of Birth: {account.dateOfBirth.toLocaleDateString()}</p>
            <button onClick={() => setShowEditForm(!showEditForm)}>Mettre à jour les infos</button>
            {showEditForm && (
                <div>
                    <h2>
                        <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} />
                    </h2>
                    <p>
                        <input type="email" value={tempEmail || ''} onChange={(e) => setTempEmail(e.target.value)} />
                    </p>
                    <p>
                        Date Of Birth:
                        <input type="date" value={tempDateOfBirth.toISOString().split('T')[0]} onChange={(e) => setTempDateOfBirth(new Date(e.target.value))} />
                    </p>
                    <button onClick={handleSave}>Enregistrer</button>
                </div>
            )}
        </div>
    );
};

export default Account;