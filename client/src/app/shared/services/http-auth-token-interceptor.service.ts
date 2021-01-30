import {
  LocalStorageService,
  LOCAL_STORAGE_ITEMS,
} from './local-storage.service';
import { AuthService } from '../../auth/services/auth.service';
import { Observable, throwError } from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthTokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthorizationToken();

    if (!authToken) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    return next
      .handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error))
      );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent && error.status === 401) {
      const refreshToken: string = this.localStorageService.getItem(
        LOCAL_STORAGE_ITEMS.REFRESH_TOKEN
      );
      this.authService.clearTokens();
      if (refreshToken) {
        this.authService.refreshToken$(refreshToken).subscribe().unsubscribe();
      } else {
        this.router.navigate(['/auth', 'login']);
      }
      return;
    }

    return throwError(error);
  }
}
