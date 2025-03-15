import {Injectable} from '@angular/core';
import {HttpClient, HttpContext, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ClHttpMethod} from "@sadad/component-lib/src/enums";


@Injectable({
  providedIn: 'root'
})

export class ClSharedService {
  constructor(private _http: HttpClient) {}


  createHttpRequest<T>(url: string, httpMethod: ClHttpMethod, body: any = null, params?: HttpParams, context?: HttpContext): Observable<T> {
    return this._http.request<T>(httpMethod || ClHttpMethod.GET, `${url}`, {body, params, context});
  }

  resetObjectValues(object:any , values:any){
    for (let property in object) {
      if (object[property] == undefined || object[property] == null) {
        object[property] = values[property];
      }
    }
  }
}
