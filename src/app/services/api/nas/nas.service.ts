import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}/nas`;

@Injectable({
  providedIn: 'root'
})
export class NasService {
  constructor(private http: HttpClient) { }

  async transferToNas(path: string,
                      destination: string,
                      createSubFolder: string,
                      type: string): Promise<any> {

    return this.http
      .get<string>(`${URL}/transfert`, {
        params: { path, destination, createSubFolder, type }
      })
      .toPromise();
  }
}
