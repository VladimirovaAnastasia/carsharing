import {createSlice} from '@reduxjs/toolkit';
import {fetchOrderById, putOrder, postOrder} from '../thunks/orderThunks';

const initialState = {
    currentStep: 0,
    steps: [
        {
            id: 0,
            isComplete: false,
        },
        {
            id: 1,
            isComplete: false,
        },
        {
            id: 2,
            isComplete: false,
        },
        {
            id: 3,
            isComplete: false,
        },
        {
            id: 4,
            isComplete: false,
        },
        {
            id: 5,
            isComplete: false,
        },
    ],
    city: null,
    cityId: null,
    cityName: null,
    point: null,
    pointName: null,
    category: null,
    car: null,
    model: null,
    colour: null,
    dateFrom: null,
    dateTo: null,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
    rate: null,
    rateId: null,
    duration: null,
    price: null,
    isLoading: false,
    error: null,
};

export const slice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        setActiveStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
            state.cityId = action.payload?.value;
            state.cityName = action.payload?.label;
        },
        setPoint: (state, action) => {
            state.point = action.payload;
            state.pointName = action.payload?.label;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setCar: (state, action) => {
            state.car = action.payload;
        },
        setCompleteStatus: (state, action) => {
            state.steps[action.payload.id].isComplete = action.payload.status;
        },
        setColour: (state, action) => {
            state.colour = action.payload;
        },
        setRate: (state, action) => {
            state.rate = action.payload.rateName;
            state.rateId = action.payload.id;
        },
        setAdditionalOption: (state, action) => {
            state[action.payload.id] = action.payload.val;
        },
        setDateFrom: (state, action) => {
            state.dateFrom = action.payload;
        },
        setDateTo: (state, action) => {
            state.dateTo = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        clearOrder: () => initialState,
        clearOrderWithoutCity: (state) => ({
            ...initialState,
            city: state.city,
            cityName: state.cityName,
            cityId: state.cityId,
        }),
        clearOrderWithoutCar: (state) => ({
            ...initialState,
            city: state.city,
            cityName: state.cityName,
            cityId: state.cityId,
            point: state.point,
            pointName: state.pointName,
            category: state.category,
            car: state.car,
            steps: state.steps,
            currentStep: state.currentStep,
        }),
    },
    extraReducers: {
        [fetchOrderById.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [fetchOrderById.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            error: null,
            ...action.payload,
        }),
        [fetchOrderById.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),
        [putOrder.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [putOrder.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            error: null,
            ...action.payload,
        }),
        [putOrder.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),
        [postOrder.pending]: (state) => ({
            ...state,
            isLoading: true,
            error: null,
        }),

        [postOrder.fulfilled]: (state, action) => ({
            ...state,
            isLoading: false,
            error: null,
            ...action.payload,
        }),
        [postOrder.rejected]: (state, action) => ({
            ...state,
            isLoading: false,
            error: action.payload,
        }),
    },
});

export const {
    setActiveStep,
    setCity,
    setPoint,
    setCategory,
    setCar,
    setCompleteStatus,
    setColour,
    setRate,
    setAdditionalOption,
    setDateFrom,
    setDateTo,
    setDuration,
    setPrice,
    clearOrder,
    clearOrderWithoutCity,
    clearOrderWithoutCar,
} = slice.actions;
export default slice.reducer;
