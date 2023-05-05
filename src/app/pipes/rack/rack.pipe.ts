import { Pipe, PipeTransform } from '@angular/core';
import { rackI } from 'src/app/interfaces/rack.interface';

@Pipe({
  name: 'rack'
})
export class RackPipe implements PipeTransform {

  transform(args: rackI[],value: string): rackI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameRack.includes(value));
    return resultPost;
  }

}
