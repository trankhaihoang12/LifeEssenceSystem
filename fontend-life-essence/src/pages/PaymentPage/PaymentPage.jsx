import React, { useState } from 'react';
import { FaTruck, FaPaypal, FaMinus, FaPlus } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import productImage1 from '../../assets/images/Home_category1.png';
import productImage2 from '../../assets/images/Home_category2.png';
import productImage3 from '../../assets/images/Home_category3.png';

  // Style cho nút tăng giảm số lượng
  const quantityButtonStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
  };

  const quantityContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginRight: '15px',
  };

  const quantityTextStyle = {
    fontSize: '16px',
    minWidth: '20px',
    textAlign: 'center',
  };

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [products, setProducts] = useState([
    { id: 1, name: "Garlic Oil 1000 MG+", price: 45.00, quantity: 1, image: productImage1 },
    { id: 2, name: "Vitamin D 1000U", price: 25.00, quantity: 1, image: productImage2 },
    { id: 3, name: "Kids Supplements For Focus", price: 20.00, quantity: 1, image: productImage3 }
  ]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handleQuantityChange = (productId, change) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        const newQuantity = Math.max(1, product.quantity + change);
        return { ...product, quantity: newQuantity };
      }
      return product;
    }));
  };

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
  };

  const shipping = 5.00;
  const discount = 10.00;
  const total = calculateSubtotal() + shipping - discount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#24AEB1' }}>THÔNG TIN ĐẶT HÀNG</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Shipping Information - unchanged */}
        <div style={{ width: '45%', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#24AEB1' }}>THÔNG TIN VẬN CHUYỂN</span>
          <input type="text" placeholder="Nhập vào Họ Tên" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Nhập vào Số Điện Thoại" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="email" placeholder="Nhập vào Email" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="text" placeholder="Nhập vào địa chỉ" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <select style={{ width: '32%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option>Chọn Thành Phố</option>
            </select>
            <select style={{ width: '32%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option>Chọn Quận/Huyện</option>
            </select>
            <select style={{ width: '32%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option>Chọn Phường/Xã</option>
            </select>
          </div>
          <textarea placeholder="Ghi chú thêm" style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>

        {/* Order Details */}
        <div style={{ width: '45%', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2EA5B6' }}>CHI TIẾT ĐƠN HÀNG</span>
          {products.map((product, index) => (
            <div key={product.id} style={{ borderBottom: index !== products.length - 1 ? '1px solid #ccc' : 'none', padding: '10px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: '60px', height: '60px', borderRadius: '5px' }} />
                <span>{product.name}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={quantityContainerStyle}>
                    <button 
                      onClick={() => handleQuantityChange(product.id, -1)}
                      style={quantityButtonStyle}
                    >
                      <FaMinus size={12} color="#666" />
                    </button>
                    <span style={quantityTextStyle}>{product.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(product.id, 1)}
                      style={quantityButtonStyle}
                    >
                      <FaPlus size={12} color="#666" />
                    </button>
                  </div>
                  <span>${(product.price * product.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #ccc', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SubTotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method - unchanged */}
      <div style={{ width: '45%', padding: '20px', backgroundColor: '#fff', borderRadius: '10px', marginTop: '30px', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#24AEB1' }}>PHƯƠNG THỨC THANH TOÁN</span>
        <div onClick={() => handlePaymentChange("COD")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <input type="radio" checked={paymentMethod === "COD"} onChange={() => handlePaymentChange("COD")} />
          <FaTruck style={{ marginLeft: '10px', fontSize: '20px', color: '#24AEB1' }} />
          <span style={{ marginLeft: '10px' }}>Thanh toán khi nhận hàng (COD)</span>
        </div>
        <div onClick={() => handlePaymentChange("VNPay")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <input type="radio" checked={paymentMethod === "VNPay"} onChange={() => handlePaymentChange("VNPay")} />
          <RiBankCardLine style={{ marginLeft: '10px', fontSize: '20px', color: '#FFB61B' }} />
          <span style={{ marginLeft: '10px' }}>Thanh toán ví điện tử VNPAY</span>
        </div>
        <div onClick={() => handlePaymentChange("Paypal")} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', margin: '10px 0' }}>
          <input type="radio" checked={paymentMethod === "Paypal"} onChange={() => handlePaymentChange("Paypal")} />
          <FaPaypal style={{ marginLeft: '10px', fontSize: '20px', color: '#0070ba' }} />
          <span style={{ marginLeft: '10px' }}>Thanh toán qua Paypal</span>
        </div>
      </div>

      {/* Place Order Button - unchanged */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button style={{ padding: '15px 30px', fontSize: '18px', fontWeight: 'bold', backgroundColor: '#24AEB1', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          THANH TOÁN ĐƠN HÀNG
        </button>
      </div>
    </div>
  );
};

export default Payment;