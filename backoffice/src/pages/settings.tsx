import React from 'react';
import Admin from '../components/Admin';
import AuthCheck from '../components/AuthCheck';


function Settings() {
    const handleEndMembership = () => {
        if (window.confirm('Are you sure you want to end your membership? This will remove admin privileges and suspend your account.')) {
            // call api
            console.log('Ended membership');
        }
    };

    return (
        <div>
            <h1>Admin Page</h1>
            <Admin
                name="John Doe"
                email="john.doe@example.com"
                dob="1980-01-01"
                membership="premium"
                endMembership={handleEndMembership}
            />
        </div>
    );
}

export default AuthCheck(Settings);