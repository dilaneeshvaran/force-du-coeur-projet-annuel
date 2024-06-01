import React, { useEffect, useState } from 'react';
import { differenceInDays, parseISO } from 'date-fns';
import '../styles/alerts.css';
import '../styles/content.css';

type Task = {
    assignedTo: string;
    assignedDate: string;
    deadline: string;
};

type Alert = {
    id: number;
    message: string;
    date: string;
    task?: Task;
};

function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        // call api
        const fetchedAlerts: Alert[] = [
            { id: 1, message: 'Low inventory levels', date: '2022-01-01' },
            { id: 2, message: 'Unusual website traffic', date: '2022-01-02' },
            {
                id: 3,
                message: 'Tasks not done',
                date: '2022-01-03',
                task: {
                    assignedTo: 'John Doe',
                    assignedDate: '2022-01-01',
                    deadline: '2022-01-10',
                },
            },
        ];

        // call api
        const tasks: Task[] = [
            // ... tasks ...
        ];

        // call api
        const votingsAndSurveys: { id: number; endDate: string; }[] = [

        ];

        const today = new Date();

        tasks.forEach(task => {
            if (differenceInDays(parseISO(task.deadline), today) <= 3) {
                fetchedAlerts.push({
                    id: fetchedAlerts.length + 1,
                    message: `Task deadline is near: ${task.assignedTo}`,
                    date: task.deadline,
                    task,
                });
            }
        });

        votingsAndSurveys.forEach(votingOrSurvey => {
            if (differenceInDays(parseISO(votingOrSurvey.endDate), today) <= 0) {
                fetchedAlerts.push({
                    id: fetchedAlerts.length + 1,
                    message: `Voting or survey ended: ${votingOrSurvey.id}`,
                    date: votingOrSurvey.endDate,
                });
            }
        });

        setAlerts(fetchedAlerts);
    }, []);

    return (
        <div className="contentBox">
            <div className="content">
                <h2>Alerts</h2>
                {alerts.map(alert => (
                    <div key={alert.id} className="alertBox">
                        <h3>{alert.message}</h3>
                        <p>{alert.date}</p>
                        {alert.task && (
                            <div>
                                <p>Assigned to: {alert.task.assignedTo}</p>
                                <p>Assigned date: {alert.task.assignedDate}</p>
                                <p>Deadline: {alert.task.deadline}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Alerts;