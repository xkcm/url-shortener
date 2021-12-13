import { LinkInfo } from "app-shared/typings"
import * as HttpClient from "../clients/HttpClient"

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

export async function getDestination(hash: string) {
  const result = await HttpClient.fetch<{ destination: string }>({
    url: "link",
    method: 'GET',
    params: { hash },
  })
  if (result.status === 404) return null
  return result.data.destination
}
