import api from './api';

export const getCars = () => {
    return api.get('db/car');
};

export const getCarsByCategory = (id) => {
    return api.get(`db/car?categoryId=${id}`);
};
