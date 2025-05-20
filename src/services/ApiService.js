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
        ApiService.vueInstance.axios.defaults.baseURL = 'http://localhost:3008/api';
        ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
        ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] = "application/json";
        ApiService.vueInstance.use(VueAxios, axios);
    }
    /**
     * @description set the default HTTP request headers
     */
    static setHeader() {
        console.log(JwtService.getToken(), "JwtService.getToken()");
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
        // if (JwtService.getUserId()) {
        //   params["userId"] = JwtService.getUserId();
        // }
        return ApiService.vueInstance.axios.get(resource, params);
    }
    /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string (optional)
   * @returns Promise<AxiosResponse>
   */
    static get(resource, slug = "") {
        // let rest = "";
        // if (JwtService.getUserId()) {
        //   const userId = JwtService.getUserId();
        //   if (slug) {
        //     // On remplace uniquement le premier '?' par '&' si présent dans le slug
        //     const formattedSlug = slug.replace(/^\?/, "&");
        //     rest = `/?userId=${userId}${formattedSlug}`;
        //   } else {
        //     rest = `/?userId=${userId}`;
        //   }
        // }
        // Construction finale de l'URL avec Axios GET
        const url = `${resource}${slug}`;
        return ApiService.vueInstance.axios.get(url);
    }
    /**
     * @description set the POST HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static post(resource, params) {
        // if (JwtService.getUser()) {
        //   params["userId"] = JwtService.getUser();
        // }
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
        // if (JwtService.getUser()) {
        //   params["userId"] = JwtService.getUser();
        // }
        return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
    }
    /**
     * @description Send the PUT HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static put(resource, params) {
        // if (JwtService.getUser()) {
        //   params["userId"] = JwtService.getUser();
        // }
        return ApiService.vueInstance.axios.put(`${resource}`, params);
    }
    /**
     * @description Send the PATCH HTTP request
     * @param resource: string
     * @param params: AxiosRequestConfig
     * @returns Promise<AxiosResponse>
     */
    static patch(resource, params) {
        // if (JwtService.getUser()) {
        //   params["userId"] = JwtService.getUser();
        // }
        return ApiService.vueInstance.axios.patch(`${resource}`, params);
    }
    /**
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