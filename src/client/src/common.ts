
export type PromiseValue<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>

// configuration keys
export enum Config {
  HTTP_ENDPOINT,
  APP_URL,
  VERSION
}

// === Errors ===

export class UnknownError extends Error {}

export class UndefinedHashError extends Error {}
export class IncorrectPasswordError extends Error {}

// HttpClient
export class EndpointNotDefinedError extends Error {}

