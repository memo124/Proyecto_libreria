import { Pipe, PipeTransform } from '@angular/core';
import { booksI } from 'src/app/interfaces/books.interface';

@Pipe({
  name: 'book'
})
export class BookPipe implements PipeTransform {

  transform(args: booksI[],value:string): booksI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.bookName.includes(value));
    return resultPost;
  }

}
