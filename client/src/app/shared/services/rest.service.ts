import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  get(url: string, options: any = null): Observable<any> {
    if (!options || !options.headers) {
      const headers = this.getHeaders();
      options = {
        ...options,
        headers,
      };
    }
    return this.http.get(url, options);
  }

  post(url: string, data: any, options: any = null): Observable<any> {
    if (!options || !options.headers) {
      const headers = this.getHeaders();
      options = {
        ...options,
        headers,
      };
    }
    return this.http.post(url, data, options);
  }

  patch(url: string, data: any, options: any = null): Observable<any> {
    if (!options || !options.headers) {
      const headers = this.getHeaders();
      options = {
        ...options,
        headers,
      };
    }
    return this.http.patch(url, data, options);
  }

  delete(url: string, options: any = null): Observable<any> {
    if (!options || !options.headers) {
      const headers = this.getHeaders();
      options = {
        ...options,
        headers,
      };
    }
    return this.http.delete(url, options);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: '*/*',
      'Accept-Language': 'en',
      'Content-type': 'application/json',
    });
  }
}
