import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 2rem;
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 2rem;
  margin-bottom: 2rem;
  width: 1290px;
  height: 692;
`;
export const reviewDetail = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  width: 1290px;
  height: auto;
`;

export const ProductImageContainer = styled.div`
  flex: 1;
`;

export const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h2`
  margin-top: 20px;
  font-size: 2.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
`;

export const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StarRating = styled.div`
  color: #ffc107;
  display: flex;
`;

export const ProductPrice = styled.div`
  font-size: 2rem;
  color: #eb3a7b;
  font-weight: bold;
  margin: 1rem 0;
`;

export const ProductDescription = styled.div`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
`;


export const WrapperQuantity = styled.div`
  display: flex;
  margin-left: 10px;
  align-items: center;
  justify-content: space-between;
  width: 120px;
  height: 45px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
export const QuantitySelector = styled.div`
 display: flex;
  align-items: center;
  margin: 10px 0;
`;

export const QuantityInput = styled.input`
  width: 30px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
`;

export const Button = styled.button`
margin: auto;
   font-size: 15px;
  font-weight: 600;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #555;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
margin-top: 30px;
  background-color: #fff;
  color: #24aeb1;
  border: 1px solid #24aeb1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 17px;
  width: 170px;
  height: 55px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &.primary {
    background-color: #24aeb1;
    color: #fff;
  }

  &:hover {
    background-color: #e0f7f8;
  }

  &.primary:hover {
    background-color: #1d9195;
  }
`;

export const TabContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  width: 1290px;
`;

export const TabItem = styled.div`
  cursor: pointer;
  padding: 1rem;
  color: #333;
  transition: color 0.3s;
  font-size: 16px;

  &.active {
    color: #24aeb1;
    border-bottom: 2px solid #24aeb1;
    font-weight: bold;
  }

  &:hover {
    color: #24aeb1;
  }
`;

export const TabContent = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

export const RelatedProductsContainer = styled.div`
  margin-top: 2rem;
  width: 1290px;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const RelatedProducts = styled.div`
  display: flex;
  width: 1290px;
  /* overflow-x: hidden; */
  justify-content: center;
  gap: 20px;
`;

export const RelatedProductCard = styled.div`
  min-width: 150px;
    width: 1290px;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const RelatedProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;


// Container cho ảnh nhỏ
export const ThumbnailContainer = styled.div`
  display: flex;
  margin-top: 20px;
`;

// Style cho từng ảnh nhỏ
export const ThumbnailImage = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 10px;
  cursor: pointer;
  border: 2px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #333;
    transform: scale(1.1);
  }
`;

// Style cho ảnh lớn
export const ProductImage = styled.img`
  width: 600px;  
  height: 600px;
  object-fit: cover;
  margin: 10px;
  border-radius: 0.75rem;
`;
