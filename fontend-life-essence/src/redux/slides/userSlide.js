import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null, // Dữ liệu người dùng
    isLoggedIn: false, // Trạng thái đăng nhập
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload; // Lưu dữ liệu người dùng
            state.isLoggedIn = true; // Đánh dấu là đã đăng nhập
        },
        logout: (state) => {
            state.userData = null; // Xóa dữ liệu người dùng
            state.isLoggedIn = false; // Đánh dấu là đã đăng xuất
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout  } = userSlice.actions

export default userSlice.reducer