import axios from "axios";

export const $api = axios.create({
  baseURL: 'https://hacker-news.firebaseio.com/v0/'
});

export const $serverAPI = axios.create({
  baseURL: 'http://localhost:5000/api/'
})


$serverAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);