import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {SeedboxTorrent} from '../../../../models/seedbox-torrent.models';

@Injectable({
  providedIn: 'root',
})
export class TransmissionService {
  readonly END_POINT_SEEDBOX = `${environment.apiUrl}/torrents/management/transmission`;
  readonly END_POINT_START = `${this.END_POINT_SEEDBOX}/start`;
  readonly END_POINT_STOP = `${this.END_POINT_SEEDBOX}/stop`;
  readonly END_POINT_REMOVE = `${this.END_POINT_SEEDBOX}/remove`;

  constructor(private http: HttpClient) {}

  async getTorrents(): Promise<SeedboxTorrent[]> {
    return this.http
      .get<SeedboxTorrent[]>(`${this.END_POINT_SEEDBOX}`)
      .toPromise();
  }

  async start(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_START}/${hash}`)
      .toPromise();
  }

  async stop(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_STOP}/${hash}`)
      .toPromise();
  }
  async remove(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_REMOVE}/${hash}`)
      .toPromise();
  }
}
