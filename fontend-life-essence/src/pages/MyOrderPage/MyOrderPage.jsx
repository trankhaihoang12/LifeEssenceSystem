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
    ButtonWrapper,
    SectionHeader
} from './Style';
import { FaCheckCircle, FaTruck, FaTimesCircle, FaHourglassHalf, FaCheck, FaRegSadTear } from 'react-icons/fa';
import * as OrderService from '../../services/OrderService'
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/Message'


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


    // Điều hướng tới trang chi tiết đơn hàng
    const handleViewDetails = (orderId) => {
        navigate(`/details-order/${orderId}`);
    };
    const handleWriteFeedback = (orderId) => {
        navigate(`/feedback/${orderId}`);
    };
    const handleCancelOrder = async (orderId) => {
        const token = getToken();
        try {
            const result = await OrderService.cancelOrder(orderId, token); // Gọi API hủy đơn hàng
            if (result.success) {
                message.success('Order has been cancelled successfully!')
                // Cập nhật trạng thái đơn hàng trực tiếp trong danh sách
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order.orderId === orderId ? { ...order, status: 'canceled' } : order
                    )
                );
            } else {
                message.error('An error occurred while canceling the order.')
            }
        } catch (error) {
            message.error('An error occurred while canceling the order!')
        }
    };


    const handleConfirmOrder = async (orderId) => {
        const token = getToken();  // Lấy token từ localStorage
        try {
            const result = await OrderService.confirmOrder(orderId, token);  // Gọi hàm confirmOrder
            if (result.success) {
                message.success('Order confirmed successfully!');
                // Cập nhật lại trạng thái đơn hàng trong giao diện nếu cần
                setOrders(orders.map(order =>
                    order.orderId === orderId ? { ...order, status: 'confirmed' } : order
                ));
            } else {
                message.error('Unable to confirm order.')
            }
        } catch (error) {
            message.error('Unable to confirm order.')
            alert('An error occurred while confirming the order!');
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

    if (loading) return <Loading isPending={loading} />;
    if (error) return <div>{error}</div>;


    return (
        <Loading isPending={loading}>
            <div style={{ backgroundColor: '#F4f4f4', width: '100%', height: '800px',  alignItems: 'center' }}>
                <SectionHeader>Purchase History</SectionHeader>
                <Container>
                    <OrderList>
                        {currentOrders.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                                <FaRegSadTear size={50} color="#888" />
                                <p style={{ color: '#888', fontSize: '18px' }}>You have no orders yet.</p>
                            </div>
                        ) : (
                            currentOrders.map((order) => (
                                <OrderCard key={order.id}>
                                    <OrderDetails>
                                        {getStatusIcon(order.status)}
                                        <OrderInfo>
                                            <OrderCode>Order code: {order.orderId}</OrderCode>
                                            <OrderDate>Date booked: {new Intl.DateTimeFormat('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            }).format(new Date(order.createdAt))}</OrderDate>
                                            <OrderStatus status={order.status}>Status: {order.status}</OrderStatus>
                                            <OrderTotal>Total amount: {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(order.total)}</OrderTotal>
                                        </OrderInfo>
                                    </OrderDetails>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <DetailsButton onClick={() => handleViewDetails(order.orderId)}>
                                            View details
                                        </DetailsButton>
                                        {(order.status === 'pending' || order.status === 'progress') && (
                                            <CancelButton onClick={() => handleCancelOrder(order.orderId)}>
                                                Cancel order
                                            </CancelButton>
                                        )}

                                        {(order.status === 'completed') && (
                                            <ButtonWrapper onClick={() => handleConfirmOrder(order.orderId)}>Order Confirmation</ButtonWrapper>
                                        )}
                                        {(order.status === 'confirmed') && (
                                            <ButtonWrapper onClick={() => handleWriteFeedback(order.orderId)} >Feedback</ButtonWrapper>
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
                            Before
                        </PaginationButton>
                        <span>Page {currentPage} / {totalPages}</span>
                        <PaginationButton
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            After
                        </PaginationButton>
                    </PaginationContainer>
                </Container>
            </div>
        </Loading>
    );
};

export default MyOrderPage;

