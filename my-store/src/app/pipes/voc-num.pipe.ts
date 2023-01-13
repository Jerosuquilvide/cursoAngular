import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vocNum'
})
export class VocNumPipe implements PipeTransform {

  transform(value: string): string{
    let newString = value.replace(/a/gi, '0');
    newString = newString.replace(/e/gi, '1');
    newString = newString.replace(/i/gi, '2');
    newString = newString.replace(/o/gi, '3');
    newString = newString.replace(/u/gi, '4');
    return newString;
  }

}
