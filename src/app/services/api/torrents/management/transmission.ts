import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class TransmissionService {

  readonly URL = `${environment.apiUrl}/torrents/management/transmission`;

  constructor(private http: HttpClient) {}

  async getTorrents(): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}`)
      .toPromise();
  }

  async start(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}/start/${hash}`)
      .toPromise();
  }

  async stop(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}/stop/${hash}`)
      .toPromise();
  }
  async remove(hash: String): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.URL}/remove/${hash}`)
      .toPromise();
  }
}
