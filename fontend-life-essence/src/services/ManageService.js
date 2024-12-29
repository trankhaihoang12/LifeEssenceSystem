import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;




// Hàm lấy tất cả sản phẩm
export async function getAllProducts(token) {
    try {
        const response = await axios.get(`${API_URL}/manager/products`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Thêm token vào header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
        throw error;
    }
}


// Hàm thêm sản phẩm mới
export async function addProduct(productData, token) {
    try {
        const response = await axios.post(`${API_URL}/manager/products`, productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm mới:', error.response ? error.response.data : error.message);
        throw error;
    }
}


// Hàm xóa sản phẩm
export async function deleteProduct(productId, token) {
    try {
        const response = await axios.delete(`${API_URL}/manager/products/${productId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;  // Trả về thông báo thành công
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error.response ? error.response.data : error.message);
        throw error;  // Ném lỗi nếu có
    }
}

// Hàm cập nhật sản phẩm
export async function updateProduct(productId, productData, token) {
    try {
        const response = await axios.put(`${API_URL}/manager/products/${productId}`,
            productData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data; // Trả về dữ liệu sản phẩm đã được cập nhật
    } catch (error) {
        console.error(
            'Lỗi khi cập nhật sản phẩm:',
            error.response ? error.response.data : error.message
        );
        throw error; // Ném lỗi nếu có
    }
}

// Hàm get ALL giỏ hàng dành cho manager
export const getAllOrders = async (token) => {
    try {
        // Gửi request GET đến backend để lấy danh sách tất cả đơn hàng
        const response = await axios.get(`${API_URL}/manager/orders`, {
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
        const response = await axios.get(`${API_URL}/manager/orders/${id}`, {
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

        const response = await axios.delete(`${API_URL}/manager/orders/${orderId}`, config);
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
        const response = await axios.post(`${API_URL}/manager/add-category`, categoryData, {
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
        const response = await axios.get(`${API_URL}/manager/getAll-category`, {
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
        const response = await axios.delete(`${API_URL}/manager/delete-category/${categoryId}`, {
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
            `${API_URL}/manager/orders/${orderId}/status`,  // API endpoint để cập nhật trạng thái
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
        const response = await axios.post(`${API_URL}/manager/coupons/create`, couponData, {
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
        const response = await axios.get(`${API_URL}/manager/coupons/active`, {
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
        const response = await axios.delete(`${API_URL}/manager/coupons/delete/${couponId}`, {
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
        const response = await axios.get(`${API_URL}/manager/coupons/getAll`, {
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

//--------------Blogs-----------------------//

export async function getAllBlogAdmin(token) {
    try {
        const response = await axios.get(`${API_URL}/manager/all-blogs`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass the token in the header
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching all blogs for admin:', error);
        throw error;
    }
}

export async function deleteBlog(blogId, token) {
    try {
        const response = await axios.delete(`${API_URL}/manager/delete-blogs/${blogId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass the token in the header
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}

export async function approveBlog(blogId, token) {
    try {
        const response = await axios.put(`${API_URL}/manager/approve/${blogId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass the token in the header
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error approving blog:', error);
        throw error;
    }
}

export async function searchBlogs(title, token) {
    try {
        const response = await axios.get(`${API_URL}/manager/search-blogs`, {
            params: {
                title: title, // Truyền title làm tham số query
            },
            headers: {
                'Authorization': `Bearer ${token}`,  // Gửi token trong header để xác thực
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error searching blogs:', error);
        throw error;  // Ném lỗi ra ngoài để xử lý ở nơi gọi hàm
    }
}
