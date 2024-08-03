import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

interface Message {
    user: string;
    message: string;
}

const CommentForPage: React.FC = () => {
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

        // const connect = new signalR.HubConnectionBuilder()
        //     .withUrl("https://localhost:7161/chathub")
        //     .withAutomaticReconnect()
        //     .build();

        // setConnection(connect);

        // const startConnection = async () => {
        //     try {
        //         await connect.start();
        //         console.log("Connected!");

        //         connect.on("ReceiveMessage", (user: string, message: string) => {
        //             setMessages(messages => [...messages, { user, message }]);
        //         });
        //     } catch (e) {
        //         console.log('Connection failed: ', e);
        //     }
        // };

        // startConnection();

        // return () => {
        //     connect.off("ReceiveMessage");
        //     connect.stop();
        // };
    }, []);

    const sendMessage = async () => {
        // if (connection && connection.state === signalR.HubConnectionState.Connected) {
        //     try {
        //         await connection.send('SendMessage', username, message);
        //         setMessage('');
        //     } catch (e) {
        //         console.log(e);
        //     }
        // } else {
        //     alert('No connection to server yet.');
        // }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="login-prompt">
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" className='login-prompt-icon' />
                <h5>
                    Bạn cần đăng nhập để có thể bình luận
                </h5>
            </div>
        );
    }

    return (
        <div className="comment-section">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Bình luận của bạn"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button onClick={sendMessage} className="send-button">
                    <FontAwesomeIcon icon={faComments} aria-hidden="true" />
                </button>
            </div>
            <div className="messages-container">
                {messages.map((m, index) => (
                    <div key={index} className="message">
                        <strong>{m.user}</strong>: {m.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentForPage;
