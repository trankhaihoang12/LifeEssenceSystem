import styled from 'styled-components';
 
 export const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const SlideImage = styled.img`
  object-fit: cover;
  width: 100%;
  max-height: 500px;
`;

 export const NavigationButton = styled.div`
  position: absolute;
  top: 50%;
  cursor: pointer;
  transform: translateY(-50%);
  ${({ direction }) => direction === 'left' ? 'left: 50px;' : 'right: 50px;'}
`;

export const DotWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

export const Dot = styled.span`
  font-size: 20px;
  cursor: pointer;
  margin: 0 5px;
  color: ${({ isActive }) => (isActive ? 'black' : 'lightgray')};
`;