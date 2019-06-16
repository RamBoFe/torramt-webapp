import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://192.168.0.23:2223/torrents/management/transmission';

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
