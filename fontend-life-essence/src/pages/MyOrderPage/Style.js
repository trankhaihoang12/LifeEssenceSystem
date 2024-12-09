import styled from 'styled-components';

export const Container = styled.div`
    width: 75%; /* Giảm chiều rộng của container xuống 75% */
    max-width: 900px; /* Giới hạn chiều rộng tối đa */
    margin: 0 auto;
    border-radius: 10px; /* Giảm độ bo tròn */
`;

export const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px; /* Giảm khoảng cách phía dưới tiêu đề */
    color: #333;
    font-size: 2.5rem; /* Giảm cỡ chữ tiêu đề */
    font-weight: 600;
    letter-spacing: 1px;
`;

export const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px; /* Giảm khoảng cách giữa các item trong danh sách */
`;

export const OrderCard = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px; /* Giảm padding trong card */
    background-color: #fff;
    border-radius: 10px; /* Giảm độ bo tròn */
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.1);
    align-items: center;
    font-size: 1.2rem; /* Giảm cỡ chữ */
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    }
`;

export const OrderDetails = styled.div`
    display: flex;
    gap: 15px; /* Giảm khoảng cách giữa các phần tử trong chi tiết đơn hàng */
    align-items: center;
`;

export const OrderInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px; /* Giảm khoảng cách giữa các dòng thông tin */
`;

export const OrderCode = styled.p`
    font-weight: 600;
    color: #007bff;
    margin: 0;
    font-size: 1.4rem; /* Giảm cỡ chữ mã đơn hàng */
    letter-spacing: 0.5px;
`;

export const OrderDate = styled.p`
    color: #555;
    font-size: 1.2rem; /* Giảm cỡ chữ ngày đơn hàng */
    letter-spacing: 0.5px;
`;

export const OrderStatus = styled.p`
    color: ${props => {
        switch (props.status) {
            case 'Đã giao': return 'green';
            case 'Đang xử lý': return '#ff9800';
            case 'Đã hủy': return 'red';
            default: return '#555';
        }
    }};
    font-size: 1.3rem; /* Giảm cỡ chữ trạng thái đơn hàng */
    font-weight: 600;
`;

export const OrderTotal = styled.p`
    font-weight: 600;
    color: #333;
    font-size: 1.4rem; /* Giảm cỡ chữ tổng tiền */
    letter-spacing: 0.5px;
`;

export const DetailsButton = styled.button`
    background-color: #24AEB1; /* Màu nền đỏ */
    color: white; /* Màu chữ trắng */
    border: none; /* Không có viền */
    border-radius: 5px; /* Bo góc */
    padding: 10px 15px; /* Khoảng cách bên trong */
    cursor: pointer; /* Con trỏ chuột dạng tay */
    transition: background-color 0.3s; /* Hiệu ứng chuyển màu */

    &:hover {
        background-color: #007bff; /* Màu nền khi hover */
    }

    &:disabled {
        background-color: #ccc; /* Màu nền khi bị vô hiệu hóa */
        cursor: not-allowed; /* Con trỏ chuột dạng không cho phép */
    }
`;
export const ButtonWrapper = styled.button`
    background-color: #ccc; /* Màu nền đỏ */
    color: white; /* Màu chữ trắng */
    border: none; /* Không có viền */
    border-radius: 5px; /* Bo góc */
    padding: 10px 15px; /* Khoảng cách bên trong */
    cursor: pointer; /* Con trỏ chuột dạng tay */
    transition: background-color 0.3s; /* Hiệu ứng chuyển màu */

    &:hover {
        background-color: #007bff; /* Màu nền khi hover */
    }

    &:disabled {
        background-color: #ccc; /* Màu nền khi bị vô hiệu hóa */
        cursor: not-allowed; /* Con trỏ chuột dạng không cho phép */
    }
`;
export const CancelButton = styled.button`
    background-color: #ff4d4d; /* Màu nền đỏ */
    color: white; /* Màu chữ trắng */
    border: none; /* Không có viền */
    border-radius: 5px; /* Bo góc */
    padding: 10px 15px; /* Khoảng cách bên trong */
    cursor: pointer; /* Con trỏ chuột dạng tay */
    transition: background-color 0.3s; /* Hiệu ứng chuyển màu */

    &:hover {
        background-color: #ff1a1a; /* Màu nền khi hover */
    }

    &:disabled {
        background-color: #ccc; /* Màu nền khi bị vô hiệu hóa */
        cursor: not-allowed; /* Con trỏ chuột dạng không cho phép */
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px; /* Giảm khoảng cách giữa các nút phân trang */
    margin-top: 20px; /* Giảm khoảng cách với phần dưới */
`;

export const PaginationButton = styled.button`
    padding: 8px 18px; /* Giảm kích thước nút phân trang */
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.2rem; /* Giảm cỡ chữ nút phân trang */
    font-weight: 600;

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
        transform: translateY(0);
    }
`;
