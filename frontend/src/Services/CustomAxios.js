import axios from 'axios';
import AuthService from "./AuthService";

const customAxios = axios.create({
    //FOR PRODUCTION
    //timeout: 10000,
});

const requestHandler = request => {
    const token = AuthService.getToken();
    if (token) request.headers.Authorization = 'Bearer ' + token ;
    return request;
};

const responseHandler = response => {
    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};
customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);

export default customAxios;