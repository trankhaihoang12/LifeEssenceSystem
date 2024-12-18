import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterSlice'
import cartReducer from './slides/cartSlice';
import userReducer from './slides/userSlide';
import favoriteReducer from './slides/favoriteSlice'
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer, // Thêm reducer giỏ hàng
        user: userReducer,
        favorites: favoriteReducer,
    },
})