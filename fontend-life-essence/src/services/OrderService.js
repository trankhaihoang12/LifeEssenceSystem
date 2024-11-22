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

// Hàm lấy toàn bộ sản phẩm trong giỏ hàng
export const getAllCartItems = async (token) => {
    try {
        // Gửi request đến backend để lấy danh sách sản phẩm trong giỏ
        const response = await axios.get(
            `${API_URL}/cart/all`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data; // Trả về danh sách sản phẩm từ server
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm trong giỏ:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};

// remove cart
export const removeFromCart = (productId, token) => {
    return axios.delete(`${API_URL}/cart/remove/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


// Hàm thêm đơn hàng
export const addOrder = async (orderData, token) => {
    try {
        // Gửi request đến backend để tạo đơn hàng
        const response = await axios.post(
            `${API_URL}/orders/add`, // Endpoint thêm đơn hàng
            orderData, // Dữ liệu đơn hàng gửi lên backend
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Token xác thực
                    'Content-Type': 'application/json', // Kiểu nội dung
                }
            }
        );
        // Kiểm tra xem response có chứa orderDetails không
        if (response.data && response.data.orderDetails) {
            console.log('Order Details received:', response.data.orderDetails);
        } else {
            console.warn('No order details returned from server.');
        }

        return response.data;  // Trả về kết quả từ server (chi tiết đơn hàng đã được tạo)
    } catch (error) {
        console.error("Lỗi khi thêm đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};

// Hàm lấy tất cả đơn hàng của người dùng
export const getAllOrders = async (token) => {
    try {
        // Gửi request đến backend để lấy danh sách đơn hàng
        const response = await axios.get(
            `${API_URL}/orders/all`, // Đường dẫn API để lấy đơn hàng
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Gửi token trong header để xác thực
                    'Content-Type': 'application/json',  // Kiểu nội dung là JSON
                }
            }
        );

        // Trả về dữ liệu đơn hàng từ server
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};

// Hàm lấy chi tiết đơn hàng theo orderId
export const getOrderDetails = async (orderId, token) => {
    try {
        // Gửi request đến backend để lấy chi tiết đơn hàng
        const response = await axios.get(
            `${API_URL}/orders/detailOrder/${orderId}`, // Endpoint lấy chi tiết đơn hàng
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Token xác thực
                    'Content-Type': 'application/json', // Kiểu nội dung là JSON
                }
            }
        );
        // Trả về dữ liệu chi tiết đơn hàng từ server
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};

// Hàm huỷ đơn hàng
export const cancelOrder = async (orderId, token) => {
    try {
        // Gửi request đến backend để huỷ đơn hàng
        const response = await axios.delete(
            `${API_URL}/orders/cancle-order/${orderId}/cancel`, // Đường dẫn API cho việc huỷ đơn hàng
            {
                headers: {
                    'Authorization': `Bearer ${token}`, // Thêm token vào header để xác thực
                    'Content-Type': 'application/json', // Đảm bảo kiểu dữ liệu gửi đi là JSON
                }
            }
        );
        return response.data;  // Trả về kết quả từ server (đơn hàng đã được huỷ)
    } catch (error) {
        console.error("Lỗi khi huỷ đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để có thể xử lý trong component
    }
};


