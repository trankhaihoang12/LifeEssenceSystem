import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Sidebar = styled.div`
  position: relative;
  width: 240px;
  height: 100vh;
  background-color: #f9f9f9;
  color: #333;
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  border-right: 1px solid #e0e0e0;
  overflow-y: auto;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f5f5f5;
`;

export const ProductsContainer = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 1rem;
  max-width: 1300px;
  margin: 30px auto;
`;

export const CategoryList = styled.div`
  margin-top: 2rem;
`;

export const CategoryItem = styled.div`
  cursor: pointer;
  font-size: 1rem;
  padding: 0.5rem 0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: color 0.3s ease;

  &:hover {
    color: #24aeb1;
  }
`;

export const SubMenu = styled.div`
  margin-left: 1rem;
  overflow: hidden;
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  transition: max-height 0.4s ease, opacity 0.4s ease;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;

export const SubMenuItem = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0;
  color: #666;
  transition: color 0.3s ease, padding-left 0.3s ease;

  &:hover {
    color: #24aeb1;
    padding-left: 10px;
  }
`;

export const ProductCard = styled.div`
  background: white;
  height: 400px;
  width: 300px;
  border-radius: 0.75rem;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
  }
`;

export const FavoriteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    color: ${(props) => (props.isFavorite ? "#ff5a5f" : "#888")};
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export const ProductCategory = styled.span`
  font-size: 0.75rem;
  color: #24aeb1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 0.5rem;
`;

export const ProductName = styled.h3`
  font-size: 1.125rem;
  color: #333;
  margin: 0.5rem 0;
  font-weight: 600;
`;

export const CurrentPrice = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  color: #24aeb1;
`;
