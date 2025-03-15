import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ClObjectToString',
  standalone: true
})
export class ClObjectToStringPipe implements PipeTransform {

  transform(value: any, ...args: any[]): string {
    return value ? args.reduce((previousValue, key)=> previousValue + ' ' + this.nestedObjectValue(value, key) , '') : '';
  }

  nestedObjectValue(object: any, value: string){
     const nestedObjectKeys = value?.split('.');
     let tempVal = object;
     for (let item of nestedObjectKeys) {
       tempVal = tempVal ? tempVal[item] : item;
       if (!tempVal)
         break;
     }
     return tempVal;
  }
}
