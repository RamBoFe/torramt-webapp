import { Injectable } from '@angular/core';
import { addHandler, parse as parseTorrentTitle } from 'parse-torrent-title';

@Injectable({
  providedIn: 'root'
})
export class TorrentsSortService {

  private bestMatchCriterion = [
    {
      resolution: [
        { criteria: '2160p', weight: 2 },
        { criteria: '1080p', weight: 1 },
        { criteria: '720p', weight: 0.5 }
      ]
    },
    {
      codec: [
        { criteria: 'x265', weight: 2 },
        { criteria: 'x264', weight: 1 }
      ]
    },
    {
     language: [
        { criteria: 'vff', weight: 5},
        { criteria: 'truefrench', weight: 5},
        { criteria: 'en', weight: 2},
        { criteria: 'multi', weight: 2}
      ]
    },
    { color: [{ criteria: '10bit', weight: 0.5 }] },
    { image: [{ criteria: 'hdr', weight: 0.5 }] },
    { rip: [{ criteria: '4klight', weight: 0.5}] }
];

  constructor() {
    addHandler('color', /10bit/i);
    addHandler('rip', /4klight/i);
    addHandler('image', /hdr/i);
  }


  torrentsTest = [
    { name: 'Scary Stories To Tell In The Dark (2019) MULTi VFF 2160p 10bit 4KLight HDR Bluray x265 AC3 5.1 - XANDER.mkv' },
    { name: 'Vaiana.2016.TRUEFRENCH.BluRay.1080.x265.HEVC.DTS-HRA-STARLIGHTER.mkv' },
    { name: 'Rambo Last Blood 2019 MULTI VFQ+EN 1080p WEBRip x264 POW' },
    { name: 'La.Cite.De.La.Peur.1994.FRENCH.1080p.WEB.H264-SiGeRiS.mkv' },
    { name: 'Retour Vers le Futur (1985) MULTi VFF 1080p 10bit HDLight BluRay x265 HE-AAC 5.1 - QTZ (Back To The Future).mkv' },
    { name: 'Joker 2019 MULTi vfq 2160p 10bit HDR BluRay 8CH x265 HEVC-Dabs' },
    { name: 'See.S01E05.MULTi.1080p.WEB-DL.AC3.x265-STEGNER.mkv' },
    { name: 'Le Seigneur des anneaux - La Communauté de l\'anneau (version longue) (2001) [1080p BluRay] [FR(VFF)-EN] [x265 10-bit AC3] [GWEN].mkv' },
  ]

  sort(torrents: Array<object>, mode = 'bestMatch') {
    // const ok = parseTorrentTitle('Vaiana.2016.TRUEFRENCH.BluRay.216p.x265.HEVC.DTS-HRA-STARLIGHTER.mkv');

    const ok = this.torrentsTest.map(torrent => {
        const parseDatas = parseTorrentTitle(torrent.name);
        this.bestMatchCriterion.map(criteria => {
          console.log(criteria);
        });

        return parseDatas;
      });

    console.log(ok);

    return [{ coucou: 'coucou' }];
      }
}
