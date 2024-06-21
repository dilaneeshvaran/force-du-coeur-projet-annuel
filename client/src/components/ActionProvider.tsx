import React, { ReactElement } from 'react';

interface ActionProviderProps {
    createChatBotMessage: (message: string) => any;
    setState: React.Dispatch<React.SetStateAction<any>>;
    children: ReactElement | ReactElement[];
}

const ActionProvider: React.FC<ActionProviderProps> = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMessage = createChatBotMessage('Hello. Nice to meet you.');

        setState((prev: any) => ({
            ...prev,
            messages: [...prev.messages, botMessage],
        }));
    };

    // Put the handleHello function in the actions object to pass to the MessageParser
    return (
        <div>
            {React.Children.map(children, (child: any) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;