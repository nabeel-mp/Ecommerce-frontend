import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/cart');
    return data.cart;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const addToCart = createAsyncThunk('cart/addToCart', async (itemData, thunkAPI) => {
  try {
    await api.post('/cart/add', itemData);
    thunkAPI.dispatch(fetchCart()); // Refresh cart to get accurate totals
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const updateCartItem = createAsyncThunk('cart/updateCartItem', async (data, thunkAPI) => {
  try {
    await api.put('/cart/update', data);
    thunkAPI.dispatch(fetchCart());
    return true;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, thunkAPI) => {
  try {
    await api.delete(`/cart/remove/${itemId}`);
    thunkAPI.dispatch(fetchCart());
    return itemId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    subtotal: 0,
    shippingCharge: 0,
    total: 0,
    totalItems: 0,
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.items;
        state.subtotal = action.payload.subtotal;
        state.shippingCharge = action.payload.shippingCharge;
        state.total = action.payload.total;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCart.rejected, (state) => { state.isLoading = false; });
  },
});

export default cartSlice.reducer;