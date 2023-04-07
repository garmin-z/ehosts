// import { routers } from '@/routers';
// import { Message } from 'element-ui';
import axiosRetry from "axios-retry";
// import { authUtils } from '@/util/auth';
import axios, {
	AxiosError, AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, CancelTokenSource
} from "axios";
import { message } from "antd";

export interface IDataWithError<T> {
    data: T;
    code: number;
    msg: string;
}

export interface CancelTokenMap {
    [props: string]: CancelTokenSource[]
}

class HttpService {
	private http!: AxiosInstance;
	private cancelTokenMap: CancelTokenMap = {};
	private cancelToken: CancelTokenSource | null = null;

	constructor() {
		const controller = new AbortController();
		this.http = axios.create({
			baseURL: "http://192.168.1.111:16033/api",
			timeout: 60000,
		});

		// axiosRetry(this.http, {
		//     retries: 3,
		//     shouldResetTimeout: true,
		//     // 重复请求延迟
		//     retryDelay: (retryCount: number) => {
		//         return retryCount * 1000;
		//     },
		//     retryCondition: (error: AxiosError) => {
		//         if (error.message.includes('timeout')) {
		//             return true;
		//         }

		//         return !error.response || error.response.status !== 401;
		//     },
		// });

		this.addInterceptors(this.http);
	}

	setCancelKey(key: string): any {
		this.cancelToken = axios.CancelToken.source();
		if (!this.cancelTokenMap[key]) {
			this.cancelTokenMap[key] = [];
		}
		this.cancelTokenMap[key].push(this.cancelToken);
		return this;
	}

	setCancelToken(config: AxiosRequestConfig = {}) {
		config.cancelToken = this.cancelToken?.token;
		this.cancelToken = null;
		return config;
	}

	abort(key: string) {
		console.log(this.cancelTokenMap);

		while ((this.cancelTokenMap[key] || []).length > 0) {
			this.cancelTokenMap[key].shift()?.cancel();
		}
	}

	get<T>(url: string, config: AxiosRequestConfig = {}) {
		config = this.setCancelToken(config);
		return this.handleErrorWrapper<T>(this.http.get(url, config));
	}

	post<T>(url: string, param: unknown, config: AxiosRequestConfig = {}) {
		config = this.setCancelToken(config);
		return this.handleErrorWrapper<T>(this.http.post(url, param, config));
	}

	postDownload<T>(url: string, param: unknown) {
		const config = this.setCancelToken();
		return this.handleErrorWrapper<T>(this.http.post(url, param, { responseType: "arraybuffer", ...config }));
	}

	put<T>(url: string, param: unknown, config: AxiosRequestConfig = {}) {
		config = this.setCancelToken(config);
		return this.handleErrorWrapper<T>(this.http.put(url, param, config));
	}

	delete<T>(url: string, param: unknown, config: AxiosRequestConfig = {}) {
		config = this.setCancelToken(config);
		return this.handleErrorWrapper<T>(this.http.delete(url, { data: param, ...config }));
	}

	private addInterceptors(http: AxiosInstance) {
		// 一、请求拦截器
		http.interceptors.request.use((config) => {
			// 1、添加token和项目id
			// const token = authUtils.getToken();
			// if (token) {
			//     config.headers['Authorization'] = 'Bearer ' + token;
			//     config.headers['ProjectId'] = authUtils.getProjectId();
			// }
			// 2、验证请求状态码
			config.validateStatus = (status) => {
				switch (status) {
				case 401:
					const instance = message.error("用户信息过期，请重新登录");
					setTimeout(() => {
						message.destroy();
						// routers.push('/login');
					}, 1000);
					break;
				default:
					console.warn(`status= ${status}`);
					break;
				}
				return status >= 200 && status < 400;
			};

			return config;
		});

		// 二、响应拦截器
		http.interceptors.response.use(
			(response: AxiosResponse) => {
				return response;
			},
			(error) => {
				return Promise.reject(error);
			},
		);
	}

	private async handleErrorWrapper<T>(p: AxiosPromise): Promise<IDataWithError<T>> {
		return p
			.then((response) => {
				return response.data;
			})
			.catch((error: AxiosError) => {
				return error.response?.data;
			});
	}
}

export const request = new HttpService();
