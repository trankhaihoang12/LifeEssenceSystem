import React, { useEffect, useMemo, useState } from 'react';
import { FaTruck, FaPaypal, FaMinus, FaPlus } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import * as OrderService from '../../services/OrderService'
import * as PaymentService from '../../services/PaymentService'
import * as AddressService from '../../services/AddressService'
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
import {useLocation, useNavigate } from 'react-router';
import { PayPalButton } from 'react-paypal-button-v2';
import Loading from '../../components/LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, updateQuantity } from '../../redux/slides/cartSlice';

  const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {couponDiscount} = location.state || {};
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [sdkReady, setsdkReady] = useState(false);
    const [clientId, setClientId] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [isAddressSelected, setIsAddressSelected] = useState(false);
    const [manualAddress, setManualAddress] = useState('');
    const [showAddressList, setShowAddressList] = useState(false);
    const [addresses, setAddresses] = useState(''); 
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
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

    // Tính toán subtotal và total với useMemo
    const subtotal = useMemo(() => {
      return cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity * (1 - item.discount));
      }, 0);
    }, [cartItems]);


    // Đảm bảo couponDiscount là một số
    const memoizedCouponDiscount = useMemo(() => {
      if (couponDiscount && typeof couponDiscount === 'number') {
        return couponDiscount; // Nếu couponDiscount là số
      } else if (couponDiscount && typeof couponDiscount.couponDiscount === 'number') {
        return couponDiscount.couponDiscount; // Nếu couponDiscount là đối tượng
      }
      return 0; // Trả về 0 nếu không có giá trị hợp lệ
    }, [couponDiscount]);

    // Tính toán phí vận chuyển
    const calculateShipping = (total) => {
      if (total > 50) return 0; // Miễn phí vận chuyển
      if (total > 30) return 0.5; // Phí vận chuyển 0.5$
      return 1; // Phí vận chuyển 1$
    };

    // Tính toán tổng với useMemo
    const total = useMemo(() => {
      const shipping = calculateShipping(subtotal - memoizedCouponDiscount);
      return subtotal - memoizedCouponDiscount + shipping; // Tổng bao gồm phí vận chuyển
    }, [subtotal, memoizedCouponDiscount]);


    // Thay đổi phương thức thanh toán
    const handlePaymentChange = (method) => setPaymentMethod(method);
    const getToken = () => {
      const storedUserData = localStorage.getItem('userData');
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      return parsedUserData ? parsedUserData.token : null;
    };
    const getUserId = () => {
      const storedUserData = localStorage.getItem('userData');
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      return parsedUserData?.user?.id;
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
        orderDetails,
        total: total.toFixed(2)
      };

      try {
        setLoading(true);
        const response = await OrderService.addOrder(orderData, token);
        console.log('response', response)
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

    useEffect(() => {
      const fetchAddresses = async () => {
        const token = getToken()
        const userId = getUserId()
        try {
          const response = await AddressService.getAllDeliveryAddresses(userId, token);
          // Kiểm tra xem response có dữ liệu và dữ liệu có phải là mảng không
          if (response && Array.isArray(response.data)) {
            setAddresses(response.data); // Cập nhật địa chỉ từ dữ liệu
          } else {
            console.error('Invalid data format:', response); // Ghi log nếu dữ liệu không hợp lệ
          }
        } catch (error) {
          console.error('Failed to fetch addresses:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAddresses();
    }, []);

    const handleAddressSelect = (address) => {
      setSelectedAddress(`${address.detail_address}, ${address.ward}, ${address.district}, ${address.province}`);
      setManualAddress(''); 
      setIsAddressSelected(true);
      setShowAddressList(false);
    };

    useEffect(() => {
      const storedUserData = localStorage.getItem('userData');
      console.log('storedUserData', storedUserData)
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setFullName(parsedUserData.user.name || ''); // Giả sử fullName có trong userData
        setPhone(parsedUserData.user.phone || ''); // Giả sử phone có trong userData
      }
    }, []);


    const handleVnpayPayment = async () => {
      const fullName = document.querySelector('input[placeholder="Enter Full Name"]').value;
      const phone = document.querySelector('input[placeholder="Enter Phone Number"]').value;
      const address = document.querySelector('input[placeholder="Enter Address"]').value;
      const notes = document.querySelector('textarea[placeholder="Notes"]').value;

      if (!fullName || !phone || !address) {
        alert("Please fill in all required fields!");
        return;
      }

      const token = getToken(); // Lấy token người dùng
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
        total: total.toFixed(2)
      };

      try {
        setLoading(true);
        const response = await OrderService.createVnpayOrder(orderData, token); // Gọi API tạo đơn hàng VNPAY
        if (response && response.data) {
          window.location.href = response.data.paymentUrl; // Chuyển hướng đến URL thanh toán VNPAY
        } else {
          alert("Đặt hàng thất bại. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Error placing order with VNPAY:", error);
        alert("Failed to place order. Please try again later.");
      } finally {
        setLoading(false);
      }
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
          total: total.toFixed(2)
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
            <Input
              type="text"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div style={{ position: 'relative', marginTop: '10px' }}>
              <Input
                type="text"
                placeholder="Enter Address"
                value={isAddressSelected ? selectedAddress : manualAddress} // Hiển thị địa chỉ đã chọn hoặc địa chỉ nhập thủ công
                onChange={(e) => {
                  setManualAddress(e.target.value);
                  setIsAddressSelected(false); // Đặt là false nếu người dùng đang nhập địa chỉ thủ công
                }}
                style={{ cursor: 'text' }} // Đổi con trỏ khi có thể chỉnh sửa
              />
              <button
                onClick={() => setShowAddressList(!showAddressList)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  padding: '5px 10px',
                  backgroundColor: '#007BFF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
              >
                Choose Address ▼
              </button>
              {showAddressList && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  right: '0',
                  border: '1px solid #ccc',
                  background: '#fff',
                  borderRadius: '5px',
                  maxHeight: '150px',
                  overflowY: 'auto',
                  zIndex: 1000,
                }}>
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => handleAddressSelect(address)}
                      style={{
                        padding: '10px',
                        cursor: 'pointer',
                        borderBottom: '1px solid #eee',
                        transition: 'background-color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                    >
                      {`${address.detail_address}, ${address.ward}, ${address.district}, ${address.province}`}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <div style={{ display: 'flex', gap: '8px' }}>
              <Select><option>Select City</option></Select>
              <Select><option>Select District</option></Select>
              <Select><option>Select Ward/Commune</option></Select>
            </div> */}
            <TextArea placeholder="Notes" />
            <PaymentMethodContainer>
              <h2>PAYMENT METHOD</h2>
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-around' }}>
                <PaymentMethod onClick={() => handlePaymentChange("COD")}>
                  <input type="radio" checked={paymentMethod === "COD"} readOnly />
                  <FaTruck style={{ color: 'red', fontSize: '20px' }} /><span> Cash On Delivery (COD)</span>
                </PaymentMethod>
                <PaymentMethod onClick={() => handlePaymentChange("VNPAY")}>
                  <input type="radio" checked={paymentMethod === "VNPAY"} readOnly />
                  <RiBankCardLine style={{ color: '#CC0000', fontSize: '20px' }} /><span>VNPAY</span>
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
                  <TotalRow><span>SubTotal:</span><span>${subtotal.toFixed(2)}</span></TotalRow>
                  <TotalRow><span>Shipping:</span><span>${calculateShipping(subtotal - memoizedCouponDiscount).toFixed(2)}</span></TotalRow>
                  <TotalRow><span>Coupon Discount:</span><span>${memoizedCouponDiscount.toFixed(2)}</span></TotalRow>
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


                  ) : paymentMethod === "VNPAY" ? (
                      <PlaceOrderButton onClick={handleVnpayPayment}>PAYMENT WITH VNPAY</PlaceOrderButton>
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
