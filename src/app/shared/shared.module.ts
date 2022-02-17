import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  BannerComponent,
  ConfirmComponent,
  ErrorCodeComponent,
  NavbarComponent,
  PageHeaderComponent,
  ThemePickerComponent,
  ThemeStorageService
} from './components';
import { SharedCdkModule } from './shared.cdk.module';
import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';

const DECLARATIONS = [
  BannerComponent,
  ConfirmComponent,
  ErrorCodeComponent,
  NavbarComponent,
  PageHeaderComponent,
  ThemePickerComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    FlexLayoutModule,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,
  ],
  providers: [
    ThemeStorageService
  ],
  exports: [
    FlexLayoutModule,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,

    ...DECLARATIONS
  ]
})
export class SharedModule { }
