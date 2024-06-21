import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import { createChatBotMessage } from 'react-chatbot-kit';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import '../styles/chatbot.css';



const config = {
    initialMessages: [createChatBotMessage(`Bonjour, en quoi avez-vous besoin d'assistance ?`, { widget: 'options' })],
    botName: "Bot FDC",
    customComponents: {
        // Replaces the default header
    },
};

interface ChatBoxProps {
    messageHistory: any;
    setChatHistory: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messageHistory, setChatHistory }) => {
    return (
        <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={messageHistory}
            saveMessages={setChatHistory}
        />
    );
};

export default ChatBox;