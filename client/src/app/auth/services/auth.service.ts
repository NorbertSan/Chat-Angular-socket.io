import { tap } from 'rxjs/operators';
import {
  LocalStorageService,
  LOCAL_STORAGE_ITEMS,
} from './../../shared/services/local-storage.service';
import { UserStateSelectors } from './../../store/userState/userState.selectors';
import { RestService } from './../../shared/services/rest.service';
import { IApiSuccessLogin, ICreateUser } from './../auth-models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { UserStateActions } from 'src/app/store/userState/userState.actions';

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

  isAuthenticated(): Observable<boolean> {
    return this.store.select(UserStateSelectors.auth);
  }

  setAuth(auth: boolean): void {
    this.store.dispatch(UserStateActions.setAuth({ auth }));
  }

  clearTokens(): void {
    this.localStorageService.removeItem(LOCAL_STORAGE_ITEMS.ID_TOKEN);
    this.localStorageService.removeItem(LOCAL_STORAGE_ITEMS.REFRESH_TOKEN);
  }

  private setTokensToLocalStorage(tokens: IApiSuccessLogin): void {
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
