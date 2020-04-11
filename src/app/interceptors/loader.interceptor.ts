import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  // private requests: HttpRequest<any>[] = [];
  private requests: Array<HttpRequest<any>> = [];

  // constructor(private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>): void {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    // this.loaderService.isLoading.next(this.requests.length > 0);
  console.log('On supprime la requête !');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.requests.push(req);
    console.log('No of requests--->' + this.requests.length);
    // this.loaderService.isLoading.next(true);

    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              // this.removeRequest(req);
              observer.next(event);
              console.log('requete OK');
            }
          },
          err => {
            alert('error returned');
            this.removeRequest(req);
            observer.error(err);
            console.log('requete ERROR');
          },
          () => {
            this.removeRequest(req);
            observer.complete();
            console.log('requete COMPLETE');
          });
      // remove request from queue when cancelled

      return () => {
        // this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
