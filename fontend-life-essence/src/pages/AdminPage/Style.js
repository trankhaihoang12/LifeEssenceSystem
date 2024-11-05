import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #4DB6AC;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
  position: relative;
  font-size: 18px;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27px;
    color: white;
  }

  h2 {
    margin-top: 10px;
    font-size: 18px;
  }
`;

export const Navigation = styled.nav`
  ul {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 15px 0;
      padding: 10px;
      font-size: 18px; /* Điều chỉnh kích thước chữ */
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 8px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      svg {
        font-size: 22px;
      }
    }
  }
`;

export const MainContent = styled.div`
  flex: 1;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white; /* Thêm màu nền cho header */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ cho header */
`;

// Thêm định nghĩa cho SearchContainer
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 200px; /* Đặt chiều rộng cho ô tìm kiếm */
  }

  button {
    padding: 10px;
    background-color: #4DB6AC;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background-color: #009688; /* Màu sắc khi hover */
    }
  }
`;

