import React, { useState } from 'react';


type AdminProps = {
    name: string;
    email: string;
    dob: string;
    membership: string;
    endMembership: () => void;
};

function Admin({ name, email, dob, membership, endMembership }: AdminProps) {
    const [newName, setNewName] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newDob, setNewDob] = useState(dob);
    const [newMembership, setNewMembership] = useState(membership);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        //call api
        console.log('Saved new admin:', newName, newEmail, newDob, newMembership);
        setIsEditing(false);
    };

    return (
        <div>
            <h2>Account Settings</h2>
            {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Change Account Information</button>
            ) : (
                <>
                    <label>
                        Name:
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} />
                    </label>
                    <label>
                        Email:
                        <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                    </label>
                    <label>
                        Date of Birth:
                        <input type="date" value={newDob} onChange={e => setNewDob(e.target.value)} />
                    </label>
                    <label>
                        Membership:
                        <select value={newMembership} onChange={e => setNewMembership(e.target.value)}>
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                        </select>
                    </label>
                    <button onClick={handleSave}>Save Changes</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button><br></br>
                    <button onClick={endMembership}>End Membership</button>
                </>
            )}
        </div>
    );
}

export default Admin;