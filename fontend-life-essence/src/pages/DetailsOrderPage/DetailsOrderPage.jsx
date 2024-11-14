import React from 'react';
import { 
    Container, Header, PaymentMethod, DeliveryAddress, CombinedItemsSummary, 
    ItemsTable, OrderSummary, OrderCode, Button, UpdateLink, ProductImage, TotalSection, TotalText, TotalAmount, PriceColumn 
} from './Style';

const DetailsOrderPage = () => {
    // Giả lập dữ liệu đơn hàng
    const order = {
        id: '2411110ABCDEFG',
        customerName: 'Hoàng Trần',
        phone: '+84 708 146 105',
        address: '7B/10 Lê Thanh Nghị, Phường Hòa Cường Bắc, Quận Hải Châu, Đà Nẵng',
        paymentMethod: 'Cash on Delivery',
        orderTime: '11-11-2024 15:08',
        products: [
            {
                id: '1',
                name: 'Garlic Oil 1000 MG+',
                quantity: 1,
                price: 45.00,
                image: 'https://storage.googleapis.com/a1aa/image/GA7JzaE18l7nC1IMzadB3wwqm6he1GdVe8bJpXU4FjE514vTA.jpg',
            },
            {
                id: '2',
                name: 'Vitamin D 1000U',
                quantity: 1,
                price: 25.00,
                image: 'https://storage.googleapis.com/a1aa/image/FSLb3VSe6MXNICdMThYAIR4pDu6UGauflsnASXrd2Zj414vTA.jpg',
            },
            {
                id: '3',
                name: 'Glucosamine',
                quantity: 1,
                price: 20.00,
                image: 'https://storage.googleapis.com/a1aa/image/qcwZdzzBSka4MFPc9M3X87VWLyrxBMUkTnxhuuhYlBlea83JA.jpg',
            },
        ],
        subtotal: 90.00,
        deliveryFee: 20.00,
        discount: 0.00,
        coupon: 0.00,
        total: 110.00,
    };

    // Hàm sao chép mã đơn hàng
    const copyToClipboard = () => {
        navigator.clipboard.writeText(order.id)
            .then(() => alert('Order Code copied!'))
            .catch((err) => alert('Failed to copy: ', err));
    };

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
                <div>{order.customerName} ({order.phone})</div>
                <div>
                    {order.address}
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
                            {order.products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <ProductImage src={product.image} alt={product.name} />
                                        {product.name}
                                    </td>
                                    <td>x{product.quantity}</td>
                                    <PriceColumn>${product.price.toFixed(2)}</PriceColumn> {/* Giá tiền căn phải */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ItemsTable>

                <OrderSummary>
                    <table>
                        <tbody>
                            <tr><th>Subtotal</th><PriceColumn>${order.subtotal.toFixed(2)}</PriceColumn></tr>
                            <tr><th>Delivery</th><PriceColumn>${order.deliveryFee.toFixed(2)}</PriceColumn></tr>
                            <tr><th>Discount</th><PriceColumn>${order.discount.toFixed(2)}</PriceColumn></tr>
                            <tr><th>Coupon</th><PriceColumn>${order.coupon.toFixed(2)}</PriceColumn></tr>
                        </tbody>
                    </table>
                </OrderSummary>

                <hr />

                <TotalSection>
                    <TotalText>Total</TotalText>
                    <TotalAmount>${order.total.toFixed(2)}</TotalAmount>
                </TotalSection>
            </CombinedItemsSummary>

            <OrderCode>
                <table>
                    <tbody>
                        {/* Tăng cỡ chữ cho Order Code bằng cách sử dụng h2 */}
                        <tr><th><h1>Order Code</h1></th><td>{order.id} <Button onClick={copyToClipboard}>COPY</Button></td></tr>
                        {/* Sử dụng h2 cho Payment Method và Order Time */}
                        <tr><th><h2>Payment Method</h2></th><td>{order.paymentMethod}</td></tr>
                        <tr><th><h2>Order Time</h2></th><td>{order.orderTime}</td></tr>
                    </tbody>
                </table>
            </OrderCode>
        </Container>
    );
};

export default DetailsOrderPage;

