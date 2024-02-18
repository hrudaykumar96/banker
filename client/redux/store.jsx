import { configureStore } from "@reduxjs/toolkit";
import userdataslice from "./getdata";
const store = configureStore({
  reducer: {
    userdata: userdataslice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;