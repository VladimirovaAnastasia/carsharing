import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'order',
    initialState: {
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
        ],
        city: null,
        cityId: null,
        cityName: null,
        point: null,
        pointName: null,
        model: null,
        colour: null,
        dateFrom: null,
        dateTo: null,
        additionalServices: null,
        rate: null,
        fullTank: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setActiveStep: (state, action) => {
            state.currentStep = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setCityId: (state, action) => {
            state.cityId = action.payload;
        },
        setCityName: (state, action) => {
            state.cityName = action.payload;
        },
        setPoint: (state, action) => {
            state.point = action.payload;
        },
        setPointName: (state, action) => {
            state.pointName = action.payload;
        },
        setCompleteStatus: (state, action) => {
            state.steps[action.payload.id].isComplete = action.payload.status;
        },
    },
});

export const {
    setActiveStep,
    setCityId,
    setCityName,
    setCity,
    setPointName,
    setPoint,
    setCompleteStatus,
} = slice.actions;
export default slice.reducer;
