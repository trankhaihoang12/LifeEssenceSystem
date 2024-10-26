"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Heart, ChevronDown, ChevronUp, Star } from "lucide-react";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const ProductDetailContainer = styled.div`
  display: flex;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProductImageContainer = styled.div`
  flex: 1;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.75rem;
`;

const ProductInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  color: #333;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarRating = styled.div`
  color: #ffc107;
  display:flex;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  color: #24aeb1;
  font-weight: bold;
  margin: 1rem 0;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
  background-color: ${(props) => (props.primary ? "#24aeb1" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#24aeb1")};
  border: ${(props) => (props.primary ? "none" : "1px solid #24aeb1")};
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.primary ? "#1d9195" : "#e0f7f8")};
  }
`;

const TabContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const TabItem = styled.div`
  cursor: pointer;
  padding: 1rem;
  color: ${(props) => (props.active ? "#24aeb1" : "#333")};
  border-bottom: ${(props) => (props.active ? "2px solid #24aeb1" : "none")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  transition: color 0.3s;

  &:hover {
    color: #24aeb1;
  }
`;

const TabContent = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
`;

const RelatedProductsContainer = styled.div`
  margin-top: 2rem;
`;

const RelatedProducts = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1rem;
`;

const RelatedProductCard = styled.div`
  min-width: 150px;
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HealthStore = () => {
  const [selectedTab, setSelectedTab] = useState("description");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <PageContainer>
      <ProductDetailContainer>
        <ProductImageContainer>
          <ProductImage src="https://via.placeholder.com/300" alt="Vitamin D" />
        </ProductImageContainer>
        <ProductInfo>
          <ProductTitle>Vitamin D 1000 IU</ProductTitle>
          <ProductRating>
            <StarRating>
              {[...Array(5)].map((_, index) => (
                <Star key={index} fill={index < 4 ? "#ffc107" : "#e0e0e0"} />
              ))}
            </StarRating>
            <span>(4.5)</span>
          </ProductRating>
          <ProductPrice>$24.99</ProductPrice>
          <ProductDescription>
            A great source of Vitamin D to support your health and immunity.
          </ProductDescription>
          <QuantitySelector>
            <span>Quantity:</span>
            <QuantityInput type="number" min="1" defaultValue="1" />
          </QuantitySelector>
          <ActionButtons>
            <ActionButton primary>Add to Cart</ActionButton>
            <ActionButton>Add to Wishlist</ActionButton>
          </ActionButtons>
        </ProductInfo>
      </ProductDetailContainer>
      <TabContainer>
        <TabItem active={selectedTab === "description"} onClick={() => handleTabClick("description")}>
          Description
        </TabItem>
        <TabItem active={selectedTab === "additional"} onClick={() => handleTabClick("additional")}>
          Additional Information
        </TabItem>
        <TabItem active={selectedTab === "reviews"} onClick={() => handleTabClick("reviews")}>
          Reviews
        </TabItem>
      </TabContainer>
      <TabContent>
        {selectedTab === "description" && <p>Product description goes here...</p>}
        {selectedTab === "additional" && <p>Additional information about the product...</p>}
        {selectedTab === "reviews" && <p>Customer reviews will be shown here...</p>}
      </TabContent>
      <RelatedProductsContainer>
        <h3>Related Products</h3>
        <RelatedProducts>
          {/* Loop and Render Related Products */}
          <RelatedProductCard>
            <ProductImage src="https://via.placeholder.com/100" alt="Product 1" />
            <p>Product 1</p>
          </RelatedProductCard>
          <RelatedProductCard>
            <ProductImage src="https://via.placeholder.com/100" alt="Product 2" />
            <p>Product 2</p>
          </RelatedProductCard>
        </RelatedProducts>
      </RelatedProductsContainer>
    </PageContainer>
  );
};

export default HealthStore;
