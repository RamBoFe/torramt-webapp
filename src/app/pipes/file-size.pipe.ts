import {Pipe, PipeTransform} from '@angular/core';
import filesize from 'filesize';

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
  transform(value: number, decimal?: number): string {
    if (value) {
      return filesize(value, {round: decimal});
    } else {
      return '0';
    }
  }
}
