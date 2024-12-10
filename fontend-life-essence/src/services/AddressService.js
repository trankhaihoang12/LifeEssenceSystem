import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;

// Hàm lấy tất cả địa chỉ giao hàng
export const getAllDeliveryAddresses = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/address/all/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error fetching delivery addresses:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Hàm thêm địa chỉ giao hàng
export const addDeliveryAddress = async (addressData, token) => {
    try {
        // Gửi yêu cầu POST đến backend để thêm địa chỉ mới
        const response = await axios.post(`${API_URL}/address/add-delivery`, addressData, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error adding delivery address:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Hàm cập nhật địa chỉ giao hàng
export const updateDeliveryAddress = async (userId, addressId, addressData, token) => {
    try {
        // Gửi yêu cầu PUT đến backend để cập nhật địa chỉ
        const response = await axios.put(`${API_URL}/address/${userId}/update/${addressId}`, addressData, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error updating delivery address:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Hàm xóa địa chỉ giao hàng
export const deleteDeliveryAddress = async (userId, addressId, token) => {
    try {
        // Gửi yêu cầu DELETE đến backend để xóa địa chỉ
        const response = await axios.delete(`${API_URL}/address/${userId}/delete/${addressId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Gửi token trong header
            },
        });
        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        console.error('Error deleting delivery address:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};
