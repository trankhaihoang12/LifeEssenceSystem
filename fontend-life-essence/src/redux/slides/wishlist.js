import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // Danh sách sản phẩm yêu thích
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const item = action.payload;
            const exists = state.items.find((wishlistItem) => wishlistItem.id === item.id);
            if (!exists) {
                state.items.push(item); // Chỉ thêm nếu chưa tồn tại
            }
        },
        removeFromWishlist: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((wishlistItem) => wishlistItem.id !== itemId);
        },
        clearWishlist: (state) => {
            state.items = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
