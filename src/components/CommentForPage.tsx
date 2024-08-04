import React, { useEffect, useState } from 'react';
import { fetchComments, addComment, removeComment } from '../API/apiComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/CommentForPage.css';

interface UserReference {
    userId: string;
    userName: string;
}

interface UserCommentDetails {
    fromUserId: string;
    toUserId?: string;
    content: string;
    createAt: string;
    fromUserName?: string;
    toUserName?: string;
}

interface Comment {
    id: string;
    comments: UserCommentDetails[];
}

interface CommentForPageProps {
    newsId: string;
}

const CommentForPage: React.FC<CommentForPageProps> = ({ newsId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [showAllMessages, setShowAllMessages] = useState(false);
    const [replyingTo, setReplyingTo] = useState<string | undefined>(undefined);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        const storedUsername = localStorage.getItem('name') || '';
        setUsername(storedUsername);

        handleFetchComments();
    }, [newsId]);

    const handleFetchComments = async () => {
        try {
            const fetchedComments = await fetchComments(newsId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSendMessage = async () => {
        if (message.trim() === '') {
            alert('Bạn cần nhập tin nhắn.');
            return;
        }

        const fromUserId = localStorage.getItem('userId');
        if (!fromUserId) {
            alert('User ID not found.');
            return;
        }

        const newComment = {
            newsId: newsId,
            fromUserId: fromUserId,
            toUserId: replyingTo || null,
            content: message
        };

        try {
            await addComment(newComment);
            handleFetchComments(); // Refresh the comments list
            setMessage('');
            setReplyingTo(undefined);  // Reset replyTo after sending message
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleDeleteMessage = async (newsId: string, fromUserId: string, toUserId: string, content: string) => {
        const commentPayload = {
            newsId: newsId,
            fromUserId: fromUserId,
            toUserId: toUserId,
            content: content
        };

        try {
            await removeComment(commentPayload);
            handleFetchComments(); // Refresh the comments list
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleReplyToMessage = (userId: string, userName: string) => {
        setReplyingTo(userId);
        setMessage(`@${userName} `);
    };

    const handleShowMoreMessages = () => {
        setShowAllMessages(true);
        setExpanded(true);  // Expand the height of the message container
    };

    const displayedComments = showAllMessages ? comments : comments.slice(0, 5);

    if (!isLoggedIn) {
        return (
            <div className="comment-login">
                <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" className="icon" />
                <h5>
                    Bạn cần đăng nhập để có thể bình luận
                </h5>
            </div>
        );
    }

    return (
        <div className={`comment-container ${expanded ? 'expanded' : ''}`}>
            <div className="comment-input">
                <input
                    type="text"
                    placeholder="Bình luận của bạn"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="comment-list">
                {displayedComments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {comment.comments.map((userComment, index) => (
                            <div key={index} className={`comment-item ${userComment.toUserId ? 'reply' : ''}`}>
                                <strong>{userComment.fromUserName}</strong>: {userComment.content}
                                <div className="comment-actions">
                                    <button onClick={() => handleReplyToMessage(userComment.fromUserId, userComment.fromUserName || '')}>
                                        <FontAwesomeIcon icon={faReply} aria-hidden="true" className="icon-reply" />
                                    </button>
                                    <button onClick={() => handleDeleteMessage(comment.id, userComment.fromUserId, userComment.toUserId || '', userComment.content)}>
                                        <FontAwesomeIcon icon={faTrash} aria-hidden="true" className="icon-delete" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
                {!showAllMessages && comments.length > 5 && (
                    <div className="show-more">
                        <button onClick={handleShowMoreMessages}>
                            Xem thêm
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentForPage;
