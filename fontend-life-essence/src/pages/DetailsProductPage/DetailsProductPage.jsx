"use client";
import React, { useEffect, useState } from "react";
import * as ProductsService from '../../services/ProductsService'
import * as OrderService from '../../services/OrderService'
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
  RelatedProductCard,
  ThumbnailContainer,
  ThumbnailImage
} from './Style';
import { useParams } from "react-router";



const HealthStore = () => {
  const [selectedTab, setSelectedTab] = useState("description");
  const { id } = useParams();  // Lấy ID sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");  // Lưu trữ hình ảnh được chọn
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
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
      setError("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      const response = await OrderService.addToCart(product.id, quantity, token); // Gọi API
      console.log("Sản phẩm đã được thêm vào giỏ:", response);
      // Thực hiện xử lý nếu thành công, ví dụ hiển thị thông báo hoặc cập nhật giỏ hàng
    } catch (error) {
      setError("Không thể thêm sản phẩm vào giỏ hàng.");
    }
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
  const { prod_name, prod_description, price, images, ratings } = product;
  const handleThumbnailClick = (imageUrl) => {
    setSelectedImage(imageUrl);  // Cập nhật hình ảnh lớn khi click vào ảnh nhỏ
  };

  return (
    <PageContainer>
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
          <ProductTitle>{prod_name}</ProductTitle>
          <ProductRating>
            <StarRating>
              {[...Array(5)].map((_, index) => (
                <Star key={index} fill={index < Math.floor(ratings / 100)} color="#ffc107" />
              ))}
            </StarRating>
            <span>({ratings})</span>
          </ProductRating>
          <ProductPrice>${price}</ProductPrice>
          <ProductDescription>
            {prod_description}
          </ProductDescription>
          <QuantitySelector>
            <span>Quantity:</span>
            <QuantityInput type="number" min="1" defaultValue="1" />
          </QuantitySelector>
          <ActionButtons>
            <ActionButton primary onClick={handleAddToCart}>Add to Cart</ActionButton>
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
        {selectedTab === "description" && <p>{prod_description}</p>}
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
