import React, { ReactElement } from 'react';

interface MessageParserProps {
    children: ReactElement | ReactElement[];
    actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
    const parse = (message: any) => {
        let handled = false;

        if (message.includes('don') || message.includes('adher') || message.includes('adhér') || message.includes('soutenir') || message.includes('aide') || message.includes('soutien')) {
            actions.handleDonation();
            handled = true;
        }
        if (message.includes('contact')) {
            actions.handleContact();
            handled = true;
        }
        if (message.includes('vote') || message.includes('voté')) {
            actions.handleVote();
            handled = true;
        }
        if (message.includes('evenement') || message.includes('évenement') || message.includes('évènement') || message.includes('évènement') || message.includes('mission') || message.includes('activit') || message.includes('actualit')) {
            actions.handleEvent();
            handled = true;
        }
        if (!handled) {
            actions.handleUnknown();
        }
    };

    return (
        <div>
            {React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    parse: parse,
                    actions,
                });
            })}
        </div>
    );
};

export default MessageParser;