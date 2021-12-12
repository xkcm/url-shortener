
import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config";

const ENDPOINT = config('HTTP.ENDPOINT')

const fetch = (opts: Partial<AxiosRequestConfig>) => {
  return axios({
    ...opts,
    baseURL: ENDPOINT,
  })
}

export { fetch };

