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
`;

export const ProductImageContainer = styled.div`
  flex: 1;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`;

export const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
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
  font-size: 1.5rem;
  color: #24aeb1;
  font-weight: bold;
  margin: 1rem 0;
`;

export const ProductDescription = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

export const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  background-color: #fff;
  color: #24aeb1;
  border: 1px solid #24aeb1;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
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
`;

export const TabItem = styled.div`
  cursor: pointer;
  padding: 1rem;
  color: #333;
  transition: color 0.3s;

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
`;

export const RelatedProducts = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
`;

export const RelatedProductCard = styled.div`
  min-width: 150px;
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
