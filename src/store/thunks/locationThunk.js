import {getCities, getCityPoints} from '../../service/cityService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk('db/city', async () => {
    const response = await getCities();
    return response.data.data;
});

export const fetchCityPoints = createAsyncThunk('db/points', async (cityId) => {
    const response = await getCityPoints(cityId);
    return response.data.data;
});
