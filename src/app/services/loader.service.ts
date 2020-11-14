import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaders: Map<string, string> = new Map<string, string>();
  isLoading = new BehaviorSubject<string>(undefined);

  show(httpRequest: HttpRequest<any>): void {
    const loaderName = this.loaders.has(httpRequest.url)
      ? this.loaders.get(httpRequest.url)
      : this.loaders.get(httpRequest.urlWithParams);
    this.isLoading.next(loaderName);
  }

  hide(): void {
    this.isLoading.next(undefined);
  }
}
