import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    return this.login ? '' : 'REGISTER';
  }

  ngOnInit(): void {
    this.login = this.route.snapshot.data.login;

    if (!this.login) {
      this.formGroup = this.fb.group({
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        displayName: ['', Validators.compose([Validators.required])],
      });
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  submit(): void {
    if (!this.formGroup.valid) {
      return;
    }

    if (this.login) {
      return;
    }

    this.isSaving$.next(true);
    this.error$.next('');

    const sub = this.authService
      .createUser$(this.formGroup.value)
      .subscribe(
        () => {
          this.router.navigate(['/chat']);
        },
        (errRes) => {
          this.error$.next(errRes?.error?.message ?? 'Registration failed');
        }
      )
      .add(() => {
        this.isSaving$.next(false);
      });

    this.subs.add(sub);
  }
}
