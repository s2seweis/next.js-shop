// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
// import counterReducer from './slices/counterSlice';
// import productReducer from './slices/productSlice';
// import profileReducer from './slices/profileSlice';
// import passwordReducer from './slices/passwordSlice';
// import preferenceReducer from './slices/userPreferenceSlice';

// // Define persist config
// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['counter', 'profile', 'password'] // Add the names of reducers you want to persist
// };

// // Combine reducers
// const rootReducer = combineReducers({
//   counter: counterReducer,
//   products: productReducer,
//   profile: profileReducer,
//   password: passwordReducer,
//   preference: preferenceReducer
// });

// // Wrap rootReducer with persistReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Create store
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
// });

// // Create persistor
// const persistor = persistStore(store);

// // Define types

// // ### - correct
// export type RootState = ReturnType<typeof store.getState>;
// // ### - correct
// export type AppDispatch = typeof store.dispatch;
// // ### - ?
// export type AppStore = typeof store;

// export { store, persistor };

// // e.g. 

// // https://codesandbox.io/p/sandbox/redux-toolkit-typescript-27t5c?file=%2Fsrc%2Fstore%2Fstore.ts%3A2%2C11