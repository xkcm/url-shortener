import { LinkInfo } from "app-shared/typings"
import * as HttpClient from "../clients/HttpClient"
import { IncorrectPasswordError, UndefinedHashError, UnknownError } from "../common"

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

export async function getStats(hash: string, pass: string) {
  const result = await HttpClient.fetch<LinkInfo>({
    url: "link/stats",
    params: { hash, pass },
    method: "GET"
  })
  if (result.status === 200) return result.data
  if (result.status === 403) throw new IncorrectPasswordError({ pass, hash })
  if (result.status === 404) throw new UndefinedHashError({ hash })
  throw new UnknownError()
}

export async function deleteHash(hash: string, pass: string) {
  const result = await HttpClient.fetch({
    url: "link",
    method: "DELETE",
    data: { hash, pass }
  })
  if (result.status === 200) return true
  if (result.status === 403) throw new IncorrectPasswordError({ pass, hash })
  if (result.status === 404) throw new UndefinedHashError({ hash })
  throw new UnknownError()
}
