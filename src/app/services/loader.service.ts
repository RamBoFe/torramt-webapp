import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaders: Map<string, string> = new Map<string, string>();
  once: Map<string, boolean> = new Map<string, boolean>();
  isLoading = new BehaviorSubject<string>(undefined);

  show(httpRequest: HttpRequest<any>): void {
    const loaderName = this.loaders.has(httpRequest.url)
      ? this.loaders.get(httpRequest.url)
      : this.loaders.get(httpRequest.urlWithParams);

    if (loaderName) {
      if (this.once.has(loaderName)) {
        const once = this.once.get(loaderName);
        if (!once) {
          this.isLoading.next(loaderName);
          this.once.set(loaderName, true);
        }
      } else {
        this.isLoading.next(loaderName);
      }
    }
  }

  hide(): void {
    this.isLoading.next(undefined);
  }
}
