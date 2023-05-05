import { Pipe, PipeTransform } from '@angular/core';
import { editorialI } from 'src/app/interfaces/editorial.interface';

@Pipe({
  name: 'editorial'
})
export class EditorialPipe implements PipeTransform {

  transform( args: editorialI[],value:string): editorialI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameEditorial.includes(value));
    return resultPost;
  }

}
