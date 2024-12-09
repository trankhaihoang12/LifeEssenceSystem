import styled from "styled-components";

export const Wrapper = styled.div`
  height: 449px;
  background-color: #E8F3FF;
`;

// Header for the "Popular Categories"
export const Header = styled.div`
  padding: 10px;
  width: 700px;
  display: flex;
  justify-content: center;
`;

export const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
`;

// Container for the category cards
export const CategoryContainer = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: ${(props) => props.gap || '46px'};
`;

// Individual category card
export const CategoryCard = styled.div`
  height: 150px;
  width: ${(props) => props.width || '300px'};
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// Category content (title and product count)
export const CategoryContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 10px;
`;

export const CategoryTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const ProductCount = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #ABB8C3;
`;

export const CategoryImage = styled.img`
  margin: auto 10px;
  width: 100px;
  height: 100px;
`;