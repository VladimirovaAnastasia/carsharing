import {configureStore} from '@reduxjs/toolkit';
import orderReducer from './reducers/orderReducer';
import locationReducer from './reducers/locationReducer';
import categoryReducer from './reducers/categoryReducer';
import carReducer from './reducers/carReducer';
import rateReducer from './reducers/rateReducer';

export default configureStore({
    reducer: {
        order: orderReducer,
        location: locationReducer,
        category: categoryReducer,
        car: carReducer,
        rate: rateReducer,
    },
});
