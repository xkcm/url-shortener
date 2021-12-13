
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "app-shared/config";
import { Config, EndpointNotDefinedError } from "../common";

const fetch = async <T = any>(opts: Partial<AxiosRequestConfig>) => {
  const base = config<string>(Config.HTTP_ENDPOINT)
  if (!base) throw new EndpointNotDefinedError()
  let result: AxiosResponse<T> = null as any
  try {
    result = await axios.request<T>({
      ...opts,
      baseURL: base,
    })
  } catch(error: any) {
    result = error.response
  } finally {
    return result
  }
}

export { fetch };

