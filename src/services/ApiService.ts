import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/JwtService";
import { User } from "./auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL = 'http://localhost:3006/api';
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] = "application/json";
    ApiService.vueInstance.use(VueAxios, axios);
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    console.log(JwtService.getToken(), "JwtService.getToken()")
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] = "application/json";
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
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
  public static get(resource: string, slug: string = ""): Promise<AxiosResponse> {
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
  public static post(resource: string, params: any): Promise<AxiosResponse> {
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
  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
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
  public static put(resource: string, params: any): Promise<AxiosResponse> {
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
  public static patch(resource: string, params: any): Promise<AxiosResponse> {
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
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }

  /**
   * @description Resilier un contrat
   * @param id: number - L'ID du contrat à résilier
   * @returns Promise<AxiosResponse>
   */
  public static resilierContrat(id: number): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`/contrats/${id}/resilier`, {
      estResilie: true,
    });
  }
}

export default ApiService;