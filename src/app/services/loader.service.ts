import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EndPointInterface } from '../components/loader/loader.interface';
import { TorrentsService } from './api/torrents/torrents.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  // loadersList: Map<string, string> = new Map<string, string>([
  //   // [`${this.torrentService.URL}/search`, 'search'],
  //   // [`${this.torrentService.URL}/dl`, 'dl'],
  //   // ["http://localhost:2223/torrents/dl?torrent=%7B%22title%22:%22Coldplay.A.Head.Full.of.Dreams.2018.SUBFRENCH.1080p.WEBRiP.x264-JNTO%22,%22time%22:%222018-11-24T20:17:13.000Z%22,%22seeds%22:5,%22peers%22:0,%22size%22:%223.86Go%22,%22desc%22:%22http://localhost:2223/go?url=https://www2.yggtorrent.si/torrent/film-video/documentaire/354320-coldplay+a+head+full+of+dreams+2018+subfrench+1080p+webrip+x264-jnto%22,%22id%22:%22354320%22,%22provider%22:%22Yggtorrent%22,%22link%22:%22http://localhost:2223/go?url=https://www2.yggtorrent.si/engine/download_torrent?id=354320%22%7D", 'dl1']
  // ]);

  loadersList: Map<string, EndPointInterface> = new Map<string, EndPointInterface>();
  loadersList1: Map<EndPointInterface, string> = new Map<EndPointInterface, string>();
  isLoading = new BehaviorSubject<string>(undefined);

  constructor(private readonly torrentService: TorrentsService) {
  }

  show(url: string, params: HttpParams): void {
    if (params.keys().length) {

    } else {
      this.isLoading.next(this.loadersList.get());
    }



    //
  }

  hide(): void {
    this.isLoading.next(undefined);
  }



}
