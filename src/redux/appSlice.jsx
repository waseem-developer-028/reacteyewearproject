import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "apps",
  initialState: {
    isVerifyOTP: false,
    verifyOTPEmail: "",
    cartCount: undefined,
    selectedAddress: {},
  },
  reducers: {
    setVerifyOTP: (state, action) => {
      state.isVerifyOTP = action.payload.isVerify;
      state.verifyOTPEmail = action.payload.email;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { setVerifyOTP, setCartCount, setSelectedAddress } = appSlice.actions;

export default appSlice.reducer;
