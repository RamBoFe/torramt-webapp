import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { TransmissionService } from '../services/api/torrents/management/transmission';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService, private transmissionService: TransmissionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url !== this.transmissionService.URL) {
      this.loaderService.show();
    }

    return next.handle(req)
      .pipe(finalize(() => this.loaderService.hide()));
  }
}
