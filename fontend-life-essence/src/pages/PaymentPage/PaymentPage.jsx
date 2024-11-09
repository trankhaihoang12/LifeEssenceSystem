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
      <Title>ORDER INFORMATION</Title>

      <SectionContainer>
        <div>
          <h2>SHIPPING INFORMATION</h2>
          <Input type="text" placeholder="Enter Full Name" />
          <Input type="text" placeholder="Enter Phone Number" />
          <Input type="email" placeholder="Enter Email" />
          <Input type="text" placeholder="Enter Address" />
          <div style={{ display: 'flex', gap: '8px' }}>
            <Select><option>Select City</option></Select>
            <Select><option>Select District</option></Select>
            <Select><option>Select Ward/Commune</option></Select>
          </div>
          <TextArea placeholder="Notes" />
        </div>

        <div>
          <h2>ORDER DETAILS</h2>
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
        <h2>PAYMENT METHOD</h2>
        <PaymentMethod onClick={() => handlePaymentChange("COD")}>
          <input type="radio" checked={paymentMethod === "COD"} readOnly />
          <FaTruck style={{ color: 'red' ,fontSize:'20px' }} /><span> Cash On Delivery (COD)</span>
          </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("VNPay")}>
          <input type="radio" checked={paymentMethod === "VNPay"} readOnly />
          <RiBankCardLine style={{ color: 'yellow',fontSize:'20px' }} /><span>VNPAY</span>
        </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("Paypal")}>
          <input type="radio" checked={paymentMethod === "Paypal"} readOnly />
          <FaPaypal  style={{ color: 'green' ,fontSize:'20px'}}/><span>Paypal</span>
        </PaymentMethod>
      </PaymentMethodContainer>

      <PlaceOrderButton>PAYMENT OF ORDER</PlaceOrderButton>
    </PageContainer>
  );
};

export default Payment;
