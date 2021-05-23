import {createAsyncThunk} from '@reduxjs/toolkit';
import {getOrderStatus} from '../../service/orderStatusService';

export const fetchOrderStatus = createAsyncThunk('orderStatus/fetchOrderStatus', async () => {
    const response = await getOrderStatus();
    return response.data.data;
});
