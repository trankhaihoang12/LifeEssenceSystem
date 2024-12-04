import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [], // Danh sách các sản phẩm trong giỏ hàng
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItem: (state, action) => {
            const product = action.payload;
            const existingProductIndex = state.cartItems.findIndex(item => item.product_id === product.product_id);

            if (existingProductIndex >= 0) {
                state.cartItems[existingProductIndex].quantity += 1;
            } else {
                state.cartItems.push({ ...product, quantity: 1 });
            }
        },
        
        removeeItem: (state, action) => {
            const productId = action.payload;

            // Xóa sản phẩm hoàn toàn khỏi giỏ hàng
            state.cartItems = state.cartItems.filter(item => item.product_id !== productId);
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        clearCart: (state) => {
            // Reset giỏ hàng về mảng trống
            state.cartItems = [];
        },
        updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.cartItems.find(item => item.product_id === productId);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeeItem, setCartItems, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
