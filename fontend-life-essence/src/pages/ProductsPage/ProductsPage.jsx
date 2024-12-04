"use client";
import React, { useEffect, useState } from "react";
import { Heart, ChevronDown, ChevronUp } from "lucide-react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import * as ProductsService from '../../services/ProductsService'
import * as OrderService from '../../services/OrderService'
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
  CurrentPrice,
  AddToCartWrapper,
  CartButton,
  CartIcon,
  AddToCartText
} from "./Style";
import { Rate } from "antd";
import { useDispatch } from "react-redux";
import * as message from '../../components/MessageComponent/Message'
import { addItem } from "../../redux/slides/cartSlice";

const ProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { categoryId } = useParams();
  console.log('categoryId', categoryId)
  const [categoryName, setCategoryName] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [products, setProducts] = useState([]); // State để lưu sản phẩm theo danh mục
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [openSubMenus, setOpenSubMenus] = useState({
    calcium: false,
    goldenHealth: false,
    collagen: false,
    omega3: false,
    heightGrowth: false,
    glucosamine: false
  });


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

  const toggleSubMenu = (menu) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
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

  const handleFilter = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue,
    }));
    setSearchQuery(filterValue); // Cập nhật từ khóa tìm kiếm (nếu cần)
  };
  const handleFilterRating = (filterKey, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: filterValue, // Giữ lại giá trị rating khi search
    }));
  };
  
  

  // useEffect 1: Hiển thị sản phẩm theo category
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

  // useEffect 2: Lọc sản phẩm khi có keyy
  useEffect(() => {
    const fetchFilteredProducts = async () => {
      if (filters.category || filters.rating) {
        try {
          const params = {
            category: filters.category || categoryId,
            page: 1,
            limit: 10,
            sort: 'asc', // Chỉ thêm sort khi cần
            ratings: filters.rating, // Thêm rating nếu có
            search: searchQuery, // Thêm search nếu có
          };
          // Nếu có rating, bỏ qua search
          if (filters.rating) {
            params.ratings = filters.rating;
          } else if (searchQuery) {
            // Chỉ thêm search nếu không lọc theo rating
            params.search = searchQuery;
          }
          const response = await ProductsService.fetchAllProducts(params);
          const data = response.products;

          if (Array.isArray(data)) {
            setProducts(data.map(product => ({
              id: product.id,
              name: product.prod_name,
              category: product.Category?.name || "Chưa có danh mục",
              price: parseFloat(product.price),
              rating: product.ratings,
              imageUrl: product.images?.[0]?.url
                ? `http://localhost:3000/${product.images[0].url.replace(/\\/g, '/')}`
                : `https://picsum.photos/200`,
            })));
          } else {
            setProducts([]); // Đặt lại thành mảng rỗng nếu không phải mảng
            console.log('setProducts', setProducts)
          }
        } catch (error) {
          console.error('Lỗi khi lọc sản phẩm:', error);
        }
      }
    };

    fetchFilteredProducts();
  }, [filters.category, filters.rating, searchQuery]); // Theo dõi filters.category để lọc lại khi thay đổi

  // useEffect 3: Tìm kiếm sản phẩm khi có từ khóa
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
          console.log('data', data)

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

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData?.token || null;
  };

  const addItemToCart = async (product) => {
    const token = getToken(); // Lấy token từ localStorage

    try {
      setLoading(true);
      // Gọi API để thêm sản phẩm vào giỏ hàng
      await OrderService.addToCart(product.id, 1, token);

      // Cập nhật giỏ hàng trong state để hiển thị ngay lập tức
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.product_id === product.id);
        dispatch(addItem(product));

        if (existingItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
          return prevItems.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ
          return [
            ...prevItems,
            {
              ...product, // Copy toàn bộ thông tin sản phẩm
              product_id: product.id,
              quantity: 1,
              image: product.images?.[0]?.url || "https://via.placeholder.com/150", // Gắn thông tin ảnh// Số lượng ban đầu là 1
            }
          ];
        }
      });
      message.success('Sản phẩm đã được thêm vào giỏ hàng!');
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
      message.error('Lỗi khi thêm sản phẩm vào giỏ hàng!'); // Hiển thị thông báo lỗi
    }
  };


  return (
    <PageContainer>
      <Sidebar>
        <h1 style={{ fontWeight: 'bold' }}>Categories</h1>
        <CategoryList>
          <CategoryItem onClick={() => toggleSubMenu('calcium')}>
            Canxi & Vitamin {openSubMenus.calcium ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.calcium}>
            <SubMenuItem onClick={() => handleFilter('category', 'Vitamin A')}>Vitamin A</SubMenuItem>
            <SubMenuItem onClick={() => handleFilter('category', 'Vitamin B')}>Vitamin B</SubMenuItem>
            <SubMenuItem onClick={() => handleFilter('category', 'Vitamin C')}>Vitamin C</SubMenuItem>
          </SubMenu>

          <CategoryItem onClick={() => toggleSubMenu('goldenHealth')}>
            Golden Health {openSubMenus.goldenHealth ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.goldenHealth}>
            <SubMenuItem onClick={() => handleFilter('category', 'Liver')}>Liver Detoxification</SubMenuItem>
            <SubMenuItem onClick={() => handleFilter('category', 'Cardiovascular Health')}>Cardiovascular Health</SubMenuItem>
            <SubMenuItem onClick={() => handleFilter('category', 'Brain Health')}>Brain Health</SubMenuItem>
            <SubMenuItem onClick={() => handleFilter('category', 'Anti-Aging')}>Anti-Aging</SubMenuItem>
          </SubMenu>

          <CategoryItem onClick={() => toggleSubMenu('collagen')}>
            Collagen {openSubMenus.collagen ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.collagen}>
            <SubMenuItem onClick={() => handleFilter('category', 'skin')}>Beautiful skin</SubMenuItem>
          </SubMenu>

          <CategoryItem onClick={() => toggleSubMenu('omega3')}>
            Omega-3 Fish Oil {openSubMenus.omega3 ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.omega3}>
            <SubMenuItem onClick={() => handleFilter('category', 'Eye')}>Eye-catching</SubMenuItem>
          </SubMenu>

          <CategoryItem onClick={() => toggleSubMenu('heightGrowth')}>
            Height Growth {openSubMenus.heightGrowth ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.heightGrowth}>
            <SubMenuItem onClick={() => handleFilter('category', 'height')}>Improve your figure</SubMenuItem>
          </SubMenu>

          <CategoryItem onClick={() => toggleSubMenu('glucosamine')}>
            Glucosamine {openSubMenus.glucosamine ? <ChevronUp /> : <ChevronDown />}
          </CategoryItem>
          <SubMenu isOpen={openSubMenus.glucosamine}>
            <SubMenuItem onClick={() => handleFilter('category', 'Xuong')}>Bone and joint supplement</SubMenuItem>
          </SubMenu>

        </CategoryList>
        <CategoryList>
          <h3>Filter by Rating</h3>
          <Rate
            allowHalf
            defaultValue={0}
            onChange={(value) => handleFilterRating('rating', value)}
          />
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
              <ProductCard key={product.id} >
                <ProductImage src={product.imageUrl} alt={product.name} onClick={() => navigate(`/details-product/${product.id}`)} />
                <ProductCategory>{product.category}</ProductCategory>
                <ProductName>{product.name}</ProductName>
                {renderStars(product.rating)}
                <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
                <AddToCartWrapper>
                  <CartButton>
                    <CartIcon />
                  </CartButton>
                  <AddToCartText onClick={() => addItemToCart(product)}>ADD TO CART</AddToCartText>
                </AddToCartWrapper>
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

