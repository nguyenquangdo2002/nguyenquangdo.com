import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index.js'; // Ensure the path is correct


const store = configureStore({
    reducer: {
        auth: authReducer,

    }
})
export default store; 