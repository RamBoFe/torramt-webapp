import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TorrentsService {

  readonly END_POINT_TORRENTS = `${environment.apiUrl}/torrents`;
  readonly END_POINT_SEARCH = `${this.END_POINT_TORRENTS}/search`;
  readonly END_POINT_DL = `${this.END_POINT_TORRENTS}/dl`;
  readonly END_POINT_PROVIDERS = `${this.END_POINT_TORRENTS}/providers`;
  readonly END_POINT_DETAILS = `${this.END_POINT_TORRENTS}/details`;

  constructor(private http: HttpClient) {}

  async getSearch(search): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_SEARCH}`, {
        params: { search: JSON.stringify(search) }
      })
      .toPromise();
  }

  async addTorrentToDl(torrent: object): Promise<any> {
    return this.http
      .get<Object>(`${this.END_POINT_DL}`, {
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
      .get<String>(`${this.END_POINT_DETAILS}`,  requestOptions)
      .toPromise();
  }

  async getActiveProviders(): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_PROVIDERS}`)
      .toPromise();
  }
}
