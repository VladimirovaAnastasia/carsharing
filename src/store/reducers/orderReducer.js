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
    cityId: {
        name: null,
        id: null,
    },
    pointId: {
        address: null,
        name: null,
        id: null,
    },
    carId: {
        name: null,
        id: null,
    },
    selectedCategory: {
        name: null,
        id: null,
    },
    rateId: {
        unit: null,
        name: null,
        id: null,
    },
    orderStatusId: {
        name: null,
        id: null,
    },
    color: null,
    city: null,
    cityName: null,
    point: null,
    pointName: null,
    category: null,
    car: null,
    model: null,
    dateFrom: null,
    dateTo: null,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
    rate: null,
    duration: null,
    price: null,
    isLoading: false,
    error: null,
    data: null,
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
            state.cityId.id = action.payload?.value;
            state.cityId.name = action.payload?.label;
        },
        setPoint: (state, action) => {
            state.point = action.payload?.pointOption;
            state.pointName = action.payload?.point.address;
            state.pointId.id = action.payload?.point.id;
            state.pointId.name = action.payload?.point.name;
            state.pointId.address = action.payload?.point.address;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
            state.selectedCategory.name = action.payload?.name;
            state.selectedCategory.id = action.payload?.id;
        },
        setCar: (state, action) => {
            state.car = action.payload;
            state.carId.name = action.payload?.name;
            state.carId.id = action.payload?.id;
        },
        setCompleteStatus: (state, action) => {
            state.steps[action.payload.id].isComplete = action.payload.status;
        },
        setColor: (state, action) => {
            state.color = action.payload;
        },
        setRate: (state, action) => {
            state.rate = action.payload.rateName;
            state.rateId.id = action.payload.activeRate.id;
            state.rateId.unit = action.payload.activeRate.rateTypeId.unit;
            state.rateId.name = action.payload.activeRate.rateTypeId.name;
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
            pointId: state.pointId,
            carId: state.carId,
            category: state.category,
            selectedCategory: state.selectedCategory,
            car: state.car,
            steps: state.steps,
            currentStep: state.currentStep,
        }),
        setOrderStatusId: (state, action) => {
            state.orderStatusId = action.payload;
        },
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
    setColor,
    setRate,
    setAdditionalOption,
    setDateFrom,
    setDateTo,
    setDuration,
    setPrice,
    clearOrder,
    clearOrderWithoutCity,
    clearOrderWithoutCar,
    setOrderStatusId,
} = slice.actions;
export default slice.reducer;
