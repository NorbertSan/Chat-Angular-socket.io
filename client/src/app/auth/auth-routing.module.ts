import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-up',
  },
  {
    path: 'sign-up',
    component: AuthFormComponent,
    data: {
      login: false,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
