import api from './api';

export const getCategories = () => {
    return api.get('db/category');
};
