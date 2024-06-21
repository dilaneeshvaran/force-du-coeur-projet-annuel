import React, { ReactElement } from 'react';

interface MessageParserProps {
    children: ReactElement | ReactElement[];
    actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
    const parse = (message: any) => {
        let handled = false;
        const lowerCaseMessage = message.toLowerCase();


        const greetingKeywords = ['bonjour', 'hello', 'bonsoir', 'slt', 'salut'];
        const donationKeywords = ['don', 'adher', 'adhér', 'soutenir', 'aide', 'soutien'];
        const contactKeywords = ['contact'];
        const voteKeywords = ['vote', 'voté'];
        const eventKeywords = ['evenement', 'évenement', 'évènement', 'évènement', 'mission', 'activit', 'actualit'];
        const thanksKeywords = ['merci', 'thank', 'remerci'];

        if (greetingKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleGreeting();
            handled = true;
        }
        if (donationKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleDonation();
            handled = true;
        }
        if (contactKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleContact();
            handled = true;
        }
        if (voteKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleVote();
            handled = true;
        }
        if (eventKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleEvent();
            handled = true;
        }
        if (thanksKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
            actions.handleThanks();
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