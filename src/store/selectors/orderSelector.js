export const orderSelector = (state) => state.order;
export const orderInfoSelector = (state) => state.order.data;
export const stepsSelector = (state) => state.order.steps;
export const currentStepSelector = (state) => state.order.currentStep;
export const cityNameSelector = (state) => state.order.cityId.name;
export const citySelector = (state) => state.order.city;
export const pointNameSelector = (state) => state.order.pointName;
export const pointSelector = (state) => state.order.point;
export const categorySelector = (state) => state.order.category;
export const carSelector = (state) => state.order.car;
export const orderStatusIdSelector = (state) => state.order?.data?.id;
