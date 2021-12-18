
// configuration keys
export enum Config {
  HTTP_ENDPOINT,
  APP_URL,
  VERSION
}

// === Errors ===

export class UndefinedHashError extends Error {}
export class IncorrectPasswordError extends Error {}

// HttpClient
export class EndpointNotDefinedError extends Error {}

