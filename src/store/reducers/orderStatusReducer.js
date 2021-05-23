import {createSlice} from '@reduxjs/toolkit';
import {fetchOrderStatus} from '../thunks/orderStatusThunks';

export const slice = createSlice({
    name: 'orderStatus',
    initialState: {
        status: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchOrderStatus.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchOrderStatus.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            status: action.payload,
            error: null,
        }),
        [fetchOrderStatus.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            status: null,
            error: action.payload,
        }),
    },
});

export default slice.reducer;
