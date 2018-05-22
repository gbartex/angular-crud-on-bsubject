import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { pipe, Observable } from 'rxjs/Rx';
import { catchError, delay, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataApiService {
  private _API = `${environment.apiRoot}api`;
  private _accessToken = localStorage.getItem('access_token');
  private url;

  constructor(path: string, public http: HttpClient, url?: string) {
    this.url = url ? url : `${this._API}/${path}`;
  }

  getAll$() {
    // return new Observable(observer => {
    //   setInterval(() => {
    //     observer.error(new AppError())
    //   }, 1000)
    // });
    return this.http
      .get(`${this.url}`)
      .pipe(catchError((err, caught) => this._onError(err, caught)))
  }

  getById$(id: string) {
    return this.http
      .get(`${this.url}/${id}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`)
      })
      .pipe(catchError((err, caught) => this._onError(err, caught)))
  }

  create$(resource) {
    // return Observable.throw(new AppError());
    return this.http
      .post(`${this.url}`, JSON.stringify(resource),
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`) }
      )
      .pipe(catchError((err, caught) => this._onError(err, caught)))
  }
  update$(resource) {
    return this.http
      .patch(
      `${this.url}/${resource.id}`,
      JSON.stringify(resource),
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`) }
      )
      .pipe(catchError((err, caught) => this._onError(err, caught)))
  }
  delete$(id) {
    return this.http
      .delete(`${this.url}/${id}`,
      { headers: new HttpHeaders().set('Authorization', `Bearer ${this._accessToken}`) })
      .pipe(catchError((err, caught) => this._onError(err, caught)))
  }

  private _onError(err, caught?) {
    let errorMsg = 'Error: Unable to complete request.';
    if (err instanceof HttpErrorResponse) {
      errorMsg = err.message;
      if (err.status === 401 || errorMsg.indexOf('No JWT') > -1 || errorMsg.indexOf('Unauthorized') > -1) {
        // this.auth.login();
        // not authorized ...
      }
    }
    return Observable.throw(errorMsg);
  }
}