import React, { useState } from 'react';
import { Label, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemsOrderInfo, SectionHeader } from './Style';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/LoadingComponent/Loading';
// import { orderContant } from '../../contant';
// import { convertPrice } from '../../untils';



const OrderSuccess = () => {
    const location = useLocation();
    const { state } = location;  // Nhận dữ liệu order từ state được truyền qua navigate
    const [loading, setLoading] = useState(false);

    const { order } = state || {};  // Nếu không có order, tránh lỗi
    // Kiểm tra xem đã có order chưa
    if (!order) {
        return <div>Order not found</div>;
    }
    console.log("Order Data:", order);

    const getProductImage = (item) => {
        if (item && item.images && item.images.length > 0) {
            // Lấy hình ảnh đầu tiên từ mảng và sửa đường dẫn
            const imageUrl = item.images[0].replace(/\\+/g, '/');
            return `http://localhost:4000/${imageUrl}`;
        }
        // Hình ảnh mặc định nếu không có ảnh
        return 'https://via.placeholder.com/150';
    };


    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
            <Loading isPending={loading}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <SectionHeader>Order Success</SectionHeader>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Label>Delivery method</Label>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST </span> Economy delivery
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Payment method</Label>
                                    <WrapperValue>
                                        {order.order.paymentMethods}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemsOrderInfo>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '20px', color: '#4CAF50', fontWeight: 700 }}>
                                        Order successful !!!
                                    </span>
                                </div>

                                {order.orderDetails.map(item => (

                                    <WrapperItemOrder key={item.product_id}>
                                        <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <img src={getProductImage(item)} alt={item.prod_name} style={{
                                                width: '77px',
                                                height: '79px',
                                                objectFit: 'cover',
                                                borderRadius: '6px',
                                                border: '1px solid #e0e0e0',
                                                padding: '2px',
                                            }} />
                                            <div style={{
                                                width: '260px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>{item.prod_name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span>
                                                <span style={{ fontSize: '14px', color: '#242424' }}>Price : ${item.price}</span>
                                            </span>
                                            <span style={{ marginLeft: 'auto' }}>
                                                <span style={{ fontSize: '14px', color: '#242424' }}>Quantity : {item.quantity}</span>
                                            </span>
                                        </div>
                                    </WrapperItemOrder>
                                ))}


                            </WrapperItemsOrderInfo>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>Total : $ {order.order.total}</span>
                            </div>
                        </WrapperContainer>
                    </div>

                </div>
            </Loading>
        </div>
    );
}

export default OrderSuccess;