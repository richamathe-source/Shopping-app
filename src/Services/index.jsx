
import axios from "axios";

const Base_URL = "https://fakestoreapi.com";

const api = axios.create({
    baseURL: Base_URL,
    headers: {
        "Content-Type": "application/json"
    },
});
api.interceptors.request.use(
    (config) => {
            const token = localStorage.getItem("token"); 
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        return config;
    },
    (error) => Promise.reject(error)
);

const request = async ({ url, method, data, params }) => {
    try {
        const response = await api({
            url,
            method,
            data,
            params,
        });

        return {
            status: response.status,
            msg: "success!",
            data: response.data,
        };
    } catch (err) {
        console.error(err);
        return {
            status: err.response?.status || 500,
            msg: err.response?.data?.message || "Something went wrong",
            data: null,
        };
    }
};


export const getRequest = (url, params = {}) => {
    return request({
        url,
        method : "GET",
        params,
    });
};

export const postRequest = (url, data = {}) => {
    return request({
        url,
        method : "POST",
        data,
    });
};

export const putRequest = (url,data = {}) => {
    return request ({
        url,
        method: "PUT",
        data,
    })
}

export const patchRequest = (url,data) => {
    return request ({
        url,
        method: "PATCH",
        data,
    });

}

export const deleteRequest = (url, params) => {
    return request ({
        url,
        method: "DELETE",
        params,
    })
} 