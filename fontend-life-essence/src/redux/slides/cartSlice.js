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
            const existingProductIndex = state.cartItems.findIndex(item => item.id === product.id);

            if (existingProductIndex >= 0) {
                // Nếu sản phẩm đã có trong giỏ, tăng số lượng
                state.cartItems[existingProductIndex].quantity += 1;
            } else {
                // Nếu sản phẩm chưa có, thêm mới sản phẩm vào giỏ
                state.cartItems.push({ ...product, quantity: 1 });
            }
        },
        removeeItem: (state, action) => {
            const productId = action.payload;
            const existingProductIndex = state.cartItems.findIndex(item => item.id === productId);

            if (existingProductIndex >= 0) {
                // Nếu sản phẩm có trong giỏ, giảm số lượng
                const product = state.cartItems[existingProductIndex];

                if (product.quantity > 1) {
                    state.cartItems[existingProductIndex].quantity -= 1; // Giảm số lượng
                } else {
                    // Nếu số lượng sản phẩm là 1, xóa sản phẩm khỏi giỏ
                    state.cartItems = state.cartItems.filter(item => item.id !== productId);
                }
            }
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});

export const { addItem, removeeItem, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;
