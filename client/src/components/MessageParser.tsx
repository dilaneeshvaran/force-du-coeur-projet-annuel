import React, { ReactElement } from 'react';

interface MessageParserProps {
    children: ReactElement | ReactElement[];
    actions: any;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
    const parse = (message: any) => {
        if (message.includes('hello')) {
            actions.handleHello();
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