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
  CarouselComponent,
  TagComponent
} from './components';
import { SharedCdkModule } from './shared.cdk.module';
import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';
import { SharedPipesModule } from './shared.pipes.module';
import { LoadingShadeComponent } from './components/loading-shade';


@NgModule({
  declarations: [],
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

    NavbarComponent,
    ErrorCodeComponent,
    CarouselItemDirective,
    CarouselComponent,
    BannerComponent,
    ConfirmComponent,
    LoadingShadeComponent,
    ThemePickerComponent,
    PageHeaderComponent,
    SkeletonLoaderComponent,
    TagComponent,
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

    NavbarComponent,
    ErrorCodeComponent,
    CarouselItemDirective,
    CarouselComponent,
    BannerComponent,
    ConfirmComponent,
    LoadingShadeComponent,
    ThemePickerComponent,
    PageHeaderComponent,
    SkeletonLoaderComponent,
  ]
})
export class SharedModule { }
