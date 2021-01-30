import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { SharedModule } from './../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';

@NgModule({
  declarations: [AuthFormComponent, AuthWrapperComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
