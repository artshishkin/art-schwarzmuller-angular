import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {

    const letters = value.split('');
    const reversedLetters = letters.reverse();
    return reversedLetters.join('');
  }

}
