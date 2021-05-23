import api from './api';

export async function getOrderStatus() {
    return api.get('db/orderStatus');
}
