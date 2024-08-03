import {AxiosInstance} from "./axiosConfig";

interface Login {
    email: string;
    password: string;
   
}

interface Account extends Login {
    id: string;
    name?: string;
    createAt?: string;
    updateAt?: string;
    token:string;
}

interface Register extends Login{
    name:string;
    roles:string;
}
export const login = async (login: Login): Promise<string | null> => {
    try {
        const response = await AxiosInstance.post('/Login/login', login);
        return response.data.token;
    } catch (error) {
        console.error('Login failed:', error);
        return null;
    }
}
export const Register = async (register: Register): Promise<Register | null> => {
    try {
        const response = await AxiosInstance.post<Register>('/Register/register', register);
        return response.data;
    } catch (error) {
        console.error('register failed:', error);
        return null;
    }
}

export const getAccountById = async (id: string, token: string): Promise<Account | null> => {
    try {
        const response = await AxiosInstance.get(`/Account/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Get account by ID failed:', error);
        return null;
    }
}