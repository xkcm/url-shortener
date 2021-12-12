
import axios, { AxiosRequestConfig } from "axios";
import { config } from "app-shared/config";
import { EndpointNotDefinedError } from "../errors/HttpClient.errors";
import { Config } from "../common";

const fetch = <T = any>(opts: Partial<AxiosRequestConfig>) => {
  const base = config<string>(Config.HTTP_ENDPOINT)
  if (!base) throw new EndpointNotDefinedError()
  return axios.request<T>({
    ...opts,
    baseURL: base,
  })
}

export { fetch };

