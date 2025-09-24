import {
  addToCartServer,
  clearCartServer,
  loggedCartServer,
  removeCartServer,
  updateCartServer,
} from "@/CartAction/CartAction";
import { UpdateUserCartParams } from "@/Types/cartType";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface Product {
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    brand: { name: string };
    price: number;
  };
  count: number;
  price: number;
}

interface CartData {
  cartOwner: string;
  createdAt: string;
  products: Product[];
  totalCartPrice: number;
  updatedAt: string;
  _id: string;
  __v: number;
}

interface CartState {
  cart: {
    cartId: string | null;
    data: CartData | null;
  };
  isLoading: boolean;
  error: string | null;
  numOfCartItems: number;
}

const initialState: CartState = {
  cart: {
    cartId: null,
    data: null, // ممكن بعد جلب الـ API يبقى فيه بيانات
  },
  isLoading: false,
  error: null,
  numOfCartItems: 0,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId: string) => {
    try {
      const data = await addToCartServer(productId);
      return data; // ده هيتخزن في action.payload
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      return err.message;
    }
  }
);

export const loggedUserCart = createAsyncThunk<
  { cartId: string | null; data: CartData | null; numOfCartItems: number }, // type returned
  void,
  { rejectValue: string }
>("cart/loggedUserCart", async (_, thunkAPI) => {
  try {
    const datelogged = await loggedCartServer();
    return datelogged; // تأكد إن datelogged بنفس الشكل
  } catch (error) {
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Something went wrong";
    return thunkAPI.rejectWithValue(message);
  }
});

export const removeUserCart = createAsyncThunk(
  "cart/removeUserCart",
  async (id: string) => {
    try {
      const dateremove = await removeCartServer(id);
      return dateremove;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUserCart = createAsyncThunk(
  "cart/updateUserCart",
  async ({ id, count }: UpdateUserCartParams) => {
    try {
      const dateUpate = await updateCartServer(id, count);
      return dateUpate;
    } catch (error) {
      console.log(error);
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "cart/clearUserCart",
  async () => {
    try {
      const dateclear = await clearCartServer();
      return dateclear;
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {}, // مفيش وظائف محلية إضافية
  extraReducers: (builder) => {
    // Add Cart Cases
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      // 🚨 التعديل: نستخدم action.payload.data و action.payload.numOfCartItems لتحديث الحالة بشكل صحيح
      if (action.payload) {
        state.cart = action.payload.data;
        state.numOfCartItems = action.payload.numOfCartItems;
      }
    });
    builder
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })
      // Logged Cart Cases
      .addCase(loggedUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loggedUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // استبدال الكارت الحالي
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(loggedUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      // Remove Cart Cases
      .addCase(removeUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // استبدال الكارت الحالي
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(removeUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      // Update Cart Cases
      .addCase(updateUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload; // استبدال الكارت الحالي
        state.numOfCartItems = action.payload.numOfCartItems;
      })
      .addCase(updateUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
      })
      // Clear Cart Cases
      .addCase(clearUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearUserCart.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = {
          cartId: null,
          data: null,
        };
        state.numOfCartItems = 0;
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || "Something went wrong";
      });
  },
});

export default cartSlice.reducer;
