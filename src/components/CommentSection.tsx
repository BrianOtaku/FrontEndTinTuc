import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { Trigger } from '../trigger/trigger';

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

        // Retrieve username from localStorage
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <p>Bạn cần đăng nhập để có thể nhắn tin</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '50vh' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {messages.map((m, index) => (
                    <div key={index}><strong>{m.user}</strong>: {m.message}</div>
                ))}
            </div>
            <div style={{ padding: '10px', borderTop: '1px solid #ccc' }}>
                <input 
                    type="text" 
                    placeholder="Message" 
                    value={message} 
                    onChange={e => setMessage(e.target.value)} 
                    onKeyPress={handleKeyPress}
                    style={{ width: '100%' }}
                />
                <button onClick={sendMessage} style={{ display: 'block', marginTop: '10px', width: '100%' }}>Send</button>
            </div>
        </div>
    );
};

export default CommentSection;
