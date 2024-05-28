import React from 'react';

interface DonationFormProps {
    handleCloseClick: () => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ handleCloseClick }) => {
    return (
        <div className='contentBox'>
            <h3>Faire un don</h3>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label><br></br>
                <label>
                    Amount:
                    <input type="number" name="amount" required />
                </label><br></br>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label><br></br>
                <input type="submit" value="Submit" />
            </form>
            <button onClick={handleCloseClick}>Close</button>
        </div>
    );
}