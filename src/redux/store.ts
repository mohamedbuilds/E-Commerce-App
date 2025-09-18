import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    //
    cartSlice,
  },
});
// استنتاج نوع RootState من المتجر
export type RootState = ReturnType<typeof store.getState>;
// استنتاج نوع AppDispatch من المتجر
export type AppDispatch = typeof store.dispatch;
export default store;
