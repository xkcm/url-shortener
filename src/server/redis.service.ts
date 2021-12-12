import { Inject, Injectable, Provider } from "@nestjs/common";
import { createClient } from "redis";

export const RedisConnectionProvider: Provider = {
  provide: 'REDIS_CONNECTION',
  useFactory: async () => {
    const client = await createClient()
    await client.connect()
    return client
  }
}

@Injectable()
export class RedisService{
  constructor(
    @Inject('REDIS_CONNECTION')
    private client: ReturnType<typeof createClient>
  ){}

  public set(key: string, data: string){
    return this.client.set(key, data)
  }
  public setPlainObject(key: string, object: Record<PropertyKey, string | boolean | number>){
    return Promise.all(
      Object.entries(object).map(
        ([field, value]) => this.client.hSet(key, field, String(value))
      )
    ).then(vals => vals.reduce<boolean>((p, c) => p && Boolean(c), true))
  }
  public setObjectField(key: string, field: string, value: string | boolean | number) {
    return this.client.hSet(key, field, String(value))
  }
  public exists(key: string){
    return this.client.exists(key)
  }
  public get(key: string){
    return this.client.get(key)
  }
  public getPlainObject<T extends {[key: string]: any}>(key: string){
    return this.client.hGetAll(key) as Promise<T>
  }
  public getObjectField(key: string, field: string){
    return this.client.hGet(key, field)
  }
  public async modify(key: string, modifier: <T>(val: T) => T){
    return this.set(key, modifier.apply(modifier, await this.get(key)))
  }
  public async modifyPlainObject(key: string, modifier: <T>(val: T) => T){
    return this.setPlainObject(key, modifier.apply(modifier, await this.getPlainObject(key)))
  }
  public async modifyObjectField(key: string, field: string, modifier: <T>(val: T) => T) {
    return this.setObjectField(key, field, modifier.apply(modifier, await this.getObjectField(key, field)))
  }
  public remove(key: string) {
    return this.client.del(key)
  }
  public removeObjectField(key: string, field: string) {
    return this.client.hDel(key, field)
  }
}