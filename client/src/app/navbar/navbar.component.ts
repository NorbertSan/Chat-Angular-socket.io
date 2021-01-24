import { UserStateActions } from './../store/userState/userState.actions';
import { AuthService } from './../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateSelectors } from '../store/userState/userState.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  auth$: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.auth$ = this.store.select(UserStateSelectors.auth);
  }

  logout(): Promise<boolean> {
    this.authService.clearTokens();
    this.store.dispatch(UserStateActions.logout());
    return this.router.navigate(['/auth/login']);
  }
}
