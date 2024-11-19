import React, { useEffect, useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { FaHeart } from "react-icons/fa";
import * as OrderService from '../../services/OrderService'
import * as ProductsService from '../../services/ProductsService'
import { useNavigate } from 'react-router';

//sản phẩm có trong cart
const OrderPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //chọn hiện ra couponcode
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const getToken = () => {
    const storedUserData = localStorage.getItem('userData');
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
    return parsedUserData ? parsedUserData.token : null;
  };

  // Lấy dữ liệu giỏ hàng từ backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getToken(); // Lấy token từ localStorage
        const cartData = await OrderService.getAllCartItems(token); // Gọi API lấy giỏ hàng
        const productData = await ProductsService.fetchAllProducts({ page, limit: 4 }); // Gọi API lấy danh sách sản phẩm

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
          };
        });

        setCartItems(enrichedCartItems); // Cập nhật giỏ hàng với ảnh
        setProducts(productData.products); // Lưu danh sách sản phẩm
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
        const data = await ProductsService.fetchAllProducts({ page, limit: 4 }); // Không cần token
        console.log('Dữ liệu sản phẩm nhận được:', data.products);
        setProducts(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    fetchProducts();
  }, []);



  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  const removeItem = async (id) => {
    try {
      const token = getToken(); // Lấy token từ localStorage
      const response = await OrderService.removeFromCart(id, token); // Gọi API xóa sản phẩm khỏi giỏ hàng

      if (response.status === 200) {
        // Cập nhật lại giỏ hàng trong state (loại bỏ sản phẩm khỏi giỏ hàng)
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== id));
        alert('Product removed successfully');
      } else {
        alert('Error removing product');
      }
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error.message);
      alert('Error removing product');
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
      setCartItems((prevItems) => {
        const existingItem = prevItems.find(item => item.product_id === product.id);

        if (existingItem) {
          // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên
          return prevItems.map((item) =>
            item.product_id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ
          return [
            ...prevItems,
            {
              ...product, // Copy toàn bộ thông tin sản phẩm
              product_id: product.id,
              quantity: 1,
              image: product.images?.[0]?.url || "https://via.placeholder.com/150", // Gắn thông tin ảnh// Số lượng ban đầu là 1
            }
          ];
        }
      });
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error.message);
    }
  };



  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.0;
  const total = subtotal + shipping - discount;

  const couponCodes = [
    { code: "FREESHIP", discount: shipping }, // Free shipping
    { code: "SAVE10", discount: 10 }, // $10 off
    { code: "HALFPRICE", discount: subtotal / 2 }, // 50% off subtotal
  ];

  const applyCoupon = () => {
    const coupon = couponCodes.find(c => c.code === selectedCoupon);
    if (coupon) {
      setDiscount(coupon.discount);
      alert(`Coupon applied: ${coupon.code} - Discount: $${coupon.discount}`);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Function chuyển hướng sang trang thanh toán
  const handleProceedToPayment = () => {
    navigate("/payment", { state: { cartItems } });  // Truyền dữ liệu cartItems qua state
  };
  console.log('first', cartItems)

  return (
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
                      onClick={() => removeItem(item.product_id)}
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
                        onClick={() => updateQuantity(item.id, -1)}
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
                        onClick={() => updateQuantity(item.id, 1)}
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
                    <div style={{ width: "100px", textAlign: "right" }}>
                      ${(item.price * item.quantity).toFixed(2)}
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
                {couponCodes.map((coupon) => (
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
              <span>Discount:</span>
              <span>-${discount.toFixed(2)}</span>
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
                <img
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
  );
};

export default OrderPage;