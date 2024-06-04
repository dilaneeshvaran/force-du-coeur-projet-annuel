import React from 'react';


type MembershipProps = {
    membership: {
        userName: string;
        email: string;
        startDate: Date;
        amountPaid: number;
    };
};

function Membership({ membership }: MembershipProps) {
    return (
        <div>
            <p>User Name: {membership.userName}</p>
            <p>Email: {membership.email}</p>
            <p>Membership Started Date: {membership.startDate.toString()}</p>
            <p>Amount Paid: {membership.amountPaid}</p>
        </div>
    );
}

export default Membership;