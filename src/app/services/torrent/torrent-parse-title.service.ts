import { Injectable } from '@angular/core';
import { addHandler, parse } from 'parse-torrent-title';
import ParserResult = ParseTorrentTitle.ParserResult;

@Injectable({
  providedIn: 'root'
})
export class TorrentParseTitleService {

  constructor() {
    addHandler('color', /10bit/i);
    addHandler('rip', /4klight/i);
    addHandler('image', /hdr/i);
  }

  parse(title: string): ParserResult {
    return parse(title);
  }

  formatForScrapper(title: string): string {
    const parsedTitle = parse(title);

    return `${parsedTitle.title}${ parsedTitle.year ? ` (${parsedTitle.year})` : ''}`;
  }
}
