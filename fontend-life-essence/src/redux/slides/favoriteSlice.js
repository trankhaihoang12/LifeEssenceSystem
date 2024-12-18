import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllFavorites, addFavorite, removeFavorite } from '../../services/FavoriteService';

// Async thunk để lấy danh sách sản phẩm yêu thích
export const fetchFavorites = createAsyncThunk(
    'favorites/fetchFavorites',
    async ({ userId, token }, { rejectWithValue }) => {
        try {
            const data = await getAllFavorites(userId, token);
            return data.data; // Giả sử API trả về dữ liệu trong trường `data`
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk để thêm sản phẩm vào danh sách yêu thích
export const addToFavorites = createAsyncThunk(
    'favorites/addToFavorites',
    async ({ userId, productId, token }, { rejectWithValue }) => {
        try {
            const data = await addFavorite(userId, productId, token);
            return { id: productId, ...data }; // Đảm bảo trả về ID và dữ liệu cần thiết
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk để xóa sản phẩm khỏi danh sách yêu thích
export const removeFromFavorites = createAsyncThunk(
    'favorites/removeFromFavorites',
    async ({ id, token }, { rejectWithValue }) => {
        try {
            await removeFavorite(id, token);
            return id; // Trả về ID đã xóa để cập nhật state
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: [], // Danh sách sản phẩm yêu thích
        favoritesCount: 0, // Số lượng sản phẩm yêu thích
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Xử lý fetchFavorites
        builder.addCase(fetchFavorites.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchFavorites.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
            state.favoritesCount = action.payload.length; // Cập nhật số lượng yêu thích
        });
        builder.addCase(fetchFavorites.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Xử lý addToFavorites
        builder.addCase(addToFavorites.fulfilled, (state, action) => {
            state.items.push(action.payload); // Thêm sản phẩm vào danh sách
            state.favoritesCount += 1; // Tăng số lượng yêu thích
        });
        builder.addCase(addToFavorites.rejected, (state, action) => {
            state.error = action.payload;
        });

        // Xử lý removeFromFavorites
        builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
            state.items = state.items.filter((item) => item.favorite_id !== action.payload);
            state.favoritesCount -= 1; // Giảm số lượng yêu thích
        });
        builder.addCase(removeFromFavorites.rejected, (state, action) => {
            state.error = action.payload;
        });
    },
});

export default favoriteSlice.reducer;

