import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../Redux/Slices/authSlice";
import productReducer from "../Redux/Slices/productSlice";
import cartReducer from "../Redux/Slices/cartSlice";

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

const productPersistConfig = {
  key: "product",
  storage,
  whitelist: ["productsByCategory"], 
};
const persistedProductReducer = persistReducer(productPersistConfig, productReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: persistedProductReducer, 
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);