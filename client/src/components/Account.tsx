import React, { useState } from 'react';

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

    const handleSave = () => {
        if (onAccountChange) {
            onAccountChange(account.id, 'username', tempUsername);
            onAccountChange(account.id, 'email', tempEmail);
            onAccountChange(account.id, 'firstname', tempFirstname);
            onAccountChange(account.id, 'lastname', tempLastname);
        }
        setShowEditForm(false);
    };

    return (
        <div key={account.id}>
            <h2>{account.username}</h2>
            <p>{account.email}</p>
            <p>Firstname: {account.firstname}</p>
            <p>Lastname: {account.lastname}</p>
            <button onClick={() => setShowEditForm(!showEditForm)}>Mettre à jour les infos</button>
            {showEditForm && (
                <div>
                    <h2>
                        <input type="text" value={tempUsername} onChange={(e) => setTempUsername(e.target.value)} />
                    </h2>
                    <p>
                        <input type="email" value={tempEmail || ''} onChange={(e) => setTempEmail(e.target.value)} />
                    </p>
                    <p>
                        Firstname:
                        <input type="text" value={tempFirstname} onChange={(e) => setTempFirstname(e.target.value)} />
                    </p>
                    <p>
                        Lastname:
                        <input type="text" value={tempLastname || ''} onChange={(e) => setTempLastname(e.target.value)} />
                    </p>
                    <button onClick={handleSave}>Enregistrer</button>
                </div>
            )}
        </div>
    );
};

export default Account;