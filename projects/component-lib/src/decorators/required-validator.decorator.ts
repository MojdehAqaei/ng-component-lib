export const Required = () => {
  return(target: any, propertyName: string) => {
    let value: any;
    const errorKey = `${propertyName}Error`;

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      configurable: true,
      get: (): string => value,
      set: function(newVal: string) {
        value = newVal;

        if (!newVal) {
          // throw new Error(`Field ${propertyName} is required.`);
        }
      }
    });

    Object.defineProperty(target, errorKey, {
      get: function () {
        return !value ? `Field ${propertyName} is required.` : '';
      },
      enumerable: true,
      configurable: true
    });
  }
}
