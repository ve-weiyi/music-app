import axios, {type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig} from "axios";


const requests = axios.create({
    baseURL: "/",
    timeout: 10000,
    // 请求头
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
});

const HeaderAuthorization = "Authorization";
const HeaderUid = "Uid";
const HeaderToken = "Token";
const HeaderTerminal = "Terminal";
const HeaderTimestamp = "Timestamp";

// 请求拦截器
requests.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 未登录时的加密方式
        config.headers = Object.assign({}, config.headers, {
            "Model-Type":"PHONE",
            "App-name": "nebula",
            // "account":"36de8e994640236e0b6f7e74000ac7bcb7ff5c84",
            "X-Auth-Token": "f55b40f3faff1f22f76ea1bbf8b940ffa37dd18ce72f04ed",
            "Gtoken":"cd6f59dcb68e54a69c6680b091747934"
        
            // "X-Auth-Token":"2204eb14ed08c25fb35e73ad9a53b81b8f2eb811263ff104",
            // "Gtoken":"cc8cae523dfce3790997580bac59a9a2"
        });

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// 配置响应拦截器
requests.interceptors.response.use(
    (response: AxiosResponse) => {
        switch (response.data.code) {
            case 0:
                break;
            case 200:
                break;
            case 500:
            default:
                return Promise.reject(response.data.message);
        }
        return response.data;
    },
    (error: AxiosError) => {
        let {message} = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substring(message.length - 3) + "异常";
        }
        return Promise.reject(error);
    }
);

// 对外暴露
export default requests;
