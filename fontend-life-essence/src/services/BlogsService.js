import axios from 'axios';

// Lấy API URL từ biến môi trường
const API_URL = process.env.REACT_APP_API_URL;

export async function getAllBlog() { // Không cần token
    try {
        const response = await axios.get(`${API_URL}/blog/all`); // Gọi API mà không có header Authorization
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        throw error;
    }
}
export async function getRecentPosts() { // Không cần token
    try {
        const response = await axios.get(`${API_URL}/blog/all`); // Gọi API mà không có header Authorization
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching all blogs:', error);
        throw error;
    }
}

export async function writeBlog(formData, token) {
    try {
        const response = await axios.post(`${API_URL}/blog/write-blogs`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`, // Pass the token in the header
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
            console.error('Error creating blog:', error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function getDetailsBlog(blogId) { // Không cần token
    try {
        const response = await axios.get(`${API_URL}/blog/${blogId}`); // Gọi API mà không có header Authorization
        return response.data; // Trả về dữ liệu từ API
    } catch (error) {
        console.error('Error fetching blog details:', error);
        throw error;
    }
}   


// Function to create a new comment
export async function createComment(blogId, content, token) {
    try {
        const response = await axios.post(
            `${API_URL}/blog/comments`,
            {
                blog_id: blogId,
                content: content,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Use token for authentication
                },
            }
        );
        return response.data; // Return the response data (e.g., success message, comment data)
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

// Function to delete a comment
export async function deleteComment(commentId, token) {
    try {
        const response = await axios.delete(
            `${API_URL}/blog/comments/${commentId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Use token for authentication
                },
            }
        );
        return response.data; // Return the response data (e.g., success message)
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export async function getAllComments(blogId) {
    try {
        const response = await axios.get(`${API_URL}/blog/${blogId}/comments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
}