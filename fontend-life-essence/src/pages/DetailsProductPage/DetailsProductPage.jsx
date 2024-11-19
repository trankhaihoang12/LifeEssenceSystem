"use client";
import React, { useState } from "react";

import {  Star } from "lucide-react";

import {
  PageContainer,
  ProductDetailContainer,
  ProductImageContainer,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductRating,
  StarRating,
  QuantitySelector,
  QuantityInput,
  ActionButtons,
  ActionButton,
  TabContainer,
  TabItem,
  TabContent,
  RelatedProductsContainer,
  RelatedProducts,
  RelatedProductCard
} from './Style';

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
          <RelatedProductCard>
            <ProductImage src="https://picsum.photos/200" alt="Product 1" />
            <p>Product 1</p>
          </RelatedProductCard>
          <RelatedProductCard>
            <ProductImage src="https://picsum.photos/200" alt="Product 2" />
            <p>Product 2</p>
          </RelatedProductCard>
        </RelatedProducts>
      </RelatedProductsContainer>
    </PageContainer>
  );
};

export default HealthStore;
