"use client";

import axios, { AxiosResponse } from 'axios';

const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || '8010';
const service = process.env.NEXT_PUBLIC_SERVICE || '/api/v1/reader/';
const contentType = process.env.NEXT_PUBLIC_CONTENT_TYPE || 'application/json';
const requestTimeout = process.env.NEXT_PUBLIC_TIME_OUT || '12000';

export const RestEndPService = () => {
    const axiosInstance = axios.create({
        baseURL: `${protocol}://${host}:${port}${service}`,
        timeout: parseInt(requestTimeout)
    });

    axiosInstance.interceptors.request.use(function (config) {
        config.headers.Accept = contentType;
        config.headers['Content-Type'] = contentType;
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        return Promise.resolve(response);
    }, async function (error) {
        return Promise.reject(error);
    });

    const get = (path: string, params?: any): Promise<AxiosResponse> => axiosInstance.get(path, { params });

    return { get };
}
