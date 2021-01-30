import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface IApiUser {
  id: string;
  email: string;
  displayName: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = environment.USERS_URL;

  constructor(private http: RestService) {}

  getLoggedUser$(): Observable<IApiUser> {
    return this.http.get(`${this.baseUrl}/loggedUser`);
  }
}
