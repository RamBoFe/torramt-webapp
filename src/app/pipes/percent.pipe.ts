import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'percent'})
export class Percent implements PipeTransform {
  transform(value: number): number {
    return value * 100;
  }
}
