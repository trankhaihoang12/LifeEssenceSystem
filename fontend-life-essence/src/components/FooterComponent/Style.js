import styled from 'styled-components';

export const Footer = styled.footer`
    /* display: flex; Sử dụng flexbox */
    justify-content: center; /* Căn giữa nội dung theo chiều ngang */
    //align-items: center; /* Căn giữa nội dung theo chiều dọc */
    padding: 5px 20px; /* Tăng padding cho footer */
    background-color: #ffffff; 
    color: #ffffff; /* Màu chữ sáng */
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Đường bóng cho footer */
    position: relative;
    bottom: 0;
    width: 100%; /* Đặt chiều rộng 100% để chiếm toàn bộ không gian */
    max-width: 1270px; /* Giới hạn chiều rộng tối đa */
    margin: 0 auto; /* Căn giữa footer */
    font-family: 'Arial', sans-serif;
    border-radius: 15px;

    @media (max-width: 768px) {
        padding: 20px; /* Giảm padding trên màn hình nhỏ */
    }
`;

export const FooterContent = styled.div`
    width: 95%;
    border-top: 1.5px  solid #00ccff; 
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 20px; /* Tăng khoảng cách giữa nội dung và bản quyền */
     margin: 0 auto;
`;

export const FooterSection = styled.div`
/* Mỗi phần chiếm 1 phần của hàng */
    min-width: 50px; /* Đảm bảo chiều rộng tối thiểu */
    margin: 10px; /* Khoảng cách giữa các phần */
`;

export const FooterTitle = styled.h4`
    margin-bottom: 15px; /* Khoảng cách dưới tiêu đề */
    font-size: 1.2em; /* Kích thước chữ lớn hơn */
    border-bottom: 2px solid #61dafb; /* Đường gạch dưới tiêu đề */
    padding-bottom: 5px; /* Khoảng cách giữa tiêu đề và nội dung */
`;

export const FooterLinks = styled.ul`
    list-style-type: none; /* Bỏ dấu chấm đầu dòng */
    padding: 0; /* Bỏ padding mặc định */
`;

export const FooterLink = styled.li`
    margin: 10px 0;

    a {
        text-decoration: none;
        color: #61dafb; /* Màu chữ cho liên kết */
        transition: color 0.3s ease; /* Hiệu ứng chuyển màu */
    }

    a:hover {
        color: #21a1f1; /* Màu chữ khi hover */
    }
`;

export const FooterBottom = styled.div`
    border-top: 1px solid #00ccff; 
    color: black;
    padding-top: 10px; 
     width: 95%;
     margin: 0 auto;
`;
export const WrapperLogoFooter = styled.img`
    width: 160px;
    height: 120px;
   
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
`