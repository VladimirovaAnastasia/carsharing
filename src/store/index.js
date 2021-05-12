import {configureStore} from '@reduxjs/toolkit';
import orderReducer from './reducers/orderReducer';
import locationReducer from './reducers/locationReducer';

export default configureStore({
    reducer: {
        order: orderReducer,
        location: locationReducer,
    },
});
