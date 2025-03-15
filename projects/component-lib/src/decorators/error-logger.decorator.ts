export const ErrorLogger = (serverEndpoint?: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: any) {
        console.error(`Error in method ${propertyKey}:`);

        // Log the error to a server
        if (serverEndpoint) {
          await fetch(serverEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ method: propertyKey, error: <Error>error }),
          });
        }

        throw error;
      }
    };
    return descriptor;
  }
}
