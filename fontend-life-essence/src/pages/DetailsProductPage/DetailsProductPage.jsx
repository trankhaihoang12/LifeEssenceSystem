"use client";
import React, { useEffect, useState } from "react";
import * as ProductsService from '../../services/ProductsService'
import * as OrderService from '../../services/OrderService'
import * as message from '../../components/MessageComponent/Message'

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
  ThumbnailContainer,
  ThumbnailImage,
  WrapperQuantity,
  Button
} from './Style';
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slides/cartSlice";
import { GrFormNext } from "react-icons/gr";
import { FaEnvelope, FaFacebook, FaGoogle, FaInstagram, FaMinus, FaPlus, FaTwitter } from "react-icons/fa";
import { Modal, Rate } from "antd";
import BlogCardComponent from "../../components/BlogCardComponent/BlogCardComponent";
import ReviewForm from "../../components/ReviewForm/ReviewForm";



const HealthStore = () => {
  const [selectedTab, setSelectedTab] = useState("description");
  const { id } = useParams();  // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");  // Lưu trữ hình ảnh được chọn
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const dispatch = useDispatch();


  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const goToHome = () => {
    navigate("/");
  };
  const goBackToCategory = () => {
    navigate(-1); // Quay lại trang trước
  };

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };


  // Hàm xử lý khi thêm sản phẩm vào giỏ
  const handleAddToCart = async () => {
    const token = getToken();
    if (!token) {
      Modal.confirm({
        title: 'Bạn chưa đăng nhập',
        content: 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Bạn có muốn chuyển đến trang đăng nhập không?',
        okText: 'Đồng ý',
        cancelText: 'Hủy',
        onOk: () => navigate('/signIn'), // Đường dẫn đến trang đăng nhập của bạn
      });
      return;
    }

    try {
      const response = await OrderService.addToCart(product.id, quantity, token); // Gọi API
      message.success('Sản phẩm đã được thêm vào giỏ hàng!');
      dispatch(addItem(product));
      // Thực hiện xử lý nếu thành công, ví dụ hiển thị thông báo hoặc cập nhật giỏ hàng
    } catch (error) {
      message.error("Không thể thêm sản phẩm vào giỏ hàng.");
    }
  };

  // Hàm tăng số lượng
  const handleIncrease = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Hàm giảm số lượng
  const handleDecrease = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1); // Số lượng không được nhỏ hơn 1
  };

  useEffect(() => {
    // Gọi API để lấy chi tiết sản phẩm
    const fetchProduct = async () => {
      try {
        const data = await ProductsService.getProductById(id);
        setProduct(data.data);  // Lưu dữ liệu sản phẩm vào state
        // Đặt hình ảnh mặc định là hình đầu tiên trong danh sách hình ảnh
        if (data.data.images && data.data.images.length > 0) {
          setSelectedImage(data.data.images[0].url);
        }
      } catch (error) {
        console.error('Không thể lấy chi tiết sản phẩm:', error);
      }
    };

    fetchProduct();
  }, [id]);  // Khi ID thay đổi, sẽ gọi lại API

  if (!product) {
    return <div>Loading...</div>;
  }
  // Cập nhật các giá trị từ API
  const { prod_name, prod_description, price, images, ratings, discount } = product;
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);  // Cập nhật hình ảnh lớn khi click vào ảnh nhỏ
  };

  return (
    <PageContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '1290px', height: '50px' }}>
          <span style={{ fontSize: '1.7rem' }}>
            <span onClick={goToHome} style={{ cursor: 'pointer' }}>Home</span>
            <GrFormNext style={{ margin: '0 5px', verticalAlign: 'middle' }} />
            <span onClick={goBackToCategory} style={{ cursor: 'pointer', color: 'inherit' }}>
              Products {product.category_id}
            </span>
            <GrFormNext style={{ margin: '0 5px', verticalAlign: 'middle' }} />
            {product.prod_name}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ProductDetailContainer>
          <ProductImageContainer>
            <ProductImage src={`http://localhost:4000/${selectedImage}`} alt={prod_name} />
            {/* Hình ảnh nhỏ */}
            <ThumbnailContainer>
              {images && images.length > 0 && images.map((image, index) => (
                <ThumbnailImage
                  key={index}
                  src={`http://localhost:4000/${image.url}`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(image.url)}
                />
              ))}
            </ThumbnailContainer>
          </ProductImageContainer>
          <ProductInfo>
            <div style={{ width: '70px', height: '25px', backgroundColor: '#7ad03a', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>
                {(discount * 100).toFixed(0)} %  OFF
              </span>
            </div>
            <ProductTitle>{prod_name}</ProductTitle>
            <ProductRating>
              <StarRating>
                <Rate
                  value={ratings}
                  allowHalf
                  disabled
                  style={{ color: '#FFD700', fontSize: '18px' }} // Customize color and size
                />
              </StarRating>
            </ProductRating>
            <ProductPrice>${price}</ProductPrice>
            <ProductDescription>
              {prod_description}
            </ProductDescription>
            <QuantitySelector>
              <h2>Quantity:</h2>
              <WrapperQuantity>
                <Button onClick={handleDecrease}><FaMinus /></Button>
                <QuantityInput
                  type="number"
                  value={quantity}
                  readOnly
                />
                <Button onClick={handleIncrease}><FaPlus /></Button>
              </WrapperQuantity>
            </QuantitySelector>
            <ActionButtons>
              <ActionButton primary onClick={handleAddToCart}>Add to Cart</ActionButton>
              <ActionButton>Add to Wishlist</ActionButton>
            </ActionButtons>
            <div style={{ height: '200px', width: '100%', marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '10px' }}>SKU : <span style={{ fontWeight: 'normal', color: '#666' }}>12345XYZ</span></span>
              <span style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '10px' }}>Categories : <span style={{ fontWeight: 'normal', color: '#666' }}>Electronics, Gadgets</span></span>
              <span style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '10px' }}>Tags : <span style={{ fontWeight: 'normal', color: '#666' }}>Trending, New Arrival</span></span>
              <span style={{ fontWeight: 'bold', fontSize: '12px', marginTop: '10px' }}>
                Share :
                <a
                  href="https://www.facebook.com"
                  style={{
                    marginLeft: '5px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#24aeb1'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com"
                  style={{
                    marginLeft: '5px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#24aeb1'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.google.com"
                  style={{
                    marginLeft: '5px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#24aeb1'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                >
                  <FaGoogle />
                </a>
                <a
                  href="https://www.twitter.com"
                  style={{
                    marginLeft: '5px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#24aeb1'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                >
                  <FaTwitter />
                </a>
                <a
                  href="mailto:example@example.com"
                  style={{
                    marginLeft: '5px',
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#24aeb1'}
                  onMouseLeave={(e) => e.target.style.color = '#666'}
                >
                  <FaEnvelope />
                </a>
              </span>
            </div>
          </ProductInfo>

        </ProductDetailContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>

        <reviewDetail>
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
            {selectedTab === "description" && <p>{prod_description}</p>}
            {selectedTab === "additional" && <p>Additional information about the product...</p>}
            {selectedTab === "reviews" && <ReviewForm />}
          </TabContent>
        </reviewDetail>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <RelatedProductsContainer>
          <h1 style={{ fontWeight: 'bold', marginBottom: '50px' }}>Related Products</h1>
          <RelatedProducts>
            <BlogCardComponent></BlogCardComponent>
            <BlogCardComponent></BlogCardComponent>
            <BlogCardComponent></BlogCardComponent>
          </RelatedProducts>
        </RelatedProductsContainer>
      </div>
    </PageContainer>
  );
};

export default HealthStore;
