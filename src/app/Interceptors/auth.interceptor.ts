import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { switchMap } from 'rxjs/operators';
import { GoogleSignInButtonComponent } from '../components/google-sign-in-button/google-sign-in-button.component';
import { StoreService } from '../services/store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly storeSrv: StoreService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url !== GoogleSignInButtonComponent.GOOGLE_LOGO_URL) {
      return fromPromise(this.storeSrv.user$.value.getIdToken()).pipe(
        switchMap(token => {
          const Authorization = `Bearer ${token}`;
          const modifiedRequest = request.clone({
            setHeaders: {
              Authorization,
            },
          });

          return next.handle(modifiedRequest);
        })
      );
    }

    return next.handle(request);
  }
}
