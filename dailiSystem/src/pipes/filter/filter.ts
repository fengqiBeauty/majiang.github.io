import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipe implements PipeTransform {

  transform(value: any): any {
    if(value == 0){
      return "冻结"
    }
    else{
      return "解冻"
    }
  }
}
