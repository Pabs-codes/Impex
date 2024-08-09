import axios, { AxiosInstance } from "axios";

let axiosI:any = null;

const getAxiosInstance = () => {
  if (!axiosI) {
    axiosI = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  return axiosI;
};

const axiosInstance:AxiosInstance = getAxiosInstance();

export default axiosInstance;


