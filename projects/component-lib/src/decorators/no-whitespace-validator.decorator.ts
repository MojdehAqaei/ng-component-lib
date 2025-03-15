export const noWhitespace = (validateOnly: boolean) => {
  return (target: any, propertyName: string) => {
    let value: any;
    const errorKey = `${propertyName}Error`;

    Object.defineProperty(target, propertyName, {
      enumerable: true,
      configurable: true,
      get: (): string => value,
      set: (newVal: string) => {
        const noWhiteSpace: string = newVal.replace(/\s/g, '');
        /** if validateOnly is set to true, it only throws an error.
         * and if it's set to false, it corrects the value. in other words, it does not allow invalid values */
        value = validateOnly ? newVal : noWhiteSpace;

        if (noWhiteSpace !== newVal) {
          // throw new Error(`Field ${propertyName} contains whitespace.`);
        }
      }
    });

    Object.defineProperty(target, errorKey, {
      get: function () {
        return value && value !== value.replace(/\s/g, '') ? `Field ${propertyName} contains whitespace.` : '';
      },
      enumerable: true,
      configurable: true
    });
  }
}
