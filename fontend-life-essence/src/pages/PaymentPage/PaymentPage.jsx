import React, { useState } from 'react';
import { FaTruck, FaPaypal, FaMinus, FaPlus } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import productImage1 from '../../assets/images/Home_category1.png';
import productImage2 from '../../assets/images/Home_category2.png';
import productImage3 from '../../assets/images/Home_category3.png';
import {
  PageContainer,
  Title,
  SectionContainer,
  Input,
  Select,
  TextArea,
  ProductList,
  ProductItem,
  ProductImage,
  ProductName,
  QuantityContainer,
  QuantityButton,
  QuantityText,
  SummaryContainer,
  PaymentMethodContainer,
  PaymentMethod,
  PlaceOrderButton,
  TotalRow
} from './Style';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [products, setProducts] = useState([
    { id: 1, name: "Garlic Oil 1000 MG+", price: 45.00, quantity: 1, image: productImage1 },
    { id: 2, name: "Vitamin D 1000U", price: 25.00, quantity: 1, image: productImage2 },
    { id: 3, name: "Kids Supplements For Focus", price: 20.00, quantity: 1, image: productImage3 }
  ]);

  const handlePaymentChange = (method) => setPaymentMethod(method);

  const handleQuantityChange = (productId, change) => {
    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, quantity: Math.max(1, product.quantity + change) }
        : product
    ));
  };

  const calculateSubtotal = () => products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const shipping = 5.00;
  const discount = 10.00;
  const total = calculateSubtotal() + shipping - discount;

  return (
    <PageContainer>
      <Title>THÔNG TIN ĐẶT HÀNG</Title>

      <SectionContainer>
        <div>
          <h2>THÔNG TIN VẬN CHUYỂN</h2>
          <Input type="text" placeholder="Nhập vào Họ Tên" />
          <Input type="text" placeholder="Nhập vào Số Điện Thoại" />
          <Input type="email" placeholder="Nhập vào Email" />
          <Input type="text" placeholder="Nhập vào địa chỉ" />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Select><option>Chọn Thành Phố</option></Select>
            <Select><option>Chọn Quận/Huyện</option></Select>
            <Select><option>Chọn Phường/Xã</option></Select>
          </div>
          <TextArea placeholder="Ghi chú thêm" />
        </div>

        <div>
          <h2>CHI TIẾT ĐƠN HÀNG</h2>
          <ProductList>
            {products.map(product => (
              <ProductItem key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductName>{product.name}</ProductName>
                <QuantityContainer>
                  <QuantityButton onClick={() => handleQuantityChange(product.id, -1)}><FaMinus /></QuantityButton>
                  <QuantityText>{product.quantity}</QuantityText>
                  <QuantityButton onClick={() => handleQuantityChange(product.id, 1)}><FaPlus /></QuantityButton>
                </QuantityContainer>
                <span>${(product.price * product.quantity).toFixed(2)}</span>
              </ProductItem>
            ))}
          </ProductList>
          <SummaryContainer>
            <TotalRow><span>SubTotal:</span><span>${calculateSubtotal().toFixed(2)}</span></TotalRow>
            <TotalRow><span>Shipping:</span><span>${shipping.toFixed(2)}</span></TotalRow>
            <TotalRow><span>Discount:</span><span>-${discount.toFixed(2)}</span></TotalRow>
            <TotalRow><strong>Total:</strong><strong>${total.toFixed(2)}</strong></TotalRow>
          </SummaryContainer>
        </div>
      </SectionContainer>

      <PaymentMethodContainer>
        <h2>PHƯƠNG THỨC THANH TOÁN</h2>
        <PaymentMethod onClick={() => handlePaymentChange("COD")}>
          <input type="radio" checked={paymentMethod === "COD"} readOnly />
          <FaTruck style={{ color: 'red' ,fontSize:'20px' }} /><span>Thanh toán khi nhận hàng (COD)</span>
          </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("VNPay")}>
          <input type="radio" checked={paymentMethod === "VNPay"} readOnly />
          <RiBankCardLine style={{ color: 'yellow',fontSize:'20px' }} /><span>Thanh toán ví điện tử VNPAY</span>
        </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("Paypal")}>
          <input type="radio" checked={paymentMethod === "Paypal"} readOnly />
          <FaPaypal  style={{ color: 'green' ,fontSize:'20px'}}/><span>Thanh toán qua Paypal</span>
        </PaymentMethod>
      </PaymentMethodContainer>

      <PlaceOrderButton>THANH TOÁN ĐƠN HÀNG</PlaceOrderButton>
    </PageContainer>
  );
};

export default Payment;
