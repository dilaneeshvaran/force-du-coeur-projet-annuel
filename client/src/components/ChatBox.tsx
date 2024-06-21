import React from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { createChatBotMessage } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import '../styles/chatbot.css';

const config = {
    initialMessages: [createChatBotMessage('Hello world', { widget: 'options' })],
};

const ChatBox = () => {
    return (
        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
        />
    );
};

export default ChatBox;