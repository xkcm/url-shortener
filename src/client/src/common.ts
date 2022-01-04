
export type PromiseValue<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>

// configuration keys
export enum Config {
  HTTP_ENDPOINT,
  APP_URL,
  VERSION
}

// === Errors ===

export class UnknownError extends Error {
  constructor(){
    super("Unknown error occurred")
  }
}

export class UndefinedHashError extends Error {
  constructor(opts: { hash: string }){
    super(`Hash '${opts.hash}' does not exist`)
  }
}
export class IncorrectPasswordError extends Error {
  constructor(opts: { pass: string, hash: string }){
    super(`Password '${opts.pass}' for hash '${opts.hash}' is incorrect`)
  }
}

export class HashNotProvidedError extends Error {
  constructor(){
    super("Hash was not provided")
  }
}

// HttpClient
export class EndpointNotDefinedError extends Error {}

