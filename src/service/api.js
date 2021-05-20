import * as axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-factory.simbirsoft1.com/api/',
    headers: {'X-Api-Factory-Application-Id': process.env.REACT_APP_API_FACTORY},
});

export default api;
