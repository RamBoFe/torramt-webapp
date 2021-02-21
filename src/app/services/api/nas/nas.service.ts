import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

export const TAG_SEEDBOX = 'RamBoF';

@Injectable({
  providedIn: 'root'
})
export class NasService {

  readonly END_POINT_NAS = `${environment.apiUrl}/nas`;
  readonly END_POINT_TRANSFERT = `${this.END_POINT_NAS}/transfert`;

  constructor(private http: HttpClient) { }

  async transferToNas(path: string,
                      destination: string,
                      createSubFolder: string,
                      type: string): Promise<any> {
    return this.http
      .get<string>(`${this.END_POINT_TRANSFERT}`, {
        params: { path, destination, createSubFolder, type }
      })
      .toPromise();
  }
}
