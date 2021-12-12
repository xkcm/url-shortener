
export function projectTypes<T extends Record<PropertyKey, any>>(data: T, scheme: Partial<{[key in keyof T]: (v: any) => T[key]}>): T{
  for (let [prop, fn] of Object.entries(scheme)) {
    if (!(prop in data)) continue
    Object.defineProperty(data, prop, {
      value: fn.call(fn, data[prop])
    })
  }
  return data
}
