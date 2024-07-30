import AxiosInstance from './axiosConfig';

interface Data {
    id: number;
    title: string;
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

// UPDATE
export const updateNews = async (id: number, updatedData: Partial<Data>): Promise<Data> => {
    try {
        const response = await AxiosInstance.put(`/News/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating news:', error);
        throw error;
    }
};
