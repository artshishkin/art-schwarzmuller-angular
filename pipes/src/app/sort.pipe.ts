import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})
export class SortPipe implements PipeTransform {

  transform(value: any, field: string, order?: string): any {
    if (value.length === 0) return value;

    if (!order) order = 'ASC';

    let sign = 1;
    if (order === 'DESC')
      sign = -1;

    value.sort((a: any, b: any) => {
      return a[field] > b[field] ? sign : -sign;
    });

    return value;
  }

}
