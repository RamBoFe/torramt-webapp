import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}/torrents/ygg`;

@Injectable()
export class YggService {

  constructor(private http: HttpClient) {}

  async getSearch(search: string): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/search`, {
        params: { search }
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
}
