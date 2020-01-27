import { Injectable } from '@angular/core';
import { addHandler, parse as parseTorrentTitle } from 'parse-torrent-title';

@Injectable({
  providedIn: 'root'
})
export class TorrentsSortService {

  private bestMatchCriteria = {
    resolution: [
      { criteria: '2160p', weight: 2 },
      { criteria: '1080p', weight: 1 },
      { criteria: '720p', weight: 0.5 }
      ],
    codec: [
      { criteria: 'x265', weight: 2 },
      { criteria: 'x264', weight: 1 }
    ],
    language: [
      {criteria: 'vff', weight: 5},
      {criteria: 'vo', weight: 2}
    ],
    color: [{ criteria: '10bit', weight: 0.5 }],
    image: [{ criteria: 'hdr', weight: 0.5 }],
    rip: [{ criteria: '4klight', weight: 0.5}]
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
