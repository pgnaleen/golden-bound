import { httpClient } from "@/lib/http-client";

import type { AxiosRequestConfig } from "axios";

export abstract class BaseApiService {
  protected readonly baseEndpoint: string;

  constructor(baseEndpoint: string) {
    this.baseEndpoint = baseEndpoint;
  }

  protected async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;

      return await httpClient.get<T>(url, config);
    } catch (error: any) {
      throw new Error(error.message || "GET request failed");
    }
  }

  protected async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;
      return await httpClient.post<T>(url, data, config);
    } catch (error: any) {
      throw new Error(error.message || "POST request failed");
    }
  }

  protected async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;
      return await httpClient.put<T>(url, data, config);
    } catch (error: any) {
      throw new Error(error.message || "PUT request failed");
    }
  }

  protected async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;
      return await httpClient.delete<T>(url, config);
    } catch (error: any) {
      throw new Error(error.message || "DELETE request failed");
    }
  }

  protected async patch<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const url = `${this.baseEndpoint}${endpoint}`;
      return await httpClient.patch<T>(url, data, config);
    } catch (error: any) {
      throw new Error(error.message || "PATCH request failed");
    }
  }
}
