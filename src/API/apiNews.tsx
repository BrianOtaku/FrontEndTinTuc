import {AxiosInstance} from './axiosConfig';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}


// FETCH BY TYPE
export const fetchNewsByType = async (type: string): Promise<Data[]> => {
    try {
        const response = await AxiosInstance.get(`/News/type/${type}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news by type:', error);
        throw error;
    }
};

// FETCH
export const fetchNews = async (): Promise<Data[]> => {
    try {
        const response = await AxiosInstance.get('/News');
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

export const searchNews = async (title: string): Promise<Data[]> => {
    try {
        const response = await AxiosInstance.get('/News/search', {
            params: { title }
        });
        return response.data;
    } catch (error) {
        console.error('Error searching news:', error);
        throw error;
    }
};