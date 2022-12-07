import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxDomConfettiModule } from 'ngx-dom-confetti';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule,
    NgxDomConfettiModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
