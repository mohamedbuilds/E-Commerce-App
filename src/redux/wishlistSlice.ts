import getAllWishList from "@/api/getAllWishList";
import { WishListAction, WishListActionRemove } from "@/WishlistAction/WishListAction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ProdcutType } from "@/Types/ProductType";

// تعريف نوع الـ slice
interface WishlistState {
  wishlist: ProdcutType[];
  isLoading: boolean;
  error: string | null;
}

// initialState
const initialState: WishlistState = {
  wishlist: [],
  isLoading: false,
  error: null,
};

// addWishList thunk
export const addWishList = createAsyncThunk<
  ProdcutType,          // نوع البيانات اللي بيرجعها السيرفر
  string,               // النوع اللي بندخله (productId)
  { rejectValue: string } // النوع اللي بيرجعه rejectWithValue
>(
  "wishlist/addWishList",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await WishListAction(productId);
      return data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// removeWishList thunk
export const removeWishList = createAsyncThunk<
  { status: string; message: string }, // النوع اللي هترجعه
  string,
  { rejectValue: string }
>(
  "wishlist/removeWishList",
  async (productId, { rejectWithValue }) => {
    try {
      await WishListActionRemove(productId);
      return { status: "success", message: "Removed from wishlist" }; // 👈 رجع رسالة نجاح
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// loggedWishList thunk
export const loggedWishList = createAsyncThunk<
  ProdcutType[],
  void,
  { rejectValue: string }
>(
  "wishlist/loggedWishList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllWishList();
      return data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Something went wrong");
    }
  }
);

// slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addWishList
      .addCase(addWishList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist.push(action.payload); // نضيف المنتج الجديد
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // removeWishList
      .addCase(removeWishList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        const removedId = action.meta.arg;
        state.wishlist = state.wishlist.filter((product) => product._id !== removedId);
      })
      .addCase(removeWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // loggedWishList
      .addCase(loggedWishList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loggedWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishlist = action.payload;
      })
      .addCase(loggedWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default wishlistSlice.reducer;
