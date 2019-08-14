import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}/torrents`;

@Injectable()
export class TorrentsService {

  constructor(private http: HttpClient) {}

  async getSearch(search): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/search`, {
        params: { search: JSON.stringify(search) }
      })
      .toPromise();
  }

  async addTorrentToDl(torrent: object): Promise<any> {
    return this.http
      .get<Object>(`${URL}/dl`, {
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
      .get<String>(`${URL}/details`,  requestOptions)
      .toPromise();
  }

  async getActiveProviders(): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/providers`)
      .toPromise();
  }
}
