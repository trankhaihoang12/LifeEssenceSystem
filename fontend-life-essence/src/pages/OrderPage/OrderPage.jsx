import React, { useState } from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { FaHeart } from "react-icons/fa";

//sản phẩm có trong cart
const OrderPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Kids Supplements For Focus",
      price: 137.00,
      quantity: 1,
      image: "https://picsum.photos/seed/picsum/150",
    },
    {
      id: 2,
      name: "Kids Vitamins for Immunity",
      price: 120.00,
      quantity: 1,
      image: "https://picsum.photos/seed/picsum/150",
    },
  ]);
// sản phẩm có sẵn để thêm vào cart
  const [products] = useState([
    {
      id: 3,
      name: "Omega-3 Gummies",
      price: 15.99,
      image: "https://picsum.photos/seed/picsum/150",
    },
    {
      id: 4,
      name: "Multivitamin Chewables",
      price: 24.99,
      image: "https://picsum.photos/seed/picsum/150",
    },
  ]);
//chọn hiện ra couponcode
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };
//xoá sản phẩm
  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };
//thêm mục vào giỏ hàng
  const addItemToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      updateQuantity(existingItem.id, 1); // Tăng số lượng sp nếu đã tồn tại
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]); // Add new item
    }
  };
// cart total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.0;
  const total = subtotal + shipping - discount;
// mã CouponCode
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

  return (
    <div style={{ backgroundColor: "#f4f4f4", padding: "20px", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Cart</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px" }}>
          <div style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px" }}>
            {cartItems.map((item) => (
<div key={item.id} style={{ display: "flex", alignItems: "center", padding: "20px 0", borderBottom: "1px solid #eee", position: "relative" }}>
                <div style={{ position: "absolute", top: "10px", right: "10px" }}>
                  <FaHeart style={{ color: "#888", cursor: "pointer" }} />
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{ color: "#888", marginRight: "15px", border: "none", background: "none", cursor: "pointer" }}
                >
                  <X size={20} />
                </button>
                <img src={item.image} alt={item.name} style={{ width: "80px", height: "80px", borderRadius: "8px" }} />
                <div style={{ flex: "1", marginLeft: "20px" }}>
                  <h3 style={{ color: "#333", fontSize: "18px", fontWeight: "500" }}>{item.name}</h3>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{ padding: "5px", borderRadius: "50%", backgroundColor: "#f0f0f0", cursor: "pointer", border: "none" }}
                  >
                    <Minus size={16} />
                  </button>
                  <span style={{ width: "30px", textAlign: "center" }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ padding: "5px", borderRadius: "50%", backgroundColor: "#f0f0f0", cursor: "pointer", border: "none" }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div style={{ width: "100px", textAlign: "right" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

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
                }}>
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
            <button style={{
              marginTop: "20px",
              padding: "10px 0",
              width: "100%",
              borderRadius: "8px",
              backgroundColor: "#24AEB1",
              color: "#fff",
              fontWeight: "500",
              cursor: "pointer",
              border: "none"
            }}>
              PROCESS TO CHECKOUT
            </button>
          </div>
        </div>

        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginTop: "40px", marginBottom: "20px" }}>Available Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {products.map((product) => (
            <div key={product.id} style={{ backgroundColor: "#fff", borderRadius: "8px", padding: "20px", textAlign: "center" }}>
              <img src={product.image} alt={product.name} style={{ width: "100px", height: "100px", borderRadius: "8px" }} />
              <h3 style={{ fontSize: "18px", fontWeight: "500", margin: "10px 0" }}>{product.name}</h3>
              <p style={{ color: "#888" }}>${product.price.toFixed(2)}</p>
              <button
                onClick={() => addItemToCart(product)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  backgroundColor: "#24AEB1",
                  color: "#fff",
                  border: "none",
                  cursor: "pointer"
                }}>
                ADD TO CART
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;