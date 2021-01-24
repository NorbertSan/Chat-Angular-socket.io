import { UserStateSelectors } from './../../store/userState/userState.selectors';
import { RestService } from './../../shared/services/rest.service';
import { IApiSuccessLogin, ICreateUser } from './../auth-models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.USERS_URL;

  constructor(private http: RestService, private store: Store) {}

  createUser$(userData: ICreateUser): Observable<IApiSuccessLogin> {
    return this.http.post(`${this.baseUrl}/create`, userData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(UserStateSelectors.auth);
  }
}
