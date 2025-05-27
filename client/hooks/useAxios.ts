import axios from 'axios';

const useAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // replace with your backend URL
  withCredentials: true, // if using cookies
});

export default useAxios;
