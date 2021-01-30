import { AuthWrapperComponent } from './components/auth-wrapper/auth-wrapper.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthWrapperComponent,
    data: {
      login: false,
    },
    children: [
      {
        path: '',
        component: AuthFormComponent,
        data: {
          login: false,
        },
      },
      {
        path: 'login',
        component: AuthFormComponent,
        data: {
          login: true,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
