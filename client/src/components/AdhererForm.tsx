import React from 'react';

interface AdhererFormProps {
    handleCloseClick: () => void;
}

export const AdhererForm: React.FC<AdhererFormProps> = ({ handleCloseClick }) => {
    return (
        <div className='contentBox'>
            <h3>Adhérer à 'Force du Coeur'</h3>
            <form>
                <label>
                    Full Name:
                    <input type="text" name="fullName" required />
                </label><br></br>
                <label>
                    Date of Birth:
                    <input type="date" name="dob" required />
                </label><br></br>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label><br></br>
                <label>
                    Password:
                    <input type="password" name="password" required />
                </label><br></br>
                <label>
                    Phone Number:
                    <input type="tel" name="phoneNumber" required />
                </label><br></br>
                <label>
                    City:
                    <input type="text" name="city" required />
                </label><br></br>
                <label>
                    Country:
                    <input type="text" name="country" required />
                </label><br></br>
                <label>
                    Membership:
                    <select>
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