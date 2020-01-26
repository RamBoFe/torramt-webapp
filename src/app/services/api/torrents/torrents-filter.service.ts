import { Injectable } from '@angular/core';
import { parse as parseTorrentTitle, addHandler } from 'parse-torrent-title';

@Injectable({
  providedIn: 'root'
})
export class TorrentsSortService {

  private bestMatchCriteria = {
    resolution: '2160p',
    codec: 'x265',
    language: 'vff',
    color: '10bit',
    rip: '4klight',
    image: 'hdr'
  };

  constructor() {
    addHandler('color', /10bit/i);
    addHandler('rip', /4klight/i);
    addHandler('image', /hdr/i);
  }

  sort(torrents: Array<object>, mode = 'bestMatch'): Array<object> {
    const ok = parseTorrentTitle('Scary Stories To Tell In The Dark (2019) MULTi VFF 2160p 10bit 4KLight HDR Bluray x265 AC3 5.1 - XANDER.mkv');
    // const ok = parseTorrentTitle('Vaiana.2016.TRUEFRENCH.BluRay.216p.x265.HEVC.DTS-HRA-STARLIGHTER.mkv');
    console.log(ok);

    return [{ coucou: 'coucou' }];
  }
}
