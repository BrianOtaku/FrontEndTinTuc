import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

interface Message {
    user: string;
    message: string;
}

const CommentSection: React.FC = () => {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        const storedUsername = localStorage.getItem('name') || '';
        setUsername(storedUsername);

        const connect = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7161/chathub")
            .withAutomaticReconnect()
            .build();

        setConnection(connect);

        const startConnection = async () => {
            try {
                await connect.start();
                console.log("Connected!");

                connect.on("ReceiveMessage", (user: string, message: string) => {
                    setMessages(messages => [...messages, { user, message }]);
                });
            } catch (e) {
                console.log('Connection failed: ', e);
            }
        };

        startConnection();

        return () => {
            connect.off("ReceiveMessage");
            connect.stop();
        };
    }, []);

    const sendMessage = async () => {
        if (connection && connection.state === signalR.HubConnectionState.Connected) {
            try {
                await connection.send('SendMessage', username, message);
                setMessage('');
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login-prompt">
                <p>Bạn cần đăng nhập để có thể nhắn tin</p>
            </div>
        );
    }

    return (
        <div className="comment-section">
            <div className="messages-container">
                {messages.map((m, index) => (
                    <div key={index} className="message">
                        <strong>{m.user}</strong>: {m.message}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button onClick={sendMessage} className="send-button">
                    Send
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
