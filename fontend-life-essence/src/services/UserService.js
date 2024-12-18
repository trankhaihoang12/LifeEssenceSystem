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

// Hàm lấy tất cả User
export async function getAllUser(token) {
    try {
        const response = await axios.get(`${API_URL}/admin/users`, {
            headers: {
                'Authorization': `Bearer ${token}`  // Thêm token vào header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách user:', error);
        throw error;
    }
}

// Hàm cập nhật thông tin User
export const updateUser = async (id, data, token) => {
    try {
        const response = await axios.put(`${API_URL}/admin/users-update/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token vào header
            }
        });
        return response.data; // Trả về dữ liệu phản hồi từ server
    } catch (error) {
        console.error("Error during user update:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn nếu cần
    }
};

// Hàm xóa người dùng
export const deleteUser = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token vào header
            }
        });
        return response.data; // Trả về dữ liệu phản hồi từ server
    } catch (error) {
        console.error("Error during user deletion:", error);
        throw error; // Ném lỗi để xử lý ở cấp cao hơn nếu cần
    }
};

// Hàm thay đổi mật khẩu
export const changePassword = async (data, token) => {
    try {
        const response = await axios.post(`${API_URL}/users/change_pass`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
};


// Hàm cập nhật thông tin người dùng
export const updateUserInfo = async (userData, token) => {
    try {
        const response = await axios.put(
            `${API_URL}/users/update`,
            userData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Đính kèm token trong header để xác thực
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during update:", error);
        throw error;
    }
};

export async function getActiveCoupons(token) {
    try {
        const response = await axios.get(`${API_URL}/admin/coupons/active`, {
            headers: {
                'Authorization': `Bearer ${token}`  // Pass the token in the header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching active coupons:', error);
        throw error;
    }
}

// Hàm đặt lại mật khẩu
export const requestPasswordReset = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/users/request-password-reset`, { email });
        return response.data;
    } catch (error) {
        console.error("Error during password reset:", error);
        throw error;
    }
};

// Hàm cập nhật mật khẩu mới
export const resetPassword = async (token, newPassword, confirmPassword) => {
    try {
        const response = await axios.post(
            `${API_URL}/users/reset-password`,
            { newPassword, confirmPassword },
            {
                headers: {
                    'Authorization': `Bearer ${token}` // Gửi token trong header Authorization
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during password reset:", error);
        throw error;
    }
};