import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlice'
import cartReducer from './slides/cartSlice';
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer, // Thêm reducer giỏ hàng
    },
})