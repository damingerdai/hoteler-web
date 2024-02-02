import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
  ThemeStorageService,
  CarouselItemDirective,
  CarouselComponent
} from './components';
import { SharedCdkModule } from './shared.cdk.module';
import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';
import { SharedPipesModule } from './shared.pipes.module';
import { LoadingShadeComponent } from './components/loading-shade';

const DECLARATIONS = [
  CarouselItemDirective,
  CarouselComponent,
  ConfirmComponent,
  ErrorCodeComponent,
  NavbarComponent,
  SkeletonLoaderComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,
    SharedPipesModule,

    NgxIsStandaloneModule,

    BannerComponent,
    LoadingShadeComponent,
    ThemePickerComponent,
    PageHeaderComponent,
  ],
  providers: [
    ThemeStorageService,
    {
      provide: SKELETON_LOADER_CONFIG, useValue: {}
    },
   provideAnimationsAsync(),
  ],
  exports: [
    NgOptimizedImage,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,
    SharedPipesModule,

    BannerComponent,
    LoadingShadeComponent,
    ThemePickerComponent,
    PageHeaderComponent,

    ...DECLARATIONS
  ]
})
export class SharedModule { }
