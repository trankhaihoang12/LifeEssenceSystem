import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Header, 
    OrderList, 
    OrderCard, 
    OrderDetails, 
    OrderInfo, 
    OrderCode, 
    OrderDate, 
    OrderStatus, 
    OrderTotal, 
    DetailsButton, 
    PaginationContainer, 
    PaginationButton 
} from './Style';
import { FaCheckCircle, FaTruck, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

const MyOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 3;
    const navigate = useNavigate();

    // Mock data (giả lập dữ liệu)
    const mockOrders = [
        { id: '123456', date: '2024-11-01', status: 'Đã giao', total: 500000 },
        { id: '654321', date: '2024-10-20', status: 'Đang xử lý', total: 1500000 },
        { id: '789012', date: '2024-09-15', status: 'Đã hủy', total: 300000 },
        { id: '987654', date: '2024-09-30', status: 'Đang xử lý', total: 750000 },
        { id: '456789', date: '2024-08-22', status: 'Đã giao', total: 900000 },
    ];

    useEffect(() => {
        // Lấy dữ liệu từ API (tạm thời sử dụng mock data)
        setOrders(mockOrders);
    }, []);

    // Điều hướng tới trang chi tiết đơn hàng
    const handleViewDetails = (orderId) => {
        navigate(`/details-order/${orderId}`);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Đã giao': return <FaCheckCircle color="green" />;
            case 'Đang xử lý': return <FaHourglassHalf color="#ff9800" />;
            case 'Đang vận chuyển': return <FaTruck color="#007bff" />;
            case 'Đã hủy': return <FaTimesCircle color="red" />;
            default: return <FaHourglassHalf color="#555" />;
        }
    };

    // Phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    return (
        <Container>
            <Header>Lịch Sử Mua Hàng</Header>
            <OrderList>
                {currentOrders.length === 0 ? (
                    <p>Bạn chưa có đơn hàng nào.</p>
                ) : (
                    currentOrders.map((order) => (
                        <OrderCard key={order.id}>
                            <OrderDetails>
                                {getStatusIcon(order.status)}
                                <OrderInfo>
                                    <OrderCode>Mã đơn hàng: {order.id}</OrderCode>
                                    <OrderDate>Ngày đặt: {order.date}</OrderDate>
                                    <OrderStatus status={order.status}>Trạng thái: {order.status}</OrderStatus>
                                    <OrderTotal>Tổng tiền: {order.total.toLocaleString()} VND</OrderTotal>
                                </OrderInfo>
                            </OrderDetails>
                            <DetailsButton onClick={() => handleViewDetails(order.id)}>
                                Xem chi tiết
                            </DetailsButton>
                        </OrderCard>
                    ))
                )}
            </OrderList>

            {/* Phân trang */}
            <PaginationContainer>
                <PaginationButton 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                    Trước
                </PaginationButton>
                <span>Trang {currentPage} / {totalPages}</span>
                <PaginationButton 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Sau
                </PaginationButton>
            </PaginationContainer>
        </Container>
    );
};

export default MyOrderPage;

