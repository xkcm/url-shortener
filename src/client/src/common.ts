
// configuration keys
export enum Config {
  HTTP_ENDPOINT,
  APP_URL
}

// errors

// HashRedirect
export class UndefinedHashError extends Error {}

// HttpClient
export class EndpointNotDefinedError extends Error {}

