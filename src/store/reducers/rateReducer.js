import {createSlice} from '@reduxjs/toolkit';
import {fetchRates} from '../thunks/rateThunks';

export const slice = createSlice({
    name: 'rate',
    initialState: {
        rates: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchRates.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchRates.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            rates: action.payload,
            error: null,
        }),
        [fetchRates.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            rates: null,
            error: action.payload,
        }),
    },
});

export default slice.reducer;
