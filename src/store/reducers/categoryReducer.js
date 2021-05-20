import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from '../thunks/categoryThunk';

export const slice = createSlice({
    name: 'category',
    initialState: {
        categories: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchCategories.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchCategories.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            categories: action.payload,
            error: null,
        }),
        [fetchCategories.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            categories: null,
            error: action.payload,
        }),
    },
});

export default slice.reducer;
