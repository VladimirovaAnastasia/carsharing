import {getCars, getCarsByCategory} from '../../service/carService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCars = createAsyncThunk('db/cars', async () => {
    const response = await getCars();
    return response.data.data;
});

export const fetchCarsByCategory = createAsyncThunk('db/cars-by-category', async (categoryId) => {
    const response = await getCarsByCategory(categoryId);
    return response.data.data;
});
