import {getCategories} from '../../service/categoryService';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchCategories = createAsyncThunk('db/category', async () => {
    const response = await getCategories();
    return response.data.data;
});
