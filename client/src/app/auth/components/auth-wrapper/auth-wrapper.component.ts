import { AppStateSelectors } from './../../../store/appState/appState.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss'],
})
export class AuthWrapperComponent implements OnInit, OnDestroy {
  private subs = new Subscription();
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    const sub = this.store
      .select(AppStateSelectors.auth)
      .subscribe((auth: boolean) => {
        if (auth) {
          this.router.navigate(['/chat']);
        }
      });

    this.subs.add(sub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
