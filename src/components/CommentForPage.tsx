import React, { useEffect, useState } from 'react';
import { fetchComments, addComment, removeComment } from '../API/apiComment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faTrashAlt, faComments, faNewspaper, faComment, faReply } from '@fortawesome/free-solid-svg-icons';
import NewsPage from '../template/newsPage';

interface UserReference {
    userId: string;
    userName: string;
}

interface UserCommentDetails {
    commentId: string;
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
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            return;
        }

        const storedUsername = localStorage.getItem('name') || '';
        setUsername(storedUsername);
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);

        handleFetchComments();
    }, [newsId]);

    const handleFetchComments = async () => {
        try {
            const fetchedComments = await fetchComments(newsId);
            setComments(fetchedComments);
            console.log("check Comment before send >>>>>>>>>>>>>>>>",fetchedComments)
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
        toUserId: replyingTo ? replyingTo : null, // Gán `toUserId` nếu đang trả lời
        toCommentId: replyingTo , // Gán `ToCommentId` nếu đang trả lời
        content: message,
      
    };

    try {
        console.log("check mess after send >>>>>>>>>>>>>>>>",newComment)
        await addComment(newComment);
        handleFetchComments(); // Làm mới danh sách bình luận
        setMessage('');
        setReplyingTo(null);  // Reset replyTo sau khi gửi tin nhắn
    } catch (error) {
        console.error('Error sending message:', error);
    }
};


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleDeleteMessage = async (commentId: string) => {
        try {
            await removeComment(commentId);
            handleFetchComments(); // Làm mới danh sách bình luận
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleReplyToMessage = (commentId: string, userName: string) => {
        setReplyingTo(commentId);
        setMessage(`@${userName} `);
    };

    return (
        <div className='endContent'>
            <div className='comment-section-ver2'>
                <h1>
                    <FontAwesomeIcon icon={faComment} aria-hidden="true" style={{ marginRight: '10px' }} />
                    Bình luận:
                </h1>
                {!isLoggedIn && (
                    <div className="login-prompt-v2">
                        <FontAwesomeIcon icon={faSignInAlt} aria-hidden="true" className='login-prompt-icon' />
                        <h5>
                            Bạn cần đăng nhập để có thể bình luận
                        </h5>
                    </div>
                )}
                {isLoggedIn && (
                    <>
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder="Bình luận của bạn"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />
                            <button onClick={handleSendMessage} className="send-button">
                                <FontAwesomeIcon icon={faComments} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="messages-container">
                            {comments.map((comment) => (
                                <div key={comment.id}>
                                    {comment.comments.map((userComment, index) => (
                                        <div key={index} className={`message-ver2 ${userComment.toUserId ? 'reply' : ''}`}>
                                            <strong>{userComment.fromUserName}</strong>: {userComment.content}
                                            <div className="comment-actions">
                                                <button onClick={() => handleReplyToMessage(userComment.commentId, userComment.fromUserName!)}>
                                                    <FontAwesomeIcon icon={faReply} aria-hidden="true" className="icon-reply" />
                                                </button>
                                                {userId === userComment.fromUserId && (
                                                    <button onClick={() => handleDeleteMessage(userComment.commentId)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} aria-hidden="true" className="icon-delete" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className='endContentRight'>
                <h1>
                    <FontAwesomeIcon icon={faNewspaper} aria-hidden="true" style={{ marginRight: '10px' }} />
                    Tin tức khác:
                </h1>
                <div className='newsDisplay-gap'>
                    <NewsPage type='chinh-tri' />
                </div>
                <div className='newsDisplay-gap'>
                    <NewsPage type='giao-thong' />
                </div>
                <div className='newsDisplay-gap'>
                    <NewsPage type='lao-dong-viec-lam' />
                </div>
                <div className='newsDisplay-gap'>
                    <NewsPage type='dan-sinh' />
                </div>
                <div className='newsDisplay-gap'>
                    <NewsPage type='quy-hy-vong' />
                </div>
                <div className='newsDisplay-gap'>
                    <NewsPage type='mekong' />
                </div>
            </div>
        </div>
    );
};

export default CommentForPage;
