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
