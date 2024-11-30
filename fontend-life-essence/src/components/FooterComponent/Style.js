import styled from 'styled-components';

export const Footer = styled.footer`
    justify-content: center; /* Căn giữa nội dung theo chiều ngang */
    padding: 5px 20px; /* Tăng padding cho footer */
    background-color: #ffffff; 
    color: #ffffff; /* Màu chữ sáng */
    text-align: center;
    position: relative;
    bottom: 0;
    width: 100%; /* Đặt chiều rộng 100% để chiếm toàn bộ không gian */
    margin: 0 auto; /* Căn giữa footer */
    font-family: 'Arial', sans-serif;
    height: 450px;

    @media (max-width: 768px) {
        padding: 20px; /* Giảm padding trên màn hình nhỏ */
    }
`;

export const FooterContent = styled.div`
    width: 95%;
    height: 270px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 40px; 

`;

export const FooterSection = styled.div`
/* Mỗi phần chiếm 1 phần của hàng */
    min-width: 50px; /* Đảm bảo chiều rộng tối thiểu */
    margin: 10px; /* Khoảng cách giữa các phần */
`;

export const FooterTitle = styled.h4`
    margin-bottom: 15px; /* Khoảng cách dưới tiêu đề */
    font-size: 1.2em; /* Kích thước chữ lớn hơn */
    border-bottom: 1px solid #61dafb; /* Đường gạch dưới tiêu đề */
    padding-bottom: 5px; /* Khoảng cách giữa tiêu đề và nội dung */
`;

export const FooterLinks = styled.ul`
    list-style-type: none; /* Bỏ dấu chấm đầu dòng */
    padding: 0; /* Bỏ padding mặc định */
    margin-top: 50px;
`;

export const FooterLink = styled.li`
    margin: 10px 0;
    font-size: 16px;
    font-weight: 400;

    a {
        text-decoration: none;
        color: #7d879c; /* Màu chữ cho liên kết */
        transition: color 0.3s ease; /* Hiệu ứng chuyển màu */
    }

    a:hover {
        color: #21a1f1; /* Màu chữ khi hover */
    }
`;

export const FooterBottom = styled.div`
    border-top: 1px solid #E6E6E6E6; 
    color: black;
    padding-top: 10px; 
     width: 95%;
     margin: 0 auto;
     display: flex;
     justify-content: space-around;
`;
export const WrapperLogoFooter = styled.img`
    width: 190px;
    height: 170px;
   
`
export const WrapperLogoMini = styled.img`
    width: 35px;
    height: 35px;
   
`
export const WrapperHeaderFooter = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px  solid #E6E6E6E6; 
`

export const WrapperInput = styled.input`
  border: none; 
  outline: none; 
  flex: 1; 
  padding: 10px; 
  border-radius: 30px;
  font-size: 11px;
`;
export const WrapperButton = styled.button`
  background-color: #24AEB1; 
  width: 130px; 
  height: 33px; 
  border: none; 
  border-radius: 30px; 
  padding: 10px; 
  cursor: pointer;
`;