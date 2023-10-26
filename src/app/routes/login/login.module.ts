import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedMaterialModule } from '../../shared/shared.material.module';
import { UiModule } from '../../shared/ui/ui.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiModule,
    SharedMaterialModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
})
export class LoginModule { }
