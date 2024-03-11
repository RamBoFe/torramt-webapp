import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'downloadTime' })
export class DownloadTimePipe implements PipeTransform {
  transform(fileSize: number, speedConnection: number): string {
    if (!fileSize || !speedConnection) {
      return 'Temps restant inconnu';
    }

    let s = Math.floor(fileSize / speedConnection);
    let m = Math.floor(s / 60);
    s = s % 60;
    let h = Math.floor(m / 60);
    m = m % 60;
    const d = Math.floor(h / 24);
    h = h % 24;

    const units = ['s', 'm', 'h', 'd'].values();

    return [s, m, h, d]
      .filter(el => el > 0)
      .map(el => `${el}${units.next().value}`)
      .reverse()
      .join(' ');
  }
}
