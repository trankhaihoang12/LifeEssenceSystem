import React, { useEffect, useState } from 'react';
import { FaTruck, FaPaypal, FaMinus, FaPlus } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import * as OrderService from '../../services/OrderService'
import * as PaymentService from '../../services/PaymentService'
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
import { PayPalButton } from 'react-paypal-button-v2';
import Loading from '../../components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateQuantity } from '../../redux/slides/cartSlice';

  const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cartItems = useSelector((state) => state.cart.cartItems);
        console.log('cartItems',cartItems)
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [updatedProducts, setUpdatedProducts] = useState([]);
    console.log('updatedProducts', updatedProducts)
    const [sdkReady, setsdkReady] = useState(false);
    const [clientId, setClientId] = useState('');
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
      setUpdatedProducts(prevProducts =>
        prevProducts.map(product =>
          product.product_id === productId
            ? { ...product, quantity: Math.max(1, product.quantity + change) }
            : product
        )
      );

      // Dispatch action để cập nhật Redux store
      const newQuantity = updatedProducts.find(product => product.product_id === productId)?.quantity + change || 1;
      dispatch(updateQuantity({ productId, quantity: Math.max(1, newQuantity) }));
    };

    // Tính tổng tiền (Subtotal + Shipping - Discount)
    const calculateSubtotal = () =>
      cartItems.reduce((sum, product) => sum + parseFloat(product.price) * product.quantity, 0);
    const shipping = 5.0;
    const discount = 10.0;
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
      const address = document.querySelector('input[placeholder="Enter Address"]').value;
      const notes = document.querySelector('textarea[placeholder="Notes"]').value;

      if (!fullName || !phone || !address) {
        alert("Please fill in all required fields!");
        return;
      }

      const token = getToken(); // Replace with actual user token
      const orderDetails = cartItems.map((product) => ({
        product_id: product.product_id,
        prod_name: product.prod_name,
        description: product.prod_description,
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
        if (response && response.data) {
          await OrderService.clearCart(token);
          dispatch(clearCart());
          localStorage.removeItem('cart');
          console.log('localStorage', localStorage)
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
    const handleMomoPayment = () => {
      // Logic để xử lý thanh toán qua Momo
      alert("Momo payment processing...");
    };

    const onSuccessPaypal = async (details, data) => {
      console.log('details, data', details, data)
      try {
        // Kiểm tra giao dịch có thành công không
        if (!details || !details.id) {
          console.error("Transaction details missing");
          alert("Transaction failed. Please try again.");
          return;
        }

        const fullName = document.querySelector('input[placeholder="Enter Full Name"]').value;
        const phone = document.querySelector('input[placeholder="Enter Phone Number"]').value;
        const address = document.querySelector('input[placeholder="Enter Address"]').value;
        const notes = document.querySelector('textarea[placeholder="Notes"]').value;

        // Kiểm tra dữ liệu bắt buộc
        if (!fullName || !phone || !address) {
          alert("Please fill in all required fields!");
          return;
        }

        const token = getToken(); // Replace with actual user token
        const orderDetails = cartItems.map((product) => ({
          product_id: product.product_id,
          prod_name: product.prod_name,
          description: product.prod_description,
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
          orderDetails,
          is_payment: true,
        };

        setLoading(true);
        const response = await OrderService.addOrder(orderData, token);
        if (response && response.data) {
          await OrderService.clearCart(token);
          dispatch(clearCart());
          localStorage.removeItem('cart');
          navigate("/order-success", { state: { order: response.data } });
        } else {
          alert("Order placement failed. Please try again.");
        }
      } catch (error) { 
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again later.");
      } finally {
        setLoading(false);
      }
    };


  const addPaypalScript = async () => {
    try {
      const { data } = await PaymentService.getConfigPaypal(); // Lấy clientId từ API
      if (!data) {
        console.error("PayPal Client ID not received");
        alert("Unable to load PayPal SDK. Please try again later.");
        return;
      }

      setClientId(data); // Lưu clientId vào state
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => setsdkReady(true);
      script.onerror = () => {
        console.error("Failed to load PayPal script");
        alert("Failed to load PayPal script. Please try again later.");
      };
      document.body.appendChild(script);
    } catch (error) {
      console.error('Failed to load PayPal script:', error);
      alert("Failed to load PayPal. Please check your network connection.");
    }
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript()
    } else {
      setsdkReady(true)
    }
  }, [])

  return (
    <PageContainer>
      <Title>ORDER INFORMATION</Title>
      <Loading isPending={loading}>
        <SectionContainer>
          <div style={{ width: "70%", boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius: '8px', padding: '16px', backgroundColor: '#fff', margin: '20px auto' }}>
            <h2>SHIPPING INFORMATION</h2>
            <Input type="text" placeholder="Enter Full Name" />
            <Input type="text" placeholder="Enter Phone Number" />
            <Input type="text" placeholder="Enter Address" />
            <div style={{ display: 'flex', gap: '8px' }}>
              <Select><option>Select City</option></Select>
              <Select><option>Select District</option></Select>
              <Select><option>Select Ward/Commune</option></Select>
            </div>
            <TextArea placeholder="Notes" />
            <PaymentMethodContainer>
              <h2>PAYMENT METHOD</h2>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                <PaymentMethod onClick={() => handlePaymentChange("COD")}>
                  <input type="radio" checked={paymentMethod === "COD"} readOnly />
                  <FaTruck style={{ color: 'red', fontSize: '20px' }} /><span> Cash On Delivery (COD)</span>
                </PaymentMethod>
                <PaymentMethod onClick={() => handlePaymentChange("Momo")}>
                  <input type="radio" checked={paymentMethod === "Momo"} readOnly />
                  <RiBankCardLine style={{ color: '#CC0000', fontSize: '20px' }} /><span>Momo</span>
                </PaymentMethod>
                <PaymentMethod onClick={() => handlePaymentChange("Paypal")}>
                  <input type="radio" checked={paymentMethod === "Paypal"} readOnly />
                  <FaPaypal style={{ color: 'green', fontSize: '20px' }} /><span>Paypal</span>
                </PaymentMethod>
              </div>
            </PaymentMethodContainer>
          </div>
          <div style={{
            width: "30%", boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius: '8px', padding: '16px', backgroundColor: '#fff', margin: '20px auto'
          }}>
            <h2>ORDER DETAILS</h2>
            {updatedProducts.length > 0 ? (
              <>
                <ProductList>
                  {updatedProducts.map(product => (
                    <ProductItem key={product.product_id}>
                      <ProductImage src={`http://localhost:3000/${product.image}`} alt={product.prod_name} />
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

                <div style={{ marginTop: '30px' }}>
                  {paymentMethod === "Paypal" && sdkReady ? (
                    <PayPalButton
                      amount={total}
                      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={onSuccessPaypal}
                      onError={(err) => {

                        console.error("PayPal transaction error:", err);
                        alert("An error occurred during the transaction.");
                      }}
                    />


                  ) : paymentMethod === "Momo" ? (
                    <PlaceOrderButton onClick={handleMomoPayment}>PAYMENT WITH MOMO</PlaceOrderButton>
                  ) : (
                    <PlaceOrderButton onClick={handlePlaceOrder}>PAYMENT OF ORDER</PlaceOrderButton>
                  )}
                </div>
              </>
            ) : (
              <p>No products in your cart. Please go back and add some items!</p>
            )}
          </div>
        </SectionContainer>
      </Loading>
    </PageContainer>
  );
};

export default Payment;
