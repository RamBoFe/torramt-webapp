import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TorrentsService } from './api/torrents/torrents.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loadersList: Map<string, string> = new Map<string, string>([
    [`${this.torrentService.URL}/search`, 'search'],
    [`${this.torrentService.URL}/dl`, 'dl']
  ]);
  isLoading = new BehaviorSubject<string>(undefined);

  constructor(private readonly torrentService: TorrentsService) {
  }

  show(url: string): void {
    this.isLoading.next(this.loadersList.get(url));
  }

  hide(): void {
    this.isLoading.next(undefined);
  }
}
