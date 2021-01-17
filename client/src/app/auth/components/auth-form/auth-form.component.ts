import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  formGroup: FormGroup;
  login: boolean;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

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

  submit(): void {}
}
