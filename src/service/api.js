import React from 'react';
import axios from 'axios';

const baseURL = 'https://api-factory.simbirsoft1.com/api/';
const config = {
    headers: {'X-Api-Factory-Application-Id': process.env.REACT_APP_API_FACTORY},
};

const fetchInfo = async (url) => {
    return axios.get(baseURL + url, config);
};

export default {
    getCities: () => fetchInfo('db/city'),
    getCityPoints: (cityId) => fetchInfo(`db/point?cityId=${cityId}`),
};
