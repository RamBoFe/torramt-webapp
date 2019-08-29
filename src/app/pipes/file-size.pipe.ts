import { Pipe, PipeTransform } from '@angular/core';
import filesize from 'filesize';

@Pipe({name: 'fileSize'})
export class FileSizePipe implements PipeTransform {
  transform(value: number): string {
    return filesize(value);
  }
}
