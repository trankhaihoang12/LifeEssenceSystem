"use client";
import React, { useEffect, useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as ProductsService from '../../services/ProductsService'
import { GrFormNext } from "react-icons/gr";
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
import { Rate } from "antd";

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId } = useParams();
  console.log('categoryId', categoryId)
  const [, setOpenCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [products, setProducts] = useState([]); // State để lưu sản phẩm theo danh mục
  const [searchQuery, setSearchQuery] = useState(""); 

  

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
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Rate
        value={rating}
        allowHalf
        disabled
        style={{ color: '#FFD700', fontSize: '16px' }} // Customize color and size
      />
    </div>
  );
  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (categoryId) {
        try {
          const response = await ProductsService.getProductsByCategory(categoryId);
          const data = response.data; // Lấy dữ liệu từ response

          // Kiểm tra nếu data là mảng
          if (Array.isArray(data)) {
            // Cập nhật sản phẩm lấy được
            setProducts(data.map(product => ({
              id: product.id,
              name: product.prod_name,
              category: product.Category.name, // Truy cập tên danh mục
              price: parseFloat(product.price), // Chuyển đổi giá thành số
              rating: product.ratings,
              imageUrl: product.images?.[0]?.url
                ? `http://localhost:3000/${product.images[0].url.replace(/\\/g, '/')}`
                : `https://picsum.photos/200`,
            })));
            setCategoryName(data[0]?.Category?.name || "");
          } else {
            console.error('Dữ liệu không phải là mảng:', data);
            setProducts([]); // Đặt lại thành mảng rỗng nếu không phải mảng
          }
        } catch (error) {
          console.error('Lỗi khi lấy sản phẩm:', error);
        }
      }
    };

    fetchProducts();
  }, [categoryId]); // Gọi lại hàm khi danh mục thay đổi
  

  // useEffect 2: Tìm kiếm sản phẩm khi có từ khóa
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQueryParam = queryParams.get('search'); // Lấy từ khóa tìm kiếm từ URL
    setSearchQuery(searchQueryParam || "");

    if (searchQueryParam) {
      const fetchProductsBySearch = async () => {
        try {
          const response = await ProductsService.fetchAllProducts({
            search: searchQueryParam,
            page: 1, // Trang đầu tiên
            limit: 10, // Số lượng sản phẩm mỗi trang
            sort: 'asc', // Sắp xếp theo giá tăng dần
          });
          console.log('response', response)

          const data = response.products; // Lấy dữ liệu sản phẩm từ API
          console.log('data',data)

          if (Array.isArray(data)) {
            setProducts(data.map((product) => ({
              id: product.id,
              name: product.prod_name,
              category: product.Category?.name || "Chưa có danh mục",
              price: parseFloat(product.price),
              rating: product.ratings,
              imageUrl: product.images?.[0]?.url
                ? `http://localhost:3000/${product.images[0].url.replace(/\\/g, '/')}`
                : `https://picsum.photos/200`,
            })));
          }
        } catch (error) {
          console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        }
      };
      fetchProductsBySearch();
    }
  }, [location.search]); // Chạy khi `searchQuery` thay đổi

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
        <div style={{ height: '20px', width: '500px', display: 'flex', alignItems: 'center' }}>
          <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span onClick={goToHome}>Home</span>
            <GrFormNext style={{ margin: '0 5px', verticalAlign: 'middle' }} />
            Products {categoryName}
          </h2>
        </div>
        <ProductsContainer>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} onClick={() => navigate(`/details-product/${product.id}`)}>
                <ProductImage src={product.imageUrl} alt={product.name} />
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
            ))
          ) : (
            <p>Không có sản phẩm nào để hiển thị.</p>
          )}
        </ProductsContainer>
      </MainContent>
    </PageContainer>
  );
};

export default ProductPage;

