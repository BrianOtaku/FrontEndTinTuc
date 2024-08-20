import { AxiosInstance } from "./axiosConfig";

interface Login {
    email: string;
    password: string;
}

interface Account extends Login {
    id: string;
    name?: string;
    createAt?: string;
    updateAt?: string;
    token: string;
}

interface Register extends Login {
    name: string;
    roles: string;
}

export const login = async (login: Login): Promise<string | null> => {
    try {
        const response = await AxiosInstance.post('/Login/login', login);
        return response.data.token;
    } catch (error: any) {
        console.error('Login failed:', error);
        return null;
    }
}

export const register = async (register: Register): Promise<Register | null> => {
    try {
        const response = await AxiosInstance.post<Register>('/Register/register', register);
        return response.data;
    } catch (error: any) {
        console.error('Register failed:', error);
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
    } catch (error: any) {
        if (error.response) {
            const status = error.response.status;
            const message = error.response.data;

            if (status === 401) {
                if (message === 'TokenExpired') {
                    // eslint-disable-next-line no-restricted-globals
                    const userConfirmed = confirm("Token đã hết hạn. Vui lòng đăng nhập lại.");
                    if (userConfirmed) {
                        // Người dùng đồng ý
                        localStorage.removeItem('token');
                        localStorage.removeItem('name');
                        window.location.href = '/login';
                    } else {
                        // Người dùng không đồng ý
                        localStorage.removeItem('token');
                        localStorage.removeItem('name');
                    }
                }
                else{
                    alert('đã xảy ra lỗi');
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    window.location.reload();
                }


            } else {
                // Xử lý các lỗi khác
                alert("Đã xảy ra lỗi: " + message);
            }
        } else {
            // Xử lý lỗi không liên quan đến phản hồi từ server
            console.error('Đã xảy ra lỗi:', error.message);
        }
        return null;
    }
}
