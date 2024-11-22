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
  CurrentPrice} from "./Style";

const ProductPage = () => {
  const navigate = useNavigate();
  const [, setOpenCategory] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const products = [
    { id: 1, name: "Omega-3 Fish Oil", rating: 4.8, category: "Cardiovascular Support", price: 55.00 },
    { id: 2, name: "Collagen Plus Vitamin C", rating: 5.0, category: "Anti-Aging and Skin Health", price: 45.00 },
    { id: 3, name: "Vitamin D3", rating: 4.5, category: "Vitamins and Minerals", price: 35.00 },
    { id: 4, name: "Calcium Magnesium Zinc", rating: 4.0, category: "Vitamins and Minerals", price: 25.65 },
    { id: 5, name: "Glucosamine Chondroitin MSM", rating: 5.0, category: "Joint and Bone Support", price: 25.35 },
    { id: 6, name: "Probiotic 10", rating: 4.0, category: "Digestive Support", price: 19.99 },
    { id: 7, name: "Vitamin C", rating: 4.5, category: "Vitamins and Minerals", price: 20.05 },
    { id: 8, name: "Collagen Plus Vitamin C", rating: 4.2, category: "Anti-Aging and Skin Health", price: 20.00 },
    { id: 9, name: "Biotin", rating: 4.5, category: "Anti-Aging and Skin Health", price: 40.00 },
    { id: 10, name: "Melatonin", rating: 5.0, category: "Sleep and Nervous System Support", price: 30.05 },
    { id: 11, name: "Coenzyme Q10", rating: 2.0, category: "Cardiovascular Support", price: 15.99 },
    { id: 12, name: "Magnesium", rating: 4.2, category: "Sleep and Nervous System Support", price: 19.95 },
    { id: 12, name: "Multivitamin for Men", rating: 5.0, category: "Energy and Sexual Health", price: 39.99 },
    { id: 13, name: "Biotin 10,000 mcg", rating: 3.0, category: "Hair and Nail Strengthening", price: 29.99 },
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
        <h1>Product Category</h1>
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
          <CategoryItem onClick={() => toggleCategory("Tiểu đường")}>Tiểu đường</CategoryItem>
          <CategoryItem onClick={() => toggleCategory("Tiểu đường")}>Tiểu đường</CategoryItem>
          <CategoryItem onClick={() => toggleCategory("Tiểu đường")}>Tiểu đường</CategoryItem>
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

export default ProductPage;

