import AxiosInstance from './axiosConfig';

interface Data {
    id: number;
    title: string;
    linkDetail: string;
    imageUrl: string;
    description: string;
    content: string;
}

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
