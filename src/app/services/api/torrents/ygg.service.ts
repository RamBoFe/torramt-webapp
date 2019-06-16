import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://192.168.0.23:2223/torrents/ygg';

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
