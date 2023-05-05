import { Pipe, PipeTransform } from '@angular/core';
import { userI } from 'src/app/interfaces/user.interface';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(args: userI[],value: string): userI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameUser.includes(value));
    return resultPost;
  }

}
