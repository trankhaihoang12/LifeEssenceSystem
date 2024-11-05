import styled from "styled-components";

export const WrraperItem = styled.div`
  height: 40px;
  width: 260px;
  display: flex;
`;

export const IconWrapper = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.span`
  font-size: 20px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextWrapper = styled.div`
  width: 170px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 13px;
  font-weight: bold;
  color: black;
`;

export const Subtitle = styled.span`
  font-size: 13px;
  color: black;
`;

export const Separator = styled.img`
  height: 30px;
  width: 10px;
  margin: auto 0;
`;



export const ProductsContainer = styled.div`
  display: flex;
  overflow-x: hidden;
  overflow-y: hidden;
  scroll-behavior: smooth;
  width: 100%;
  margin-top: 20px;
  justify-content: center;
`;

export const ProductsWrapper = styled.div`
  display: flex;
  gap: 20px;
`;
export const Button = styled.button`
  background-color: #2EA5B6;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')}
  z-index: 1;
`;
