export const stepsSelector = (state) => {
    return state.order.steps;
};

export const currentStepSelector = (state) => {
    return state.order.currentStep;
};

export const cityNameSelector = (state) => {
    return state.order.cityName;
};

export const citySelector = (state) => {
    return state.order.city;
};

export const pointNameSelector = (state) => {
    return state.order.pointName;
};

export const pointSelector = (state) => {
    return state.order.point;
};
