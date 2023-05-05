import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'book'
})
export class BookPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
