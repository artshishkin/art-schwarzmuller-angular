import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string, len: number, method?: string): string {

    if (!method || method === 'SPLIT') {
      let shortenLen = (len) ? len : 3;
      const strings = value.split(/\s+/);
      let result = '';
      strings.forEach(str => result += `${str.substring(0, shortenLen)}_`);
      return result.substring(0, result.length - 1);

    } else if (method === 'TOTAL') {
      let shortenLen = (len) ? len : 10;
      return (value.length > shortenLen + 3) ?
        value.substring(0, shortenLen) + '...' :
        value;
    }
    return value;
  }

}
