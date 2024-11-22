import React, { useEffect, useState } from 'react';
import { 
    Container, Header, PaymentMethod, DeliveryAddress, CombinedItemsSummary, 
    ItemsTable, OrderSummary, OrderCode, Button, UpdateLink, ProductImage, TotalSection, TotalText, TotalAmount, PriceColumn 
} from './Style';
import * as OrderService from '../../services/OrderService'
import { useParams } from 'react-router';

const DetailsOrderPage = () => {
    const { orderId } = useParams(); // Lấy orderId từ URL params
    console.log("orderId from URL:", orderId); 
    const [order, setOrder] = useState(null); // Dữ liệu đơn hàng
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Lỗi khi gọi API

    // Hàm sao chép mã đơn hàng
    const copyToClipboard = () => {
        navigator.clipboard.writeText(order.id)
            .then(() => alert('Order Code copied!'))
            .catch((err) => alert('Failed to copy: ', err));
    };

    // Lấy token từ localStorage
    const getToken = () => {
        const storedUserData = localStorage.getItem('userData');
        const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
        return parsedUserData ? parsedUserData.token : null;
    };

    const token = getToken(); // Lấy token ngay trong useEffect

    // Lấy chi tiết đơn hàng khi component được mount
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!token) {
                setError('User not authenticated. Please log in.');
                setLoading(false);
                return;
            }

            try {
                // Gọi API để lấy chi tiết đơn hàng theo orderId
                const data = await OrderService.getOrderDetails(orderId, token);
                console.log('dât',data)
                setOrder(data.data); // Cập nhật dữ liệu vào state
                setLoading(false); // Đổi trạng thái loading
            } catch (err) {
                setError(err.message || 'Failed to fetch order details');
                setLoading(false);
            }
        };

        if (orderId && token) {
            fetchOrderDetails(); // Gọi hàm khi component mount và orderId thay đổi
        } else {
            setError('Invalid order ID or missing token.');
            setLoading(false);
        }
    }, [orderId, token]); // Chạy lại khi `orderId` hoặc `token` thay đổi

    // Nếu đang load hoặc có lỗi, hiển thị thông báo
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Check if order exists
    if (!order) {
        return <div>No order data available</div>;
    }

    const getProductImage = (product) => {
        if (product.images && product.images.length > 0) {
            // Replace backslashes with forward slashes for correct URL formatting
            const imageUrl = product.images[0].url.replace(/\\+/g, '/');
            console.log('Product Image URL:', imageUrl); // Debug to check the image URL
            return `http://localhost:4000/${imageUrl}`;
        }
        return 'https://via.placeholder.com/150'; // Fallback image if no image exists
    };

    const { customerName, phone, address, products, subtotal, deliveryFee, discount, coupon, total, paymentMethod, orderTime, id } = order;

    
    return (
        <Container>
            <Header>Order Information</Header>
            <PaymentMethod>
                <Button>
                    <i className="fas fa-money-check-alt"></i> Pay by Cash on Delivery
                </Button>
            </PaymentMethod>

            <DeliveryAddress>
                <div><i className="fas fa-map-marker-alt"></i> Delivery address</div>
                <div>{customerName} ({phone})</div>
                <div>
                    {address || 'No address provided'}
                    <UpdateLink>Update</UpdateLink>
                </div>
            </DeliveryAddress>

            <CombinedItemsSummary>
                <ItemsTable>
                    <table>
                        <thead>
                            <tr>
                                <th>Items</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Kiểm tra nếu order.products là một mảng hợp lệ trước khi dùng map */}
                            {Array.isArray(products) && products.length > 0 ? (
                                products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <ProductImage src={getProductImage(product)} alt={product.prod_name} />
                                            {product.prod_name}
                                        </td>
                                        <td>x{product.quantity}</td>
                                        <PriceColumn>${product.price}</PriceColumn>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No products available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </ItemsTable>

                <OrderSummary>
                    <table>
                        <tbody>
                            <tr><th>Subtotal</th><PriceColumn>${subtotal}</PriceColumn></tr>
                            <tr><th>Delivery</th><PriceColumn>${deliveryFee}</PriceColumn></tr>
                            <tr><th>Discount</th><PriceColumn>${discount}</PriceColumn></tr>
                            <tr><th>Coupon</th><PriceColumn>${coupon}</PriceColumn></tr>
                        </tbody>
                    </table>
                </OrderSummary>

                <hr />

                <TotalSection>
                    <TotalText>Total</TotalText>
                    <TotalAmount>${total}</TotalAmount>
                </TotalSection>
            </CombinedItemsSummary>

            <OrderCode>
                <table>
                    <tbody>
                        <tr>
                            <th><h1>Order Code</h1></th>
                            <td>{id} <Button onClick={copyToClipboard}>COPY</Button></td>
                        </tr>
                        <tr><th><h2>Payment Method</h2></th><td>{paymentMethod || 'Not specified'}</td></tr>
                        <tr><th><h2>Order Time</h2></th><td>{orderTime || 'Not available'}</td></tr>
                    </tbody>
                </table>
            </OrderCode>
        </Container>
    );
};
export default DetailsOrderPage;