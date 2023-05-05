import { Pipe, PipeTransform } from '@angular/core';
import { reserveI } from 'src/app/interfaces/reserve.interface';

@Pipe({
  name: 'reserve'
})
export class ReservePipe implements PipeTransform {

  transform(args: reserveI[],value: string): reserveI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.User.nameUser.includes(value));
    return resultPost;
  }

}
