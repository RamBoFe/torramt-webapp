import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TorrentsService {

  readonly URL = `${environment.apiUrl}/torrents`;
  readonly SEARCH = `${this.URL}/search`;
  readonly DL = `${this.URL}/dl`;

  constructor(private http: HttpClient) {}

  async getSearch(search): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}/search`, {
        params: { search: JSON.stringify(search) }
      })
      .toPromise();
  }

  async addTorrentToDl(torrent: object): Promise<any> {
    return this.http
      .get<Object>(`${this.URL}/dl`, {
        params: { torrent: JSON.stringify(torrent) }
      })
      .toPromise();
  }

  async getTorrentDetails(torrent: object): Promise<any> {
    const requestOptions: Object = {
      params: { torrent: JSON.stringify(torrent) },
      responseType: 'text'
    };

    return this.http
      .get<String>(`${this.URL}/details`,  requestOptions)
      .toPromise();
  }

  async getActiveProviders(): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}/providers`)
      .toPromise();
  }
}
