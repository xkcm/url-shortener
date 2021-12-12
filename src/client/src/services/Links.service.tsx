import * as HttpClient from "../clients/HttpClient"
import { LinkInfo } from "app-shared/typings"

export async function fetchHash(destination: string) {
  const endpoint_url = "link"
  const data = { destination }
  const result = await HttpClient.fetch<LinkInfo>({
    url: endpoint_url,
    data,
    method: 'POST'
  })
  return result.data
}
