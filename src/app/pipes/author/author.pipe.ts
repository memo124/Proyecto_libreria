import { Pipe, PipeTransform } from '@angular/core';
import { authorI } from 'src/app/interfaces/author.interface';

@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {

  transform(args: authorI[],value: string): authorI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameAuhtor.includes(value));
    return resultPost;
  }

}
