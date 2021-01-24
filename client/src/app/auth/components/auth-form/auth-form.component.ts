import { USER_LOGIN_ERRORS } from './../../auth-models';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  login: boolean;
  error$ = new BehaviorSubject<string>('');
  isSaving$ = new BehaviorSubject<boolean>(false);

  private subs = new Subscription();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  get buttonLabel(): string {
    return this.login ? 'LOGIN' : 'REGISTER';
  }

  ngOnInit(): void {
    this.login = this.route.snapshot.data.login;

    this.formGroup = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
      ],
    });

    if (!this.login) {
      const displayNameControl = new FormControl(
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)])
      );
      this.formGroup.addControl('displayName', displayNameControl);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    this.isSaving$.next(true);
    this.error$.next('');

    if (this.login) {
      this.loginUser();
    } else {
      this.createUser();
    }
  }

  private createUser(): void {
    const sub = this.authService
      .createUser$(this.formGroup.value)
      .subscribe(
        () => {
          this.router.navigate(['/chat']);
        },
        (errRes) => {
          if (errRes?.error?.code === USER_LOGIN_ERRORS.EMAIL_ALREADY_IN_USE) {
            this.error$.next('Email already taken');
            return;
          }
          this.error$.next('Registration failed');
        }
      )
      .add(() => {
        this.isSaving$.next(false);
      });

    this.subs.add(sub);
  }

  private loginUser(): void {
    const sub = this.authService
      .login$(this.formGroup.value)
      .subscribe(
        () => {
          this.router.navigate(['/chat']);
        },
        (errRes) => {
          if (errRes?.error?.code === USER_LOGIN_ERRORS.WRONG_CREDENTIALS) {
            this.error$.next('Wrong credentials');
            return;
          }
          this.error$.next('Login failed');
        }
      )
      .add(() => {
        this.isSaving$.next(false);
      });

    this.subs.add(sub);
  }
}
