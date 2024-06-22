import React, { useState } from 'react';
import '../styles/admin.css';

type AdminProps = {
    name: string;
    email: string;
    dob: string;
    membership: string;
    endMembership: () => void;
};

function Admin({ name, email, dob, membership, endMembership }: AdminProps) {
    const [firstname, setFirstname] = useState(name);
    const [lastname, setLastname] = useState(name);
    const [newEmail, setNewEmail] = useState(email);
    const [newDob, setNewDob] = useState(dob);
    const [newMembership, setNewMembership] = useState(membership);
    const [isEditingMembership, setIsEditingMembership] = useState(false);
    const [isEditingProfil, setIsEditingProfil] = useState(false);


    const handleSave = () => {
        setIsEditingProfil(false);
    };

    return (
        <div>
            <h2>Parametres de mon compte</h2>
            <div className='setProfil'>
                {!isEditingProfil ? (
                    <button className='btn-profil-change' onClick={() => setIsEditingProfil(true)}>Modifer les infos de profile</button>
                ) : (
                    <>
                        <label className='label-profil'>
                            First Name:
                            <input className='input-profil' type="text" value={firstname} onChange={e => setFirstname(e.target.value)} />
                        </label>
                        <label className='label-profil'>
                            Last Name:
                            <input className='input-profil' type="text" value={lastname} onChange={e => setLastname(e.target.value)} />
                        </label>
                        <label className='label-profil'>
                            Email:
                            <input className='input-profil' type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                        </label>

                        <button className='btn-profil-validate' onClick={handleSave}>Save Changes</button>
                        <button className='btn-profil-back' onClick={() => setIsEditingProfil(false)}>Retour</button><br></br>

                    </>
                )}
            </div>
            <div className='setMembership'>
                {!isEditingMembership ? (
                    <button className='btn-membership-change' onClick={() => setIsEditingMembership(true)}>Modifier l'adhésion</button>
                ) : (
                    <>
                        <label className='label-membership'>
                            Membership:
                            <select className='select-membership' value={newMembership} onChange={e => setNewMembership(e.target.value)}>
                                <option className='option-membership' value="basic">Basic</option>
                                <option className='option-membership' value="premium">Premium</option>
                            </select>
                            <button className='btn-membership' onClick={endMembership}>End Membership</button>
                        </label>

                        <button className='btn-membership-validate' onClick={handleSave}>Valider</button>
                        <button className='btn-membership-back' onClick={() => setIsEditingMembership(false)}>Retour</button><br></br>

                    </>
                )}
            </div>
        </div>
    );
}

export default Admin;