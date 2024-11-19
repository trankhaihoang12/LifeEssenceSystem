import React, { useEffect, useState } from 'react';
import { FaTruck, FaPaypal, FaMinus, FaPlus } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import * as OrderService from '../../services/OrderService'
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
import { useLocation, useNavigate } from 'react-router';
import { Spinner } from 'react-bootstrap';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { cartItems = [] } = location.state || {};// Lấy dữ liệu sản phẩm từ state nếu có
  console.log('Received Cart Items:', cartItems);
  cartItems.forEach(item => {
    console.log('Product Image:', item.image);
  });


  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [updatedProducts, setUpdatedProducts] = useState([]);
  useEffect(() => {
    if (cartItems.length > 0) {
      setLoading(true);
      const updated = cartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setUpdatedProducts(updated);
      setLoading(false); // Kết thúc tải dữ liệu
    } else {
      setLoading(false); // Nếu không có sản phẩm, cũng đặt loading thành false
    }
  }, [cartItems]);

  const handleQuantityChange = (productId, change) => {
    setUpdatedProducts(updatedProducts.map(product =>
      product.product_id === productId // Sử dụng `product_id` thay vì `id`
        ? { ...product, quantity: Math.max(1, product.quantity + change) }
        : product
    ));
  };

  // Tính tổng tiền (Subtotal + Shipping - Discount)
  const calculateSubtotal = () => updatedProducts.reduce((sum, product) => sum + parseFloat(product.price) * product.quantity, 0);
  const shipping = 5.00;
  const discount = 10.00;
  const total = calculateSubtotal() + shipping - discount;

  // Thay đổi phương thức thanh toán
  const handlePaymentChange = (method) => setPaymentMethod(method);
  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };
  // Xử lý đặt hàng
  const handlePlaceOrder = async () => {
    const fullName = document.querySelector('input[placeholder="Enter Full Name"]').value;
    const phone = document.querySelector('input[placeholder="Enter Phone Number"]').value;
    // const email = document.querySelector('input[placeholder="Enter Email"]').value;
    const address = document.querySelector('input[placeholder="Enter Address"]').value;
    const notes = document.querySelector('textarea[placeholder="Notes"]').value;

    if (!fullName || !phone || !address) {
      alert("Please fill in all required fields!");
      return;
    }

    const token = getToken(); // Replace with actual user token
    console.log('updatedProducts', updatedProducts)
    const orderDetails = updatedProducts.map(product => ({
      product_id: product.product_id,
      prod_name: product.prod_name,
      description: product.description,  // Thêm mô tả sản phẩm nếu cần
      price: product.price,
      quantity: product.quantity,
      image: product.image
    }));

    const orderData = {
      paymentMethods: paymentMethod,
      name: fullName,
      phone,
      address,
      note: notes,
      orderDetails
    };
    console.log('orderData', orderData)

    try {
      setLoading(true);
      const response = await OrderService.addOrder(orderData, token);
      console.log('response', response)
      console.log('response.data)', response.data)
      if (response && response.data) {
        // Điều hướng đến trang thành công, truyền dữ liệu qua state
        navigate("/order-success", { state: { order: response.data } });
      } else {
        // Xử lý lỗi nếu không thành công
        alert("Đặt hàng thất bại. Vui lòng thử lại.");
      }

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Title>ORDER INFORMATION</Title>
      {loading ? (
        <Spinner /> // Hiển thị spinner khi đang tải
      ) : (
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
            {updatedProducts.length > 0 ? (
              <>
                <ProductList>
                  {updatedProducts.map(product => (
                    <ProductItem key={product.product_id}>
                      <ProductImage src={product.image} alt={product.prod_name} />
                      <ProductName>{product.prod_name}</ProductName>
                      <QuantityContainer>
                        <QuantityButton onClick={() => handleQuantityChange(product.product_id, -1)}><FaMinus /></QuantityButton>
                        <QuantityText>{product.quantity}</QuantityText>
                        <QuantityButton onClick={() => handleQuantityChange(product.product_id, 1)}><FaPlus /></QuantityButton>
                      </QuantityContainer>
                      <span>${(parseFloat(product.price) * product.quantity).toFixed(2)}</span>
                    </ProductItem>
                  ))}
                </ProductList>
                <SummaryContainer>
                  <TotalRow><span>SubTotal:</span><span>${calculateSubtotal().toFixed(2)}</span></TotalRow>
                  <TotalRow><span>Shipping:</span><span>${shipping.toFixed(2)}</span></TotalRow>
                  <TotalRow><span>Discount:</span><span>-${discount.toFixed(2)}</span></TotalRow>
                  <TotalRow><strong>Total:</strong><strong>${total.toFixed(2)}</strong></TotalRow>
                </SummaryContainer>
              </>
            ) : (
              <p>No products in your cart. Please go back and add some items!</p>
            )}
          </div>
        </SectionContainer>
      )}
      <PaymentMethodContainer>
        <h2>PAYMENT METHOD</h2>
        <PaymentMethod onClick={() => handlePaymentChange("COD")}>
          <input type="radio" checked={paymentMethod === "COD"} readOnly />
          <FaTruck style={{ color: 'red', fontSize: '20px' }} /><span> Cash On Delivery (COD)</span>
        </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("VNPay")}>
          <input type="radio" checked={paymentMethod === "VNPay"} readOnly />
          <RiBankCardLine style={{ color: 'yellow', fontSize: '20px' }} /><span>VNPAY</span>
        </PaymentMethod>
        <PaymentMethod onClick={() => handlePaymentChange("Paypal")}>
          <input type="radio" checked={paymentMethod === "Paypal"} readOnly />
          <FaPaypal style={{ color: 'green', fontSize: '20px' }} /><span>Paypal</span>
        </PaymentMethod>
      </PaymentMethodContainer>

      <PlaceOrderButton onClick={handlePlaceOrder}>PAYMENT OF ORDER</PlaceOrderButton>
    </PageContainer>
  );
};

export default Payment;
