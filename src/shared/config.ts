
const configMap: Map<PropertyKey, any> = new Map()

export function initiateConfiguration(base: [PropertyKey, any][] = []){
  try {
    const env_mode = process.env.NODE_ENV || 'development'
    config('ENVIRONMENT', env_mode)
    config('DEVELOPMENT', env_mode === 'development')
    config('PRODUCTION', env_mode === 'production')
    base.forEach(([key, value]) => config(key, value))
    return true
  } catch (e) { return false }
}

export function config<T = any>(key: PropertyKey): T
export function config(key: PropertyKey, val: any): boolean
export function config(key: PropertyKey, val?: any): any {
  if (val) {
    try {
      configMap.set(key, val)
      return true
    } catch (e) { return false }
  } else return configMap.get(key) ?? process.env[String(key)]
}
