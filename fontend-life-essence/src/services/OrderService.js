import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;


// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId, quantity, token) => {
    try {
        // Gửi request đến backend để thêm sản phẩm vào giỏ hàng
        const response = await axios.post(
            `${API_URL}/cart/add`,
            { product_id: productId, quantity },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;  // Trả về kết quả từ server (sản phẩm đã được thêm vào giỏ)
    } catch (error) {
        console.error("Lỗi khi thêm sản phẩm vào giỏ:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};
// Hàm tạo đơn hàng
export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/orders`,
            orderData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        throw error;
    }
};

// Hàm lấy thông tin đơn hàng theo ID
export const getOrderById = async (orderId, token) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/orders/${orderId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy thông tin đơn hàng:', error);
        throw error;
    }
};

// Hàm lấy tất cả các đơn hàng của người dùng
export const getAllOrders = async (token) => {
    try {
        const response = await axios.get(
            `${API_URL}/api/orders`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Thêm token vào header
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        throw error;
    }
};
