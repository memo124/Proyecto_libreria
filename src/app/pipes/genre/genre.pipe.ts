import { Pipe, PipeTransform } from '@angular/core';
import { genreI } from '../../interfaces/genre.interface';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(args: genreI[],value: string): genreI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameGenre.includes(value));
    return resultPost;
  }

}
