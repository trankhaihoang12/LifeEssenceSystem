"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Sidebar = styled.div`
  position: relative;
  left: 0;
  top: 10;
  width: 240px;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
`;

const MainContent = styled.div`
  flex: 1;
  // margin-left: px;
  padding: 2rem;
  background-color: #f5f5f5;
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const CategoryList = styled.div`
  margin-top: 2rem;
`;

const CategoryItem = styled.div`
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.3s ease;

  &:hover {
    color: #24aeb1;
  }
`;

const SubMenu = styled.div`
  margin-left: 1rem;
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  transition: max-height 0.4s ease, opacity 0.4s ease;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;

const SubMenuItem = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0;
  color: #666;
  transition: color 0.3s ease, padding-left 0.3s ease;

  &:hover {
    color: #24aeb1;
    padding-left: 10px;
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    color: ${(props) => (props.isFavorite ? "#ff5a5f" : "#888")};
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 12rem;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.span`
  font-size: 0.75rem;
  color: #24aeb1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  color: #333;
  margin: 0.5rem 0;
  font-weight: 600;
`;

const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #24aeb1;
`;

const HealthStore = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Product 1", rating: 4.8, category: "Health", price: 29.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 3, name: "Product 3", rating: 3.9, category: "Wellness", price: 15.99 },
    { id: 4, name: "Product 4", rating: 4.5, category: "Health", price: 24.99 },
    { id: 5, name: "Product 5", rating: 4.0, category: "Beauty", price: 12.49 },
    { id: 6, name: "Product 6", rating: 4.3, category: "Fitness", price: 18.49 },
    { id: 7, name: "Product 7", rating: 3.7, category: "Wellness", price: 22.99 },
    { id: 8, name: "Product 8", rating: 4.1, category: "Health", price: 17.99 },
    { id: 9, name: "Product 9", rating: 4.6, category: "Beauty", price: 14.99 },
    { id: 10, name: "Product 10", rating: 3.8, category: "Fitness", price: 16.99 }
  ];
  
  const toggleCategory = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const toggleSubMenu = () => {
    setIsSubMenuOpen((prev) => !prev);
  };

  const renderStars = (rating) => (
    <div className="flex gap-0.5 text-yellow-400">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );

  return (
    <PageContainer>
      <Sidebar>
        <h1>Logo</h1>
        <CategoryList>
          <CategoryItem onClick={toggleSubMenu}>
            Vitamin & Khoáng chất {isSubMenuOpen ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={isSubMenuOpen}>
            <SubMenuItem>Vitamin A</SubMenuItem>
            <SubMenuItem>Vitamin C</SubMenuItem>
            <SubMenuItem>Khoáng chất</SubMenuItem>
          </SubMenu>
          <CategoryItem onClick={() => toggleCategory("Chăm sóc tóc")}>Chăm sóc tóc</CategoryItem>
          <CategoryItem onClick={() => toggleCategory("Tim mạch")}>Tim mạch</CategoryItem>
          <CategoryItem onClick={() => toggleCategory("Tiểu đường")}>Tiểu đường</CategoryItem>
        </CategoryList>
      </Sidebar>
      <MainContent>
        <h2>Products</h2>
        <ProductsContainer>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={`https://via.placeholder.com/150`} alt={product.name} />
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              {renderStars(product.rating)}
              <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
              <FavoriteButton
                isFavorite={favorites.has(product.id)}
                onClick={() => toggleFavorite(product.id)}
              >
                <Heart />
              </FavoriteButton>
            </ProductCard>
          ))}
        </ProductsContainer>
      </MainContent>
    </PageContainer>
  );
};

export default HealthStore;
