import api from './api';

export async function getOrderById(id) {
    return api.get(`db/order/${id}`);
}

export async function orderPut(body) {
    return api.put(`db/order/${body.id}`, body);
}

export async function orderPost(body) {
    return api.post('db/order', body);
}
