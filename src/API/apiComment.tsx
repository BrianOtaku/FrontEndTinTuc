import axios from 'axios';
import { AxiosInstance } from './axiosConfig';
const baseURL = 'https://localhost:7161/api/Comments';

export const fetchComments = async (newsId: string) => {
    try {
        const response = await AxiosInstance.get(`/Comments/${newsId}`);
        return [response.data]; // The endpoint returns a single comment object, so we wrap it in an array
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const addComment = async (newComment: { newsId: string; fromUserId: string; toUserId: string | null; content: string }) => {
    try {
        await AxiosInstance.post(`/Comments/add-comment`, newComment, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const removeComment = async (commentPayload: { newsId: string; fromUserId: string; toUserId: string; content: string }) => {
    try {
        console.log('Removing comment with payload:', commentPayload); // Debugging payload
        await AxiosInstance.post(`/Comments/remove-comment`, commentPayload, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    }
};