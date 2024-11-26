import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;

// Hàm lấy tất cả sản phẩm
export async function getAllProducts(token) {
    try {
        const response = await axios.get(`${API_URL}/admin/products`, {
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
        const response = await axios.post(`${API_URL}/admin/products`, productData, {
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
        const response = await axios.delete(`${API_URL}/admin/products/${productId}`, {
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
        const response = await axios.put(`${API_URL}/admin/products/${productId}`,
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


// Hàm gọi API lấy tất cả sản phẩm (không cần token)
export async function fetchAllProducts({
    page = 1,
    limit = 10,
    search = '',
    minPrice,
    maxPrice,
    sort = 'asc',
}) {
    try {
        const params = { page, limit, search, minPrice, maxPrice, sort }; // Các tham số query
        const response = await axios.get(`${API_URL}/products/all`, { params }); // Không cần header Authorization
        return response.data.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        throw error;
    }
}

// Hàm lấy chi tiết sản phẩm theo ID
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${ API_URL }/products/${productId}`);
        return response.data;  // trả về dữ liệu sản phẩm
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
        throw error;
    }
};
// get all category
export const getAllCategories = async () => {
    try {
        const response = await axios.get(`${API_URL}/category/all`);
        return response.data; // Trả về dữ liệu danh mục
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};

// Hàm lấy sản phẩm theo danh mục
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/category/${categoryId}`);
        return response.data; // Trả về dữ liệu sản phẩm theo danh mục
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
        throw error; // Ném lỗi để xử lý ở nơi gọi
    }
};


// Thêm hàm lấy tất cả các phản hồi sản phẩm
export async function getAllFeedback(productId,token) {
    try {
        const response = await axios.get(`${API_URL}/products/feedback/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Thêm token vào header
            }
        });
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách phản hồi:', error);
        throw error;
    }
}