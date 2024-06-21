import React, { ReactElement } from 'react';

interface ActionProviderProps {
    createChatBotMessage: (message: string) => any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    children: ReactElement | ReactElement[];
}

const ActionProvider: React.FC<ActionProviderProps> = ({ createChatBotMessage, setState, children }) => {
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
        const botMessage = createChatBotMessage(`Je suis désolé, je n'ai pas les informations sur ce que vous me demandez. Je peux seulement vous guider à naviger sur ce site. Pour des informations plus précises, veuillez contacter un membre de FDC via le formulaire de contact de la page "Contact".`);

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
                        handleDonation, handleContact, handleVote, handleEvent, handleUnknown
                    },

                });
            })}
        </div>
    );
};

export default ActionProvider;