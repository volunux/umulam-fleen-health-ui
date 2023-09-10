import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any[], key: string): any[] {
    if (!Array.isArray(array) || !key) {
      return array;
    }

    return array.slice().sort((a, b): number => {
      if (a[key] < b[key]) {
        return -1;
      } else if (a[key] > b[key]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
