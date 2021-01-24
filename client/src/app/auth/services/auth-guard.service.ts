import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }
}
