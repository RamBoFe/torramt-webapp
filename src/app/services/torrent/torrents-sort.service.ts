import { Injectable } from '@angular/core';
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
import { TorrentParseTitleService } from './torrent-parse-title.service';

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

  constructor(private torrentParseTittle: TorrentParseTitleService) {}

  sortByBestMatch(torrents: Array<Torrent>): Array<any> {
    return torrents.map(torrent => {
      const parseTorrentTitle = this.torrentParseTittle.parse(torrent.title);
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

  sortByAsc(torrents: Array<Torrent>): Array<any> {
    return torrents.sort((torrentA, torrentB) => torrentA.title > torrentB.title ? 1 : -1);
  }

  sortByDesc(torrents: Array<Torrent>): Array<any> {
    return torrents.sort((torrentA, torrentB) => torrentA.title < torrentB.title ? 1 : -1);
  }

  sortBySeeds(torrents: Array<Torrent>): Array<any> {
    return torrents.sort((torrentA, torrentB) => torrentA.seeds < torrentB.seeds ? 1 : -1);
  }
}
