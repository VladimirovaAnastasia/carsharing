import api from './api';

export const getCities = () => {
    return api.get('db/city');
};

export const getCityPoints = (cityId) => {
    return api.get(`db/point?cityId=${cityId}`);
};
