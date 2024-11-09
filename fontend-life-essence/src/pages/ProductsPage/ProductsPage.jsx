"use client";
import React, { useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  Sidebar,
  MainContent,
  ProductsContainer,
  CategoryList,
  CategoryItem,
  SubMenu,
  SubMenuItem,
  ProductCard,
  FavoriteButton,
  ProductImage,
  ProductCategory,
  ProductName,
  CurrentPrice,
} from "./Style";

const HealthStore = () => {
  const navigate = useNavigate();
  const [setOpenCategory] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Product 1", rating: 4.8, category: "Health", price: 29.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    { id: 2, name: "Product 2", rating: 4.2, category: "Fitness", price: 19.99 },
    // Add other products here
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
    <div style={{ display: 'flex', gap: '2px', color: '#FFD700' }}>
      {[...Array(5)].map((_, index) => (
        <span key={index} style={{ color: index < Math.floor(rating) ? '#FFD700' : '#D3D3D3' }}>
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
            <ProductCard key={product.id} onClick={() => navigate('/details-product')}>
              <ProductImage src={`https://picsum.photos/200`} alt={product.name} />
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

