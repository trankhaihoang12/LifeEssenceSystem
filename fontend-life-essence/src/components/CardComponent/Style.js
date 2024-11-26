import {BsCart4 } from "react-icons/bs";
import styled from "styled-components";

export const Card = styled.div`
  width: 231px;
  height: 342px;
  background-color: #fcfcfc;
  border-radius: 8px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

 export const ImageWrapper = styled.div`
  width: 231px;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const ProductImage = styled.img`
  width: 164px;
  height: 199px;
  object-fit: cover;
  margin: auto;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 140px;
  padding: 10px;
`;

export const Category = styled.span`
  color: #7D879C;
  font-size: 8px;
`;

export const ProductTitle = styled.span`
  color: #000;
  font-size: 12px;
  font-weight: bold;
  margin-top: 6px;
`;

export const RatingWrapper = styled.span`
  margin-top: 8px;
`;

export const Price = styled.span`
  color: #7D879C;
  font-size: 10px;
  margin-top: 8px;
`;

export const AddToCartWrapper = styled.div`
  display: flex;
  gap: 20px;
  height: 40px;
  margin-top: 10px;
  align-items: center;
`;

export const CartButton = styled.div`
width: 40px;
  height: 40px;
  background-color: #2EA5B6;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CartIcon = styled(BsCart4)`
  font-size: 20px;
  color: #fff;
`;

export const AddToCartText = styled.span`
   font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;