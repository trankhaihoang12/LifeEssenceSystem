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
// Hàm thêm danh mục mới
export const addCategory = async (token, categoryData) => {
    try {
        // Gửi request POST đến backend để thêm danh mục mới
        const response = await axios.post(`${API_URL}/admin/add-category`, categoryData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        // Trả về dữ liệu từ API
        return response.data;
    } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để component có thể xử lý
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

// Hàm xóa danh mục
export const deleteCategory = async (token, categoryId) => {
    try {
        const response = await axios.delete(`${API_URL}/admin/delete-category/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi khi xóa danh mục:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để component có thể xử lý
    }
};


// Hàm cập nhật trạng thái đơn hàng dành cho admin
export const updateOrderStatus = async (orderId, orderStatus, token) => {
    try {
        // Gửi request PUT để cập nhật trạng thái đơn hàng
        const response = await axios.put(
            `${API_URL}/admin/orders/${orderId}/status`,  // API endpoint để cập nhật trạng thái
            { orderStatus },  // Dữ liệu truyền vào là trạng thái đơn hàng mới
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        // Trả về dữ liệu phản hồi từ API
        return response.data;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi để component có thể xử lý
    }
};

// Hàm thêm coupon
export async function addCoupon(token, couponData) {
    try {
        const response = await axios.post(`${API_URL}/admin/coupons/create`, couponData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Thêm token vào header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm coupon:', error);
        throw error;
    }
}

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

export async function deleteCoupon(token, couponId) {
    try {
        const response = await axios.delete(`${API_URL}/admin/coupons/delete/${couponId}`, {
            headers: {
                'Authorization': `Bearer ${token}`  // Pass the token in the header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting coupon:', error);
        throw error;
    }
}

export async function getAllCoupons(token) {
    try {
        const response = await axios.get(`${API_URL}/admin/coupons/getAll`, {
            headers: {
                'Authorization': `Bearer ${token}`  // Pass the token in the header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all coupons:', error);
        throw error;
    }
}