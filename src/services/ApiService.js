import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/JwtService";
/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
    /**
     * @description property to share vue instance
     */
    static vueInstance;
    /**
     * @description initialize vue axios
     */
    static init(app) {
        ApiService.vueInstance = app;
        ApiService.vueInstance.use(VueAxios, axios);
        // ** const httpsAgent = new https.Agent({
        //  rejectUnauthorized: false, 
        // });
        // ApiService.vueInstance.axios.defaults.httpsAgent = httpsAgent;
        ApiService.vueInstance.axios.defaults.baseURL = 'http://localhost:3007/api';
        // ApiService.vueInstance.axios.defaults.baseURL ='https://back.romastechnologie.com/api';
        ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
        ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] = "application/json";
        ApiService.vueInstance.use(VueAxios, axios);
    }
    /**
     * @description set the default HTTP request headers
     */
    static setHeader() {
        ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `bearer ${JwtService.getToken()}`;
        ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    }
    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static query(resource, params) {
        return ApiService.vueInstance.axios.get(resource, params);
    }
    /**
     * @description send the GET HTTP request
     * @param resource: string
     * @param slug: string
     * @returns Promise<AxiosResponse>
     */
    static get(resource, slug = "") {
        return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
    }
    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static post(resource, params) {
        return ApiService.vueInstance.axios.post(`${resource}`, params);
    }
    /**
     * @description send the UPDATE HTTP request
     * @param resource: string
     * @param slug: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static update(resource, slug, params) {
        return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
    }
    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static put(resource, params) {
        return ApiService.vueInstance.axios.put(`${resource}`, params);
    }
    /**
     * @description Send the PATCH HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static patch(resource, params) {
        return ApiService.vueInstance.axios.patch(`${resource}`, params);
    }
    /**§
     * @description Send the DELETE HTTP request
     * @param resource: string
     * @returns Promise<AxiosResponse>
     */
    static delete(resource) {
        return ApiService.vueInstance.axios.delete(resource);
    }
}
export default ApiService;
//# sourceMappingURL=ApiService.js.map