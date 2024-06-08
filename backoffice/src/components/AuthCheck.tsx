import React from 'react';
import { useNavigate } from 'react-router-dom';

const authCheck = (Component: React.ComponentType<any>) => {
    return (props: any) => {
        const navigate = useNavigate();

        const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';

        if (!isLoggedIn) {
            navigate('/backofficeHome');
            return null;
        }

        return <Component {...props} />;
    };
};

export default authCheck;