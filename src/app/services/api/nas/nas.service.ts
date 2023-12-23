import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {File} from '../../../models/nas.model';

export const TAG_SEEDBOX = 'rambof';

@Injectable({
  providedIn: 'root',
})
export class NasService {
  readonly END_POINT_NAS = `${environment.apiUrl}/nas`;
  readonly END_POINT_TRANSFERT = `${this.END_POINT_NAS}/transfert`;
  readonly END_POINT_LIST_FILES = `${this.END_POINT_NAS}/listFiles`;

  constructor(private http: HttpClient) {}

  async transferToNas(
    path: string,
    destination: string,
    createSubFolder: string,
    type: string
  ): Promise<any> {
    return this.http
      .get<string>(`${this.END_POINT_TRANSFERT}`, {
        params: {path, destination, createSubFolder, type},
      })
      .toPromise();
  }

  async listFiles(path: string): Promise<File[]> {
    return this.http
      .get<File[]>(this.END_POINT_LIST_FILES, {
        params: {path},
      })
      .toPromise();
  }
}
