import {
  LocalStorageService,
  LOCAL_STORAGE_ITEMS,
} from './shared/services/local-storage.service';
import { AuthService } from './auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token: string | null = this.authService.getAuthorizationToken();
    if (!token) {
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
    this.authService.setAuth(true);
  }
}
