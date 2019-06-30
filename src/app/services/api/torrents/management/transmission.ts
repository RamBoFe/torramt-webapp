import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

const URL = `${environment.apiUrl}/torrents/management/transmission`;

@Injectable()
export class TransmissionService {

  constructor(private http: HttpClient) {}

  async getTorrents(): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}`)
      .toPromise();
  }

  async start(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/start/${hash}`)
      .toPromise();
  }

  async stop(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/stop/${hash}`)
      .toPromise();
  }
  async remove(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}/remove/${hash}`)
      .toPromise();
  }
}
