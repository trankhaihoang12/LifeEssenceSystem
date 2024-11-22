import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;


// Hàm thêm sản phẩm vào giỏ hàng
export const getConfigPaypal = async () => {
        // Gửi request đến backend để thêm sản phẩm vào giỏ hàng
        const response = await axios.get(
            `${API_URL}/payment/config-paypal`);
        return response.data;  // Trả về kết quả từ server (sản phẩm đã được thêm vào giỏ)
};

