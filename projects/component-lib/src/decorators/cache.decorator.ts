const cacheMap = new Map<string, any>();

export const cacheClear: { [key: string]: { clear: () => void } } = {};


/** ttl stands for Time To Live (sets expiration time for cache) */
export function Cache(ttl: number = 0) { // millisecond
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const cacheKey = `${propertyKey.toString()}:${JSON.stringify(args)}`;
      if (cacheMap.has(cacheKey)) {
        const cachedItem = cacheMap.get(cacheKey);
        if (ttl > 0 && Date.now() - cachedItem.timestamp > ttl) {
          cacheMap.delete(cacheKey);
        } else {
          return cachedItem.value;
        }
      }
      const result = originalMethod.apply(this, args);
      cacheMap.set(cacheKey, { value: result, timestamp: Date.now() });
      return result;
    };

    cacheClear[propertyKey] = { clear: () => cacheMap.clear() };
  };
}
