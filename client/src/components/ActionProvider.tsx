import React, { ReactElement } from 'react';

interface ActionProviderProps {
    createChatBotMessage: (message: string) => any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    children: ReactElement | ReactElement[];
}

const ActionProvider: React.FC<ActionProviderProps> = ({ createChatBotMessage, setState, children }) => {
    const handleGreeting = () => {
        const botMessage = createChatBotMessage(`Bonjour et bienvenue sur le siteweb de l'association "Force du coeur", je suis un bot, et je suis votre guide sur ce site. En quoi puis-je vous aider ?`);

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleDonation = () => {
        const botMessage = createChatBotMessage('Pour effectuer un don ou pour adhérer et devenir membre, veuillez vous rendre sur la page "Soutenir nos actions".');

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleContact = () => {
        const botMessage = createChatBotMessage('Je suis un Bot assistant, Vous pouvez contacter un membre de FDC par le formulaire du page "Contact".');

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };
    const handleVote = () => {
        const botMessage = createChatBotMessage('Seuls les membres peuvent consulter et participer aux votes, vous pouvez nous rejoindre en vous adhérant à partir de la page "Soutenir nos actions".');

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleEvent = () => {
        const botMessage = createChatBotMessage(`Vous pouvez consulter les évenements et les missions de l'association dans la page "Actualités de l'asso".`);

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleUnknown = () => {
        const botMessage = createChatBotMessage(`Désolé je suis un bot incapable de comprendre votre saisi, Pour une conversation plus profonde et pour des informations plus précises, veuillez contacter un membre de FDC via le formulaire de contact de la page "Contact".`);

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    const handleThanks = () => {
        const botMessage = createChatBotMessage(`Je suis toujours là pour vous aider. N'hésitez pas à me contacter pour toute question ou assistance supplémentaire. Vous pouvez fermer la fenêtre de chat en cliquant sur le bouton "Fermer" en haut à droite. à bientôt !`);

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    return (
        <div>
            {React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    actions: {
                        handleDonation, handleContact, handleVote, handleEvent, handleUnknown, handleGreeting, handleThanks
                    },

                });
            })}
        </div>
    );
};

export default ActionProvider;