import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
