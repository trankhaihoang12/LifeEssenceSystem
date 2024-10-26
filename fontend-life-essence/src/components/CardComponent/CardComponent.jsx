import React from 'react'
import { AddToCartText, AddToCartWrapper, Card, CardContent, CartButton, CartIcon, Category, ImageWrapper, Price, ProductImage, ProductTitle, RatingWrapper } from './Style'
import { Rate } from 'antd'
import product_test from '../../assets/images/product-test.jpg';

const CardComponent = () => {
  return (
      <Card>
          <ImageWrapper>
              <ProductImage src={product_test} alt="product_test" />
          </ImageWrapper>
          <CardContent>
              <Category>Covid Essentials, Devices, Health Conditions</Category>
              <ProductTitle>Waterpik WP-100 - Dental Care</ProductTitle>
              <RatingWrapper>
                  <Rate allowHalf defaultValue={2.5} style={{ fontSize: '10px' }} />
              </RatingWrapper>
              <Price>$ 165.54</Price>
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