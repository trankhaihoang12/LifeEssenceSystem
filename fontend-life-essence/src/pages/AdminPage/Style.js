import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Arial', sans-serif; /* Chọn font chữ dễ đọc */
`;

export const Sidebar = styled.div`
width: 250px;
background-color: #4DB6AC; /* Màu nền Sidebar giống với hình ảnh của bạn */
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
color: white;
position: relative;

/* Thêm style cho font size */
font-size: 18px; /* Thay đổi kích thước chữ ở đây */
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
    background-color: #ccc; /* Màu nền cho avatar */
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 27px; /* Kích thước chữ nếu bạn muốn thêm chữ vào avatar */
    color: white; /* Màu chữ */
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
      font-size: 25px; /* Thay đổi kích thước chữ ở đây */
      cursor: pointer;
      transition: background-color 0.3s;
      border-radius: 8px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      svg {
        font-size: 22px; /* Tăng kích thước biểu tượng nếu cần */
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
  position: relative;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  margin: 0 20px;

  input {
    width: 800px; /* Tăng chiều rộng để dài hơn một chút */
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 25px;
    font-size: 16px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 0 10px; /* Thêm margin để cách đều 2 bên */
  }

  button {
    padding: 10px 15px;
    border: none;
    border-radius: 25px;
    background-color: #4DB6AC;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #3b9b98;
    }
  }
`;
export const StatsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const StatsBox = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 20px; /* Kích thước chữ tiêu đề lớn hơn */
    margin-bottom: 10px; /* Khoảng cách dưới tiêu đề */
  }

  p {
    font-size: 24px; /* Kích thước chữ nội dung lớn hơn */
    font-weight: bold; /* Để chữ đậm hơn */
  }
`;

export const ChartSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ChartBox = styled.div`
  background-color: white;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const TableSection = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;
    font-size: 24px; /* Tăng kích thước chữ tiêu đề */
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #ccc;
      padding: 12px; /* Tăng padding để tạo không gian */
      text-align: left;
      font-size: 18px; /* Tăng kích thước chữ cho th và td */
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold; /* Làm cho chữ đậm hơn */
    }

    tr:hover {
      background-color: #f0f0f0;
    }
  }
`;
