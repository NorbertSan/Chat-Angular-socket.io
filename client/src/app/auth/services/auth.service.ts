import { tap } from 'rxjs/operators';
import {
  LocalStorageService,
  LOCAL_STORAGE_ITEMS,
} from './../../shared/services/local-storage.service';
import { UserStateSelectors } from './../../store/userState/userState.selectors';
import { RestService } from './../../shared/services/rest.service';
import {
  IApiSuccessLogin,
  ICreateUser,
  IUserCredentials,
} from './../auth-models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { UserStateActions } from 'src/app/store/userState/userState.actions';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.USERS_URL;

  constructor(
    private http: RestService,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  createUser$(userData: ICreateUser): Observable<IApiSuccessLogin> {
    return this.http.post(`${this.baseUrl}/create`, userData).pipe(
      tap((res: IApiSuccessLogin) => {
        this.setTokensToLocalStorage(res);
        this.setAuth(true);
      })
    );
  }

  login$(userCredentials: IUserCredentials): Observable<IApiSuccessLogin> {
    return this.http.post(`${this.baseUrl}/login`, userCredentials).pipe(
      tap((res: IApiSuccessLogin) => {
        this.setTokensToLocalStorage(res);
        this.setAuth(true);
      })
    );
  }

  logout$(): Observable<Response> {
    return this.http.post(`${this.baseUrl}/logout`, null).pipe(
      tap(() => {
        this.clearTokens();
        this.store.dispatch(UserStateActions.logout());
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(UserStateSelectors.auth);
  }

  getAuthorizationToken(): string | null {
    const exp = parseInt(
      this.localStorageService.getItem(LOCAL_STORAGE_ITEMS.EXP),
      10
    );

    if (new Date().getTime() > exp * 1000) {
      return null;
    }

    return this.localStorageService.getItem(LOCAL_STORAGE_ITEMS.ID_TOKEN);
  }

  getAuthorizationRefreshToken(): string {
    return this.localStorageService.getItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN);
  }

  setAuth(auth: boolean): void {
    this.store.dispatch(UserStateActions.setAuth({ auth }));
  }

  clearTokens(): void {
    this.localStorageService.removeItem(LOCAL_STORAGE_ITEMS.EXP);
    this.localStorageService.removeItem(LOCAL_STORAGE_ITEMS.ID_TOKEN);
    this.localStorageService.removeItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN);
  }

  private setTokensToLocalStorage(tokens: IApiSuccessLogin): void {
    const encodedToken = parseJwt(tokens.idToken);
    if (!encodedToken) {
      return;
    }

    this.localStorageService.setItem(
      LOCAL_STORAGE_ITEMS.EXP,
      encodedToken?.exp
    );
    this.localStorageService.setItem(
      LOCAL_STORAGE_ITEMS.ID_TOKEN,
      tokens.idToken
    );
    this.localStorageService.setItem(
      LOCAL_STORAGE_ITEMS.REFRESH_TOKEN,
      tokens.refreshToken
    );
  }
}
