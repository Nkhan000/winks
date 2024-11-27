import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

import storage from "redux-persist/lib/storage"; // defaults to local storage
import ChatReducer from "./ChatSlice";

const rootReducer = combineReducers({
  chat: ChatReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check if you're getting non-serializable warnings
    }),
});

const persistor = persistStore(store);
export { store, persistor };
