import React, { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { FaHeart } from "react-icons/fa";
import * as OrderService from '../../services/OrderService'
import * as ProductsService from '../../services/ProductsService'
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeeItem, setCartItems, updateQuantity } from '../../redux/slides/cartSlice';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/MessageComponent/Message'; 

//sản phẩm có trong cart
const OrderPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //chọn hiện ra couponcode
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };

  // Lấy dữ liệu giỏ hàng từ backend
  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const token = getToken(); // Lấy token từ localStorage
        const cartData = await OrderService.getAllCartItems(token); // Gọi API lấy giỏ hàng
        const productData = await ProductsService.fetchAllProducts({ page, limit: 10 }); // Gọi API lấy danh sách sản phẩm

        // Ánh xạ giữa cartItems và productData để lấy ảnh
        const enrichedCartItems = cartData.data.map((cartItem) => {
          const matchingProduct = productData.products.find(
            (product) => product.id === cartItem.product_id
          );
          const imageUrl = matchingProduct?.images?.[0]?.url.replace(/\\/g, '/') || "https://via.placeholder.com/150";
          // Gắn ảnh vào cartItem nếu tìm thấy sản phẩm
          return {
            ...cartItem,
            image: imageUrl, // Ảnh mặc định nếu không có
            discount: matchingProduct?.discount || 0 
          };
        });

        dispatch(setCartItems(enrichedCartItems));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu giỏ hàng hoặc sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductsService.fetchAllProducts({ page, limit: 10 }); // Không cần token
        console.log('Dữ liệu sản phẩm nhận được:', data.products);
        setProducts(data.products);
        localStorage.setItem('products', JSON.stringify(data.products));
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchCoupons = async () => {
      try {
        const token = getToken();
        const activeCoupons = await ProductsService.getActiveCoupons(token); // Gọi hàm để lấy coupons
        console.log('activeCoupons', activeCoupons)
        setCoupons(activeCoupons); // Lưu coupons vào state
      } catch (error) {
        console.error("Lỗi khi tải coupon:", error);
        message.error("Không thể tải coupon");
      }
    };

    fetchCartItems();
    fetchProducts();
    fetchCoupons(); // Gọi hàm lấy coupon

  }, []);

  console.log('cartItems', cartItems)

  // Update quantity of a product in the cart
  const updateCartItemQuantity = async (productId, change) => {
    const token = getToken();
    try {
      const existingItem = cartItems.find((item) => item.product_id === productId);
      if (!existingItem) {
        message.error("Product not found in the cart!");
        return;
      }

      const newQuantity = Math.max(1, existingItem.quantity + change);
      await OrderService.updateCartItem(productId, newQuantity, token);
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    } catch (error) {
      console.error("Error updating product quantity:", error.response?.data || error.message);
      message.error("Failed to update product quantity!");
    }
  }

  const removeCartItem = async (productId) => {
    const token = getToken();

    try {
      const response = await OrderService.removeFromCart(productId, token);

      if (response.status === 200) {
        // Xóa sản phẩm khỏi Redux state ngay lập tức
        dispatch(removeeItem(productId));
        message.success("Sản phẩm đã được xóa khỏi giỏ hàng!");
      } else {
        message.error("Không thể xóa sản phẩm khỏi giỏ hàng!");
      }
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error.message);
      message.error("Không thể xóa sản phẩm!");
    }
  };






  //thêm mục vào giỏ hàng
  const addItemToCart = async (product) => {
    const token = getToken(); // Lấy token từ localStorage

    try {
      setLoading(true);
      // Gọi API để thêm sản phẩm vào giỏ hàng
      await OrderService.addToCart(product.id, 1, token);

      // Cập nhật giỏ hàng trong state để hiển thị ngay lập tức
      dispatch(addItem({
        ...product,
        product_id: product.id,
        quantity: 1,
        image: product.images?.[0]?.url || "https://via.placeholder.com/150",
      }));

      // Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.product_id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevItems,
            {
              ...product,
              product_id: product.id,
              quantity: 1,
              image: product.images?.[0]?.url || "https://via.placeholder.com/150",
            }
          ];
        }
      });

      message.success('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
      message.error('Lỗi khi thêm sản phẩm vào giỏ hàng!'); // Hiển thị thông báo lỗi
    } finally {
      setLoading(false);
    }
  };


  // Tính toán subtotal và total với useMemo
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity * (1 - item.discount));
    }, 0);
  }, [cartItems]);

  const shipping = 5.0;

  const total = useMemo(() => {
    return subtotal + shipping - couponDiscount;
  }, [subtotal, shipping, couponDiscount]);


  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === selectedCoupon);
    if (coupon) {
      setCouponDiscount((subtotal * coupon.coupons_percent) / 100);
      message.success(`Coupon applied: ${coupon.code} - Discount: $${(subtotal * coupon.coupons_percent) / 100}`);
    } else {
      message.error("Mã coupon không hợp lệ");
      setCouponDiscount(0);
    }
  };

  if (loading) {
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <Loading isPending={loading} />
    </div>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function chuyển hướng sang trang thanh toán
  const handleProceedToPayment = () => {
    navigate("/payment", { state: { cartItems, couponDiscount } });  // Truyền dữ liệu cartItems qua state
    console.log(cartItems);
  };


  return (
    <Loading isPending={loading} >
      <div style={{ backgroundColor: "#f4f4f4", padding: "20px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Cart</h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
            <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px" }}>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cartItems.map((item) => {
                  // Tìm sản phẩm tương ứng
                  const product = products.find((prod) => prod.id === item.product_id);

                  // Lấy hình ảnh đầu tiên từ danh sách images
                  const imageSrc = product?.images?.[0]?.url || "https://via.placeholder.com/80";
                  return (
                    <div
                      key={item.product_id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "20px 0",
                        borderBottom: "1px solid #eee",
                        position: "relative"
                      }}
                    >
                      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                        <FaHeart style={{ color: "#888", cursor: "pointer" }} />
                      </div>
                      <button
                        onClick={() => removeCartItem(item.product_id)}
                        style={{
                          color: "#888",
                          marginRight: "15px",
                          border: "none",
                          background: "none",
                          cursor: "pointer"
                        }}
                      >
                        <X size={20} />
                      </button>
                      <img src={imageSrc} alt={item.prod_name} style={{ width: "80px", height: "80px", borderRadius: "8px" }} />
                      <div style={{ flex: "1", marginLeft: "20px" }}>
                        <h3 style={{ color: "#333", fontSize: "18px", fontWeight: "500" }}>{item.prod_name}</h3>
                      </div>
                      <div style={{ width: "100px" }}>${(item.price)}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button
                          onClick={() => updateCartItemQuantity(item.product_id, -1)}
                          style={{
                            padding: "5px",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            cursor: "pointer",
                            border: "none"
                          }}
                        >
                          <Minus size={16} />
                        </button>
                        <span style={{ width: "30px", textAlign: "center" }}>{item.quantity}</span>
                        <button
                          onClick={() => updateCartItemQuantity(item.product_id, 1)}
                          style={{
                            padding: "5px",
                            borderRadius: "50%",
                            backgroundColor: "#f0f0f0",
                            cursor: "pointer",
                            border: "none"
                          }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                        <div style={{ width: "100px", textAlign: "right", textDecoration: "line-through", color: "#888" }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        <div style={{ width: "100px", textAlign: "right", fontWeight: "bold", color: "#333" }}>
                          ${(item.price * item.quantity * (1 - item.discount)).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <select
                  value={selectedCoupon}
                  onChange={(e) => setSelectedCoupon(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    flex: "1",
                    outline: "none"
                  }}
                >
                  <option value="">Select Coupon</option>
                  {coupons.map((coupon) => (
                    <option key={coupon.code} value={coupon.code}>
                      {coupon.code}
                    </option>
                  ))}
                </select>
                <button
                  onClick={applyCoupon}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    backgroundColor: "#24AEB1",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  APPLY COUPON
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>Cart Totals</h2>
              <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", color: "#555" }}>
                <span>SubTotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", color: "#555" }}>
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", color: "#555" }}>
                <span>Coupon Discount:</span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </div>
              <div style={{ fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleProceedToPayment}
                style={{
                  marginTop: "20px",
                  padding: "10px 0",
                  width: "100%",
                  borderRadius: "8px",
                  backgroundColor: "#24AEB1",
                  color: "#fff",
                  fontWeight: "500",
                  cursor: "pointer",
                  border: "none"
                }}
              >
                PROCESS TO CHECKOUT
              </button>
            </div>
          </div>

          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "40px", marginBottom: "20px" }}>Available Products</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {products.map((product) => {
              const imageSrc = product?.images?.[0]?.url || "https://via.placeholder.com/100";

              return (
                <div
                  key={product.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "15px",
                    textAlign: "center",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img onClick={() => navigate(`/details-product/${product.id}`)}
                    src={imageSrc}
                    alt={product.prod_name}
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      margin: "10px 0",
                      color: "#333",
                    }}
                  >
                    {product.prod_name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "10px",
                    }}
                  >
                    ${parseFloat(product.price).toFixed(2)}
                  </p>
                  <button

                    style={{
                      padding: "8px 12px",
                      borderRadius: "20px",
                      backgroundColor: "#24AEB1",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      transition: "background-color 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#1b8b8f";
                      e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#24AEB1";
                      e.target.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
                    }}
                    onClick={() => addItemToCart(product)}
                  >
                    ADD TO CART
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </Loading>
  );
};

export default OrderPage;