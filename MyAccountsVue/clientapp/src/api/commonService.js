import axios from "axios";

axios.interceptors.request.use(function (config) {
    if (typeof window === "undefined") {
        return config;
    }
    const token = window.localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const commonService = {
    post(url, data) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, data)
                .then(response => {
                    resolve(response.data.data);
                }).catch(response => {
                    reject(response.data.errorMessage);
                });
        })
    },
    put(url, data) {
        return new Promise((resolve, reject) => {
            axios
                .put(url, data)
                .then(response => {
                    resolve(response.data.data);
                }).catch(response => {
                    reject(response.data.errorMessage);
                });
        })
    },
    get(url) {
        return new Promise((resolve, reject) => {
            axios
                .get(url)
                .then(response => {
                    resolve(response.data.data);
                }).catch(response => {
                    reject(response.data.errorMessage);
                });
        })
    },
    delete(url, data) {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, data)
                .then(response => {
                    resolve(response.data.data);
                }).catch(response => {
                    reject(response.data ? response.data.errorMessage : response.status);
                });
        })
    },
}

export default commonService;