import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;



// Hàm get ALL giỏ hàng dành cho admin
export const getAllOrders = async (token) => {
    try {
        // Gửi request GET đến backend để lấy danh sách tất cả đơn hàng
        const response = await axios.get(`${API_URL}/admin/orders`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để component có thể xử lý
    }
};


// Get Order by ID
export const getOrderById = async (id, token) => {
    try {
        const response = await axios.get(`${API_URL}/admin/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching order by ID:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteOrder = async (orderId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include token for authentication
            },
        };

        const response = await axios.delete(`${API_URL}/admin/orders/${orderId}`, config);
        return response.data; // Return the server's response
    } catch (error) {
        // Handle errors and propagate meaningful messages
        const errorMessage = error.response?.data?.message || 'An error occurred while deleting the order';
        throw new Error(errorMessage);
    }
};

// Hàm get ALL danh mục kèm số lượng sản phẩm
export const getAllCategory = async (token) => {
    try {
        // Gửi request GET đến backend để lấy danh sách danh mục
        const response = await axios.get(`${API_URL}/admin/getAll-category`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách danh mục:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để component có thể xử lý
    }
};