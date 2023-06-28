import axios from 'axios';
import { getAccessToken } from './apis/AuthAPI';

export const HttpRequestInterceptor = axios.interceptors.request.use(
    (config) => {
        const token = JSON.parse(
            localStorage.getItem('blogUser') || 'null'
        )?.accessToken;
        if (config && config.headers) {
            if (config.url !== 'auth/login' && config.url !== 'auth/token') {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export const HttpResponseInterceptor = axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const originalRequest = error.config;

        if (originalRequest.url === 'auth/token') {
            localStorage.setItem('blogUser', 'null');
            window.location.href = '/';
        } else if (originalRequest.url === 'auth/login') {
            return null;
        }

        if (
            (error.response.status === 403 || error.response.status === 401) &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            const refreshToken = JSON.parse(
                localStorage.getItem('blogUser') || 'null'
            )?.refreshToken;

            return getAccessToken(refreshToken)
                .then((res) => {
                    if (res) {
                        const usr = JSON.parse(
                            localStorage.getItem('blogUser') || 'null'
                        );
                        usr.accessToken = res?.data?.accessToken;
                        localStorage.setItem(
                            'blogUser',
                            JSON.stringify(usr || 'null')
                        );
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + res.data?.accessToken;
                        return axios(originalRequest);
                    }
                })
                .catch((error) => {
                    if (
                        error.response.status === 403 ||
                        error.response.status === 401
                    ) {
                        localStorage.setItem('blogUser', 'null');
                        window.location.href = '/';
                    }
                });
        } else if (
            error.response.status === 403 ||
            error.response.status === 401
        ) {
            localStorage.setItem('blogUser', 'null');
            window.location.href = '/';
        }

        return Promise.reject(error);
    }
);
