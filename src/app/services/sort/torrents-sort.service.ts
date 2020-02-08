import { Injectable } from '@angular/core';
import { addHandler, parse } from 'parse-torrent-title';
import {
  criterionCodec,
  criterionColor,
  criterionImage,
  criterionLanguage,
  criterionResolution,
  criterionRip
} from '../../common/sort/sort.criterion';
import { CriterionSort } from '../../common/sort/sort.interface';
import { Torrent } from '../../common/torrent/torrent.interface';

@Injectable({
  providedIn: 'root'
})
export class TorrentsSortService {

  private bestMatchCriterion: Array<CriterionSort> = [
    criterionResolution,
    criterionCodec,
    criterionLanguage,
    criterionColor,
    criterionImage,
    criterionRip
];

  constructor() {
    addHandler('color', /10bit/i);
    addHandler('rip', /4klight/i);
    addHandler('image', /hdr/i);
  }

  sortByBestMatch(torrents: Array<Torrent>): Array<any> {
    return torrents.map(torrent => {
      const parseTorrentTitle = parse(torrent.title);
      const weight = this.bestMatchCriterion.map((criteria: CriterionSort): number =>
        parseTorrentTitle.hasOwnProperty(criteria.name) ?
          criteria.terms.has(parseTorrentTitle[criteria.name]) ?
            criteria.terms.get(parseTorrentTitle[criteria.name]) : 0 : 0
      )
      .reduce((torrentWeightTotal, torrentWeight) => torrentWeightTotal + torrentWeight);

      return { torrent, weight };
    })
    .sort((torrentA, torrentB) => torrentA.weight < torrentB.weight ? 1 : -1)
    .map(sortedTorrent => sortedTorrent.torrent);
  }
}
