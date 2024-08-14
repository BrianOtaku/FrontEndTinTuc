import { AxiosInstance } from './axiosConfig';

const baseURL = 'https://localhost:7161/api/Comments';

export const fetchComments = async (newsId: string) => {
    try {
        const response = await AxiosInstance.get(`/Comments/${newsId}`);
        return [response.data]; // Đặt phản hồi trong một mảng
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (newComment: { 
    newsId: string; 
    fromUserId: string; 
    toUserId: string | null; 
    toCommentId: string | null; 
    content: string; 
}) => {
    try {
        await AxiosInstance.post(`/Comments/add-comment`, newComment, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const removeComment = async (commentId: string) => {
    try {
        console.log('Removing comment with payload:', commentId); // Debugging payload
        await AxiosInstance.post(`/Comments/delete-comment`, commentId, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};
