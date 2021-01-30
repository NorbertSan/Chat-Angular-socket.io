import { tap } from 'rxjs/operators';
import { UserService, IApiUser } from './user.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserStateActions } from 'src/app/store/userState/userState.actions';

@Injectable({ providedIn: 'root' })
export class LoggedUserResolverService implements Resolve<IApiUser> {
  constructor(private userService: UserService, private store: Store) {}

  resolve(): Observable<IApiUser> {
    return this.userService.getLoggedUser$().pipe(
      tap((user: IApiUser) => {
        this.store.dispatch(UserStateActions.setUser({ user }));
      })
    );
  }
}
