import api from '../../service/api';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCities = createAsyncThunk('db/city', async () => {
    const response = await api.getCities();
    return response.data.data;
});

export const fetchCityPoints = createAsyncThunk('db/points', async (cityId) => {
    const response = await api.getCityPoints(cityId);
    return response.data.data;
});
