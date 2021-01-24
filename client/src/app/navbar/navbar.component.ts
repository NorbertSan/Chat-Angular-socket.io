import { AuthService } from './../auth/services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserStateSelectors } from '../store/userState/userState.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {
  auth$: Observable<boolean>;
  private subs = new Subscription();
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.auth$ = this.store.select(UserStateSelectors.auth);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  logout(): void {
    const sub = this.authService.logout$().subscribe();
    this.subs.add(sub);
    this.router.navigate(['/auth/login']);
  }
}
