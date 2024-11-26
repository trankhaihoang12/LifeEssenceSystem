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
    PaginationButton,
    CancelButton,
    ButtonWrapper
} from './Style';
import { FaCheckCircle, FaTruck, FaTimesCircle, FaHourglassHalf, FaCheck } from 'react-icons/fa';
import * as OrderService from '../../services/OrderService'

const MyOrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);  // Trạng thái loading
    const [error, setError] = useState(null);  // Trạng thái lỗi
    const ordersPerPage = 4;
    const navigate = useNavigate();


    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };
    useEffect(() => {
        const fetchOrders = async () => {
            const token = getToken();  // Lấy token trong useEffect
            try {
                const result = await OrderService.getAllOrders(token);  // Gọi API để lấy đơn hàng
                setOrders(result);  // Cập nhật danh sách đơn hàng
            } catch (err) {
                setError('Có lỗi xảy ra khi lấy danh sách đơn hàng');  // Xử lý lỗi
            } finally {
                setLoading(false);  // Đổi trạng thái loading khi hoàn tất
            }
        };

        fetchOrders();
    }, []);  // Chỉ gọi 1 lần khi component mount
    console.log('orders', orders)

    // Điều hướng tới trang chi tiết đơn hàng
    const handleViewDetails = (orderId) => {
        navigate(`/details-order/${orderId}`);
        console.log('orderId', orderId)
    };
    const handleCancelOrder = async (orderId) => {
        const token = getToken();
        try {
            const result = await OrderService.cancelOrder(orderId, token); // Gọi API huỷ đơn hàng
            if (result.success) {
                // Cập nhật trạng thái đơn hàng sau khi huỷ thành công
                setOrders(orders.map(order =>
                    order.id === orderId ? { ...order, status: 'Đã hủy' } : order
                ));
                alert('Đơn hàng đã được huỷ thành công!');
            } else {
                alert('Có lỗi xảy ra khi huỷ đơn hàng');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi huỷ đơn hàng!');
        }
    };

    const handleConfirmOrder = async (orderId) => {
        const token = getToken();  // Lấy token từ localStorage
        try {
            const result = await OrderService.confirmOrder(orderId, token);  // Gọi hàm confirmOrder
            if (result.success) {
                alert('Đơn hàng đã được xác nhận thành công!');
                // Cập nhật lại trạng thái đơn hàng trong giao diện nếu cần
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status: 'confirmed' } : order
                ));
            } else {
                alert(result.message || 'Không thể xác nhận đơn hàng.');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi xác nhận đơn hàng!');
        }
    };

    


    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <FaCheckCircle color="green" />;
            case 'shipping': return <FaTruck color="#007bff" />;
            case 'progress': return <FaHourglassHalf color="#ff9800" />;
            case 'canceled': return <FaTimesCircle color="red" />;
            case 'confirmed': return <FaCheck color="#4CAF50" />;
            case 'resolved': return <FaCheckCircle color="blue" />;
            case 'pending': return <FaHourglassHalf color="#555" />;
            default: return <FaHourglassHalf color="#555" />;
        }
    };

    // Phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const totalPages = Math.ceil(orders.length / ordersPerPage);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>{error}</div>;


    return (
        <div style={{ backgroundColor: '#f0f9f9', width: '100%', height: '100vh', display: 'flex', alignItems: 'center'}}>
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
                                        <OrderCode>Mã đơn hàng: {order.orderId}</OrderCode>
                                        <OrderDate>Ngày đặt: {order.createdAt}</OrderDate> {/* Sử dụng createdAt */}
                                        <OrderStatus status={order.status}>Trạng thái: {order.status}</OrderStatus>
                                        <OrderTotal>Tổng tiền: {order.total.toLocaleString()} VND</OrderTotal>
                                    </OrderInfo>
                                </OrderDetails>
                                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                                    <DetailsButton onClick={() => handleViewDetails(order.orderId)}>
                                        Xem chi tiết
                                    </DetailsButton>
                                    {(order.status === 'pending' || order.status === 'progress') && (
                                        <CancelButton onClick={() => handleCancelOrder(order.orderId)}>
                                            Hủy đơn hàng
                                        </CancelButton>
                                    )}

                                    {(order.status === 'completed') && (
                                        <ButtonWrapper onClick={() => handleConfirmOrder(order.orderId)}>Xác nhận đơn hàng</ButtonWrapper>
                                    )}
                                    {(order.status === 'confirmed') && (
                                        <ButtonWrapper>Đánh giá</ButtonWrapper>
                                    )}
                                </div>
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
        </div>
    );
};

export default MyOrderPage;

