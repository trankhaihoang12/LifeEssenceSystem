import axios from 'axios';

// Lấy giá trị API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;


// Hàm đăng ký người dùng
export const registerUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, data);
        return response.data; 
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

// Hàm đăng nhập người dùng
export const loginUser = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, data);
        return response.data; 
    } catch (error) {
        console.error("Error during login:", error);
        throw error; 
    }
};
