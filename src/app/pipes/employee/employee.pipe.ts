import { Pipe, PipeTransform } from '@angular/core';
import { employeeI } from 'src/app/interfaces/employee.interface';

@Pipe({
  name: 'employee'
})
export class EmployeePipe implements PipeTransform {

  transform(args: employeeI[],value:string): employeeI[] {
    if (value.length === 0) return args;

    const resultPost = args.filter(data=>data.nameEmployee.includes(value));
    return resultPost;
  }

}
