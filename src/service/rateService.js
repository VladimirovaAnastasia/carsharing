import api from './api';

export const getRates = () => {
    return api.get('db/rate');
};
