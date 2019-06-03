import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class YggService {

  constructor(private http: HttpClient) {}

  async getSearch(searched): Promise<any> {
    return this.http
      .get<Array<any>>('http://localhost:2223/torrents/ygg/search', {
        params: {search: searched.search}
      })
      .toPromise();
  }

}
