import React, { useEffect, useState } from 'react'
import { CheckboxLabel, FormContainer, FormTitle, Input, SubmitButton, TextArea } from './Style';
import * as ProductsService from '../../services/ProductsService'
import { Rate } from 'antd';
import { useParams } from 'react-router';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const ReviewForm = () => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [review, setReview] = useState('');
    const [saveInfo, setSaveInfo] = useState(false);
    const [value, setValue] = useState(3);
    const [reviews, setReviews] = useState([]); // Mảng chứa tất cả các đánh giá
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true); 
    const reviewsPerPage = 5; // Số lượng đánh giá trên mỗi trang


    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };

    useEffect(() => {
        if (!id) {
            console.error('Product ID is missing');
            return;
        }

        const token = getToken();
        console.log('Fetching feedback for product ID:', id);  // Lấy id từ URL

        const fetchFeedbacks = async () => {
            try {
                const data = await ProductsService.getAllFeedback(id, token);  // Truyền id vào API
                console.log('Fetched feedbacks for product:', data);
                setReviews(data.feedbacks);  // Cập nhật phản hồi
                setLoading(false);  // Dừng loading
            } catch (error) {
                console.error('Error fetching feedback:', error);
                setLoading(false);  // Dừng loading nếu có lỗi
            }
        };

        fetchFeedbacks();
    }, [id]);  // Khi id thay đổi, useEffect sẽ được gọi lại
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, email, website, review, saveInfo });
    };

    const handlePageChange = (direction) => {
        setCurrentPage((prev) => prev + direction);
    };

    // Tính toán các đánh giá cần hiển thị
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    const startIndex = currentPage * reviewsPerPage;
    const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

    return (
        <FormContainer>   
            {currentReviews.map((feedback, index) => (
                <div key={index} style={{ borderBottom: '2px solid #E6E6E6E6', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', height: '50px', gap: '20px' }}>
                        <img style={{ height: '50px', width: '50px', borderRadius: '50px' }} src="https://trixie.com.vn/media/images/article/54801627/jack.jpeg" alt="" />
                        <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto 0' }}>
                            <h2>{feedback.user_name}</h2>
                            <Rate disabled defaultValue={feedback.rating} style={{ fontSize: '13px' }} />
                        </div>
                    </div>
                    <div style={{ marginLeft: '70px' }}>
                        <h3 style={{ color: 'rgba(0, 0, 0, .54)' }}>{feedback.createdAt}</h3>
                        <h2 style={{ margin: '10px 20px 0 0' }}>{feedback.content}</h2>
                        <div style={{ display: 'flex', gap: '5px', margin: '20px 0' }}>
                            {feedback.images && feedback.images.map((image, index) => (
                                <img
                                    key={index}
                                    style={{
                                        height: '100px',
                                        width: '100px',
                                        borderRadius: '10px', // Tăng độ bo góc
                                        border: '2px solid #e0e0e0', // Thêm viền sáng
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Thêm hiệu ứng bóng
                                        margin: '5px', // Thêm khoảng cách giữa các hình ảnh
                                        transition: 'transform 0.2s', // Hiệu ứng chuyển động
                                    }}
                                    src={`http://localhost:4000/${image}`}
                                    alt={`Feedback Image ${index}`}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Phóng to khi hover
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} // Quay lại kích thước ban đầu
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={() => handlePageChange(-1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage >= Math.ceil(reviews.length / reviewsPerPage) - 1}
                >
                    Next
                </button>
            </div>
            <FormTitle>Your Rating</FormTitle>
            <div style={{ fontSize: '12px', marginBottom: '10px' }}>
                <Rate tooltips={desc} onChange={setValue} value={value} style={{ fontSize: '14px' }} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </div>
            <form onSubmit={handleSubmit}>
                <TextArea
                    rows="4"
                    placeholder="Your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    required
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="url"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                </div>
                <div>
                    <input
                        type="checkbox"
                        id="save-info"
                        checked={saveInfo}
                        onChange={() => setSaveInfo(!saveInfo)}
                    />
                    <CheckboxLabel htmlFor="save-info">
                        Save my name, email, and website in this browser for the next time I comment.
                    </CheckboxLabel>
                </div>
                <SubmitButton type="submit">Submit Your Review</SubmitButton>
            </form>
        </FormContainer>
    );
}

export default ReviewForm