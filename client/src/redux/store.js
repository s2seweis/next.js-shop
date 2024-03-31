import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice'; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], // Add the names of reducers you want to persist
};

// Wrap the counterReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, counterReducer);

// Create the Redux store with persistedReducer
const store = configureStore({
  reducer: {
    counter: persistedReducer,
    products: productReducer // This reducer won't be persisted
  },
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
