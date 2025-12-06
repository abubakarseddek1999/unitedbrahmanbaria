import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:8080/api/v1'
  baseURL: 'https://backend-two-omega-91.vercel.app/api/v1'
})

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;