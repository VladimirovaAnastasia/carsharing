import {createSlice} from '@reduxjs/toolkit';
import {fetchCities, fetchCityPoints} from '../thunks/locationThunk';

const initialState = {
    cities: null,
    cityPoints: null,
    isLoading: false,
    error: null,
};

export const slice = createSlice({
    name: 'location',
    initialState: initialState,
    reducers: {
        clearCityOptions: () => initialState,
    },
    extraReducers: {
        [fetchCities.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),
        [fetchCities.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            cities: action.payload,
            error: null,
        }),
        [fetchCities.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            cities: null,
            error: action.payload,
        }),
        [fetchCityPoints.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchCityPoints.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            cityPoints: action.payload,
            error: null,
        }),
        [fetchCityPoints.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            cityPoints: null,
            error: action.payload,
        }),
    },
});
export const {clearCityOptions} = slice.actions;
export default slice.reducer;
