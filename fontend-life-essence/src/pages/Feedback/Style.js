import styled from "styled-components";

export const FeedbackContainer = styled.div`
  width: 1000px;
  margin-top: 20px;
  margin-bottom: 100px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  font-size: 18px; /* Toàn bộ chữ to hơn */
  color: #333;
`;

export const ProductCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
`;

export const ProductImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
`;

export const ProductName = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: auto;
  color: #333;
  width: 300px;
`;

export const FeedbackForm = styled.div`
  margin-top: 20px;
`;

export const Textarea = styled.textarea`
  width: 500px;
  height: 120px;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  resize: none;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
`;

export const Star = styled.span`
  font-size: 28px;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#ffc107" : "#e0e0e0")};
  &:hover {
    color: #ffcc00;
    transform: scale(1.1);
  }
  transition: transform 0.2s;
`;

export const UploadSection = styled.div`
  margin: 20px 0;
`;

export const UploadLabel = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 10px;
  color: #555;
  cursor: pointer;

  input {
    display: none;
  }
`;

export const UploadedImages = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const UploadedImagePreview = styled.div`
  position: relative;

  img {
    width: 150px; 
    height: 150px; 
    border-radius: 10px; 
    object-fit: cover;
    border: 3px solid #ddd; 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }

  button {
    position: absolute;
    top: -10px;
    right: -10px;
    background: rgba(255, 0, 0, 0.7); /* Màu đỏ đậm hơn */
    color: white;
    border: none;
    border-radius: 50%;
    padding: 6px;
    cursor: pointer;
  }
`;


export const SubmitButton = styled.button`
  background-color: #24aeb1;
  color: white;
  border: none;
  padding: 12px 30px; /* Tăng kích thước padding */
  font-size: 16px; /* Tăng kích thước chữ */
  border-radius: 8px; /* Làm nút mềm mại hơn */
  cursor: pointer;
  display: block;
  margin: 20px auto; /* Căn giữa nút */
  font-weight: bold;
  text-align: center;
  margin-right: 10px;

  &:hover {
    background-color: #1d9195;
  }
`;



export const AlertMessage = styled.div`
  margin-top: 10px;
  color: ${(props) => (props.type === "error" ? "#e74c3c" : "#2ecc71")};
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
