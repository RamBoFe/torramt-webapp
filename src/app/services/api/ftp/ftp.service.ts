import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FtpService {

  readonly END_POINT_FTP = `${environment.apiUrl}/ftp`;
  readonly END_POINT_SIZE = `${this.END_POINT_FTP}/size`;
  readonly END_POINT_DELETE = `${this.END_POINT_FTP}/delete`;

  constructor(private http: HttpClient) {}

  async getList(path = '/'): Promise<any> {
    return this.http
      .get<Array<any>>(`${this.END_POINT_FTP}`, {
        params: { path }
      })
      .toPromise();
  }

  async getSize(path): Promise<any> {
    return this.http
      .get<Number>(`${this.END_POINT_SIZE}`, {
        params: { path }
      })
      .toPromise();
  }

  async delete(path, type): Promise<any> {
    return this.http
      .delete(`${this.END_POINT_DELETE}`, {
        params: { path, type }
      })
      .toPromise();
  }
}
