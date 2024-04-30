import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import modalSlice from "./modalSlice.js";
import storyReducer from "./storySlice.js";
import layoutReducer from "./LayoutSlice.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    story: storyReducer,
    layout: layoutReducer,
  },
});

export default store;
