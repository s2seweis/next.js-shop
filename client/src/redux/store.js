import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger'
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import profileReducer from './slices/profileSlice';
import passwordReducer from './slices/passwordSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Define persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter', 'profile', 'password'], // Add the names of reducers you want to persist
};

// Wrap the counterReducer with persistReducer
const persistedReducer = persistReducer(
  persistConfig,
  counterReducer,
  profileReducer,
  passwordReducer
);

// Create the Redux store with persistedReducer
const store = configureStore({
  reducer: {
    counter: persistedReducer,
    products: productReducer, // This reducer won't be persisted
    profile: profileReducer, // This reducer won't be persisted
    password: passwordReducer, // This reducer won't be persisted
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
