import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly END_POINT_USER = `${environment.apiUrl}/user`;
  readonly END_POINT_VALID = `${this.END_POINT_USER}/valid`;

  constructor(private http: HttpClient) {}
  async valid(): Promise<boolean> {
    return this.http.get<boolean>(this.END_POINT_VALID).toPromise();
  }
}
