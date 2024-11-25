import React, { useState } from "react";
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

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState("");

  const products = [
    {
      id: "1",
      name: "Garlic Oil 1000 MG+",
      image: "https://storage.googleapis.com/a1aa/image/GA7JzaE18l7nC1IMzadB3wwqm6he1GdVe8bJpXU4FjE514vTA.jpg",
    },
    {
      id: "2",
      name: "Vitamin D 1000U",
      image: "https://storage.googleapis.com/a1aa/image/FSLb3VSe6MXNICdMThYAIR4pDu6UGauflsnASXrd2Zj414vTA.jpg",
    },
  ];

  const handleImageUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setImages((prevImages) => [...prevImages, ...uploadedFiles]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!rating || !review.trim()) {
      setAlert("Please provide both a rating and a review.");
      return;
    }

    setAlert("Thank you for your feedback! Your review has been submitted.");
    setTimeout(() => setAlert(""), 3000); // Tự động xóa thông báo sau 3 giây
    setRating(0);
    setReview("");
    setImages([]);
  };

  return (
    <FeedbackContainer>
      <h1>Customer Feedback</h1>

      {products.map((product) => (
        <ProductCard key={product.id}>
          <ProductImage src={product.image} alt={product.name} />
          <ProductName>{product.name}</ProductName>
        </ProductCard>
      ))}

      <FeedbackForm>
        <h2>Write Your Review</h2>

        <RatingContainer>
          <span>Rating:</span>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              onClick={() => setRating(index + 1)}
              filled={index < rating}
            >
              <FaStar />
            </Star>
          ))}
        </RatingContainer>

        <Textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your feedback here..."
        />

        <UploadSection>
          <UploadLabel>
            Upload Images:
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
          </UploadLabel>

          <UploadedImages>
            {images.map((image, index) => (
              <UploadedImagePreview key={index}>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded ${index}`}
                />
                <button onClick={() => handleImageRemove(index)}>X</button>
              </UploadedImagePreview>
            ))}
          </UploadedImages>
        </UploadSection>

        {alert && <AlertMessage>{alert}</AlertMessage>}

        <SubmitButton onClick={handleSubmit}>Submit Feedback</SubmitButton>
      </FeedbackForm>
    </FeedbackContainer>
  );
};

export default Feedback;
