import { request } from "../utils/request";


export function apiHosts() {
	// request.setCancelKey('login').post('/cjcx/send')
	return request.get("/hosts", {});
}
