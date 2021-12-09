
const configMap: Map<string, any> = new Map()

export async function initiateConfig(){
  const env_mode = process.env.NODE_ENV || 'development'
  config('ENVIRONMENT', env_mode)
  config('DEVELOPMENT', env_mode === 'development')
  config('PRODUCTION', env_mode === 'production')
  config('HTTP:PORT', process.env.PORT || 3000)
}

export function config<T = any>(key: string): T
export function config(key: string, val: any): boolean
export function config(key: string, val?: any): any {
  if (val) {
    try{
      configMap.set(key, val)
      return true
    } catch (e) { return false }
  } else return configMap.get(key)
}