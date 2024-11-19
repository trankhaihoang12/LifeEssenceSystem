import React from 'react';
import { Label, WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemsOrderInfo } from './Style';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { orderContant } from '../../contant';
// import { convertPrice } from '../../untils';



const OrderSuccess = () => {
    const location = useLocation();
    const { state } = location;  // Nhận dữ liệu order từ state được truyền qua navigate
    console.log('location', location)   

    const { order } = state || {};  // Nếu không có order, tránh lỗi
    // Kiểm tra xem đã có order chưa
    if (!order) {
        return <div>Order not found</div>;
    }
    console.log("Order Data:", order);
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
                <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
                    <h3>Order Success</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức Giao hàng</Label>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: 'bold' }}>ôkekekek</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Phương thức thanh toán</Label>
                                    <WrapperValue>
                                    {order.order.paymentMethods}
                                    </WrapperValue>
                                </div>
                            </WrapperInfo>
                            <WrapperItemsOrderInfo>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '20px', color: '#4CAF50', fontWeight: 700 }}>
                                        Đặt thành công !!!
                                    </span>
                                </div>
                                
                            {order.orderDetails.map(item => (

                                <WrapperItemOrder key={item.product_id}>
                                            <div style={{ width: '500px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <img src={item.product_image} style={{
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
                                            <span style={{ fontSize: '14px', color: '#242424' }}>Giá tiền : {item.price}</span>
                                                </span>
                                                <span style={{ marginLeft: 'auto' }}>
                                            <span style={{ fontSize: '14px', color: '#242424' }}>Số lượng : {item.quantity}</span>
                                                </span>
                                            </div>
                                        </WrapperItemOrder>
                            ))}


                            </WrapperItemsOrderInfo>
                            <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '16px', color: 'red', fontWeight: 'bold' }}>Tổng tiền : {order.order.total}</span>
                            </div>
                        </WrapperContainer>
                    </div>

                </div>

        </div>
    );
}

export default OrderSuccess;