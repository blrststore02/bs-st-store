"use client";

import axios, { AxiosResponse } from 'axios';
import { RestHttpHeaders } from './restHeaders.service';
import { toast } from '@/components/bsToast';

const protocol = process.env.NEXT_PUBLIC_PROTOCOL || 'http';
const host = process.env.NEXT_PUBLIC_HOST || 'localhost';
const port = process.env.NEXT_PUBLIC_PORT || '9000';
const service = process.env.NEXT_PUBLIC_SERVICE || '/api/v1';
const contentType = process.env.NEXT_PUBLIC_CONTENT_TYPE || 'application/json';
const requestTimeout = process.env.NEXT_PUBLIC_TIME_OUT || '12000';

export const RestEndPService = () => {
    const headers = RestHttpHeaders();
    const axiosInstance = axios.create({
        baseURL: `${protocol}://${host}:${port}${service}`,
        timeout: parseInt(requestTimeout)
    });

    // axiosInstance.defaults.headers.common.Authorization = headers.get() || null;
    // axiosInstance.defaults.headers.Accept = contentType;

    axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization = headers.get() || null;
        config.headers.Accept = contentType;
        config.headers['Content-Type'] = contentType;
        return config;
    });

    axiosInstance.interceptors.response.use((response) => {
        return Promise.resolve(response);
    }, async function (error) {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // toast.notify(`Please login again. session expired!!!`);
            axios.defaults.headers.common.Authorization = null;
            headers.remove();
            originalRequest._retry = true;
            return axiosInstance(originalRequest);
        }
        // toast.notify(error.message);
        return Promise.reject(error);
    });


    const get = (path: string, params?: any): Promise<AxiosResponse> => axiosInstance.get(path, { params });
    const post = async (path: string, data: any, headers?:any): Promise<AxiosResponse> => await axiosInstance.post(path, data, headers || null);

    return { get, post };
}
