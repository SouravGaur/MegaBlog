import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./authSlice";

const store = configureStore({
  reducer: Reducer,
});
export default store;
