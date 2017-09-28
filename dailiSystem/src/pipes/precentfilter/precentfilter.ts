import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PrecentfilterPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'precentfilter',
})
export class PrecentfilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let valueprecent = value +"%"
    return valueprecent
  }
}
