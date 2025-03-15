import {inject} from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpEventType, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn, HttpContextToken
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from "rxjs/operators";
import {ClLoadingService} from "@sadad/component-lib/src/services";
import {LoadingMode} from "@sadad/component-lib/src/models";

/**
 *   only versions <= 4.2.1 support HttpInterceptor class impl with HTTP_INTERCEPTORS: InjectionToken<HttpInterceptor[]>
 *   package versions above 4.2.1 have the functional imp that can be used with
 *   EnvironmentProviders;
 *   provideHttpClient(
 *       withInterceptors([])
 *   )
 * */

export const SKIP_LOADING = new HttpContextToken<boolean>(() => false);
export const LOAD_MODE = new HttpContextToken<LoadingMode>(() => 'indeterminate');

export const ClLoadingInterceptor: HttpInterceptorFn = (request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(ClLoadingService);
  const ifSkipInterceptor: boolean = request?.context?.get(SKIP_LOADING);
  const mode: LoadingMode = request?.context?.get(LOAD_MODE);

  return next(request).pipe(
    tap((evt: HttpEvent<any>) => {
      if (evt.type == HttpEventType.Sent && !ifSkipInterceptor) {
        loadingService.show(mode);
      }

      if (evt.type == HttpEventType.Response && !ifSkipInterceptor) {
        loadingService.hide(mode);
      }
    }),
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse && !ifSkipInterceptor) {
        loadingService.hide(mode);
      }
      return throwError(err);
    })
  );
}
