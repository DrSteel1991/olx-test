import axios from "axios";
import type { AxiosInstance } from "axios";

const AxiosClient = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: "https://www.olx.com.lb/api",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return instance;
};

export default AxiosClient;
