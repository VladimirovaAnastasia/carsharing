import {createSlice} from '@reduxjs/toolkit';
import {fetchCars, fetchCarsByCategory} from '../thunks/carThunk';

export const slice = createSlice({
    name: 'car',
    initialState: {
        cars: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCars.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchCars.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            cars: action.payload,
            error: null,
        }),
        [fetchCars.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            cars: null,
            error: action.payload,
        }),
        [fetchCarsByCategory.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        [fetchCarsByCategory.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            cars: action.payload,
            error: null,
        }),
        [fetchCarsByCategory.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            cars: null,
            error: action.payload,
        }),
    },
});

export default slice.reducer;
