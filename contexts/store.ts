import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import landingPageSlice from './features/landingpage/landingpage';
import authenticationSlice from './features/authentication/authenticationSlice';
import currencyReducer from './features/currency/currencySlice';
import {getCookie } from 'cookies-next';

// Custom Middleware to check for accessToken in a Next.js environment
const accessTokenCheckMiddleware = (store: any) => (next: any) => (action: any) => {
	if (action.type === REHYDRATE) {
	  // Ensure we are in the client-side environment (browser)
	  if (typeof window !== 'undefined') {
		// Now safe to access localStorage
		const accessToken = localStorage.getItem('accessToken') || getCookie('accessToken');
  
		// If `accessToken` is missing, clear persisted state and reset store
		if (!accessToken) {
		  storage.removeItem('persist:root').then(() => {
			console.log('Persisted state cleared because accessToken is missing');
  
			// Dispatch an action to reset the app state
			store.dispatch({ type: 'RESET_APP_STATE' });
		  });
		}
	  }
	}
  
	return next(action);
  };
  

// Redux persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine your reducers
const combinedReducers = combineReducers({
  authentication: authenticationSlice,
  landingpage: landingPageSlice,
  currency: currencyReducer,
});

// Root reducer to reset the state when RESET_APP_STATE is dispatched
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP_STATE') {
    return undefined; // Reset the entire Redux state
  }
  return combinedReducers(state, action); // Use the combined reducers for normal actions
};

// Wrap the root reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(accessTokenCheckMiddleware),
});

// Types for the store and dispatch
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
