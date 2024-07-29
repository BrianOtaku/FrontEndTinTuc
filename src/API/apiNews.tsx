import axiosInstance from './axiosConfig';

interface Data {
    id?: number;
    title: string;
    content: string;
}

// CREATE
export const createNews = async (data: Data) => {
    try {
        const response = await axiosInstance.post('/News', data);
        return response.data;
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }
};

// READ
export const fetchNews = async () => {
    try {
        const response = await axiosInstance.get('/News');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// UPDATE
export const updateNews = async (id: number, updatedData: Partial<Data>) => {
    try {
        const response = await axiosInstance.put(`/News/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// DELETE
export const deleteNews = async (id: number) => {
    try {
        await axiosInstance.delete(`/News/${id}`);
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};
