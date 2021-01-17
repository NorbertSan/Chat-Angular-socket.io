import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutTemplateComponent } from './components/main-layout-template/main-layout-template.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [MainLayoutTemplateComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    MainLayoutTemplateComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
