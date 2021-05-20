import {createAsyncThunk} from '@reduxjs/toolkit';
import {getRates} from '../../service/rateService';

export const fetchRates = createAsyncThunk('db/rate', async () => {
    const response = await getRates();
    return response.data.data;
});
