export const Max = (limit: number, validateOnly: boolean) => {
  return (target: any, propertyName: string) => {
    let value: number;
    const errorKey = `${propertyName}Error`;

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      configurable: true,
      get: (): number => value,
      set: (newVal: number) => {

        /** if validateOnly is set to true, it only throws an error.
         * and if it's set to false, it corrects the value. in other words, it does not allow invalid values */
        value = validateOnly ? newVal : newVal < limit ? newVal : limit;

        if (newVal > limit) {
          // throw new Error(`Field ${propertyName} must be lower than ${limit}!`);
        }
      }
    });

    Object.defineProperty(target, errorKey, {
      get: function () {
        return value && value > limit ? `Field ${propertyName} must be lower than ${limit}!` : '';
      },
      enumerable: true,
      configurable: true
    });
  };
}
