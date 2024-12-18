import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;


// Hàm lấy danh sách sản phẩm yêu thích
export const getAllFavorites = async (userId, token) => {
    try {
        const response = await axios.get(`${API_URL}/favorites/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

// Hàm thêm sản phẩm vào danh sách yêu thích
export const addFavorite = async (userId, productId, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/favorites`, // Đảm bảo endpoint đúng
            { user_id: userId, product_id: productId }, // Dữ liệu cần gửi
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào headers
                },
            }
        );
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};

// Hàm xóa sản phẩm khỏi danh sách yêu thích
export const removeFavorite = async (id, token) => {
    try {
        const response = await axios.delete(`${API_URL}/favorites/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Thêm token vào headers
            },
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi hàm
    }
};
