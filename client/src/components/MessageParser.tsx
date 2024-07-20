import React, { ReactElement } from 'react';

interface MessageParserProps {
    children: ReactElement | ReactElement[];
    actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
    const parse = (message: any) => {
        let handled = false;
        const lowerCaseMessage = message.toLowerCase();


        const greetingKeywords = ['hi', 'bonjour', 'hello', 'bonsoir', 'slt', 'salut'];
        const donationKeywords = ['compte', 'adhésion', 'adhesion', 'don', 'adher', 'adhér', 'soutenir', 'aide', 'soutien', 'inscrire', 'inscription'];
        const contactKeywords = ['address', 'adresse', 'adress', 'addresse', 'contact', 'parler', 'parl', 'discuter', 'écrire', 'message', 'mail', 'email', 'appeler', 'telephone', 'téléphone'];
        const voteKeywords = ['vote', 'voté', 'voter', 'sondage', 'choix', 'choisir', 'élection'];
        const eventKeywords = ['evenement', 'évenement', 'évènement', 'évènement', 'mission', 'activit', 'actualit', 'news'];
        const thanksKeywords = ['merci', 'thank', 'remerci', 'gratitud'];

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