import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { UserAuthApi } from '../services/UserAuthApi'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        [UserAuthApi.reducerPath]: UserAuthApi.reducer,
        auth: authReducer,
        // user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(UserAuthApi.middleware),
})
setupListeners(store.dispatch)