import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}/ftp`;

@Injectable({
  providedIn: 'root'
})
export class FtpService {

  constructor(private http: HttpClient) {}

  async getList(path = '/'): Promise<any> {
    return this.http
      .get<Array<any>>(`${URL}`, {
        params: { path }
      })
      .toPromise();
  }
}
