import React from 'react'
import { AddToCartText, AddToCartWrapper, Card, CardContent, CartButton, CartIcon, Category, ImageWrapper, Price, ProductImage, ProductTitle, RatingWrapper } from './Style'
import { Rate } from 'antd'
import product_test from '../../assets/images/product-test.jpg';
import { useNavigate } from 'react-router';

const CardComponent = ({ product }) => {
    const navigate = useNavigate()
    if (!product) {
        return null; // Không render gì cả
    }
    const handleDetailsProduct = () => {
        navigate(`/details-product/${product.id}`);
    }
    const productImage = product.images && product.images.length > 0
        ? product.images[0].url
        : null;  // Nếu không có ảnh, giá trị sẽ là null
  return (
      <Card onClick={ handleDetailsProduct}>
          <ImageWrapper>
              {/* Kiểm tra nếu có ảnh, nếu có thì hiển thị, nếu không thì hiển thị một ảnh mặc định */}
              {productImage ? (
                  <ProductImage src={`http://localhost:4000/${productImage}`} alt={product.prod_name} />
              ) : (
                  <ProductImage src="path/to/default-image.jpg" alt="Default product image" />
              )}
          </ImageWrapper>
          <CardContent>
              <Category>{product.category_id || 'Uncategorized'}</Category>
              <ProductTitle>{product.prod_name}</ProductTitle>
              <RatingWrapper>
                  <Rate allowHalf defaultValue={product.ratings || 0} style={{ fontSize: '10px' }} />
              </RatingWrapper>
              <Price>${product.price || 'N/A'}</Price>
              <AddToCartWrapper>
                  <CartButton>
                      <CartIcon />
                  </CartButton>
                  <AddToCartText>ADD TO CART</AddToCartText>
              </AddToCartWrapper>
          </CardContent>
      </Card>
  )
}

export default CardComponent