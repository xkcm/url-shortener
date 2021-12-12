
export function fallback<T extends (args: any) => any>(callback: T, fallbackValue: ReturnType<T>): ReturnType<T>{
  try {
    return callback.call(callback, fallbackValue)
  } catch (error) {
    return fallbackValue
  }
}

export function partition<T extends any[]>(array: T, size: number): T[]{
  return array.reduce((prev, cur, index) => {
    const i = index % size
    const a = i == 0 ? [] : prev[prev.length-1]
    if (i == 0) prev.push(a)
    a.push(cur)
    return prev
  }, [])
}
