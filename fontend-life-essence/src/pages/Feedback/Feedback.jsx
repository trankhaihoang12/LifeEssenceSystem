import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  FeedbackContainer,
  ProductCard,
  ProductImage,
  ProductName,
  FeedbackForm,
  Textarea,
  RatingContainer,
  Star,
  UploadSection,
  UploadLabel,
  SubmitButton,
  UploadedImages,
  UploadedImagePreview,
  AlertMessage,
} from "./Style";
import * as OrderService from '../../services/OrderService';
import * as ProductsService from '../../services/ProductsService';
import { useParams } from "react-router";

const Feedback = () => {
  const { orderId } = useParams(); // Lấy orderId từ URL
  const [orderDetails, setOrderDetails] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };

  const getUserId = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData && parsedUserData.user ? parsedUserData.user.id : null; // Lấy user_id từ userData
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = getToken(); // Lấy token từ localStorage
      try {
        const orderResponse = await OrderService.getOrderDetails(orderId, token); // Gọi API để lấy thông tin đơn hàng
        const order = orderResponse.data; // Truy cập vào data từ phản hồi

        if (order && order.products && Array.isArray(order.products)) {
          setOrderDetails(order);
          const initialFeedbacks = order.products.map(product => ({
            id: product.id,
            rating: 0,
            review: "",
            images: [],
            alert: "",
          }));
          setFeedbacks(initialFeedbacks); // Khởi tạo feedbacks từ sản phẩm trong đơn hàng
        } else {
          console.error("Dữ liệu không hợp lệ:", order);
        }
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy thông tin đơn hàng:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleImageUpload = (productId, event) => {
    const uploadedFiles = Array.from(event.target.files); // Lấy danh sách các file đã tải lên
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === productId
          ? { ...feedback, images: [...feedback.images, ...uploadedFiles] } // Cập nhật lại mảng 'images'
          : feedback
      )
    );
  };

  const handleImageRemove = (productId, index) => {
    setFeedbacks((prevFeedbacks) =>
      prevFeedbacks.map((feedback) =>
        feedback.id === productId
          ? { ...feedback, images: feedback.images.filter((_, i) => i !== index) }
          : feedback
      )
    );
  };

  const handleSubmit = async (productId) => {
    const feedback = feedbacks.find((f) => f.id === productId);
    if (!feedback.rating || !feedback.review.trim()) {
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((f) =>
          f.id === productId ? { ...f, alert: "Please provide both a rating and a review." } : f
        )
      );
      return;
    }

    try {
      const token = getToken(); // Lấy token từ localStorage
      await ProductsService.writeFeedback({
        product_id: productId,
        rating: feedback.rating,
        content: feedback.review,
        user_id: getUserId(), // Lấy user_id từ localStorage
        order_id: orderId,
        token,
        files: feedback.images, // Gửi mảng ảnh đã tải lên
      });

      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((f) =>
          f.id === productId
            ? { ...f, alert: "Thank you for your feedback! Your review has been submitted.", rating: 0, review: "", images: [] }
            : f
        )
      );

      setTimeout(() => {
        setFeedbacks((prevFeedbacks) =>
          prevFeedbacks.map((f) => (f.id === productId ? { ...f, alert: "" } : f))
        );
      }, 3000);
    } catch (error) {
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((f) =>
          f.id === productId ? { ...f, alert: "Error submitting feedback. Please try again." } : f
        )
      );
      console.error("Lỗi khi gửi phản hồi:", error);
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f9fb' }}>
      <div style={{ height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Customer Feedback</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FeedbackContainer>
          {orderDetails && orderDetails.products && Array.isArray(orderDetails.products) ? (
            orderDetails.products.map((product) => {
              const feedback = feedbacks.find((f) => f.id === product.id);
              const imageUrl = product.images && product.images.length > 0
                ? product.images[0].url.replace(/\\/g, '/') // Thay thế '\\' bằng '/'
                : '';
              return (
                <ProductCard key={product.id}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {imageUrl && (
                      <ProductImage src={`http://localhost:4000/${imageUrl}`} alt={product.prod_name} />
                    )}
                    <ProductName>{product.prod_name}</ProductName>
                  </div>
                  <FeedbackForm>
                    <h2>Write Your Review</h2>

                    <RatingContainer>
                      <span>Rating:</span>
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          onClick={() => setFeedbacks((prevFeedbacks) =>
                            prevFeedbacks.map((f) =>
                              f.id === product.id ? { ...f, rating: index + 1 } : f
                            )
                          )}
                          filled={index < feedback.rating}
                        >
                          <FaStar />
                        </Star>
                      ))}
                    </RatingContainer>

                    <Textarea
                      value={feedback.review}
                      onChange={(e) => setFeedbacks((prevFeedbacks) =>
                        prevFeedbacks.map((f) =>
                          f.id === product.id ? { ...f, review: e.target.value } : f
                        )
                      )}
                      placeholder="Write your feedback here..."
                    />

                    <UploadSection>
                      <UploadLabel>
                        Upload Images:
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleImageUpload(product.id, e)}
                        />
                      </UploadLabel>

                      <UploadedImages>
                        {feedback.images.map((image, index) => (
                          <UploadedImagePreview key={index}>
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Uploaded ${index}`}
                            />
                            <button onClick={() => handleImageRemove(product.id, index)}>X</button>
                          </UploadedImagePreview>
                        ))}
                      </UploadedImages>
                    </UploadSection>

                    {feedback.alert && <AlertMessage>{feedback.alert}</AlertMessage>}

                    <SubmitButton onClick={() => handleSubmit(product.id)}>Submit Feedback</SubmitButton>
                  </FeedbackForm>
                </ProductCard>
              );
            })
          ) : (
            <p>Đang tải thông tin đơn hàng...</p>
          )}
        </FeedbackContainer>
      </div>
    </div>
  );
};

export default Feedback;