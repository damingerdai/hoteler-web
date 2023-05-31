import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxIsStandaloneModule } from 'ngx-is-standalone';

import {
  BannerComponent,
  ConfirmComponent,
  ErrorCodeComponent,
  NavbarComponent,
  PageHeaderComponent,
  SkeletonLoaderComponent,
  SKELETON_LOADER_CONFIG,
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
  SkeletonLoaderComponent,
  ThemePickerComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    NgOptimizedImage,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,

    NgxIsStandaloneModule
  ],
  providers: [
    ThemeStorageService,
    {
      provide: SKELETON_LOADER_CONFIG, useValue: {}
    },
  ],
  exports: [
    NgOptimizedImage,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,

    ...DECLARATIONS
  ]
})
export class SharedModule { }
