import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { NgxIsStandaloneModule } from 'ngx-is-standalone';

import {
  Banner,
  Confirm,
  ErrorCode,
  Navbar,
  PageHeader,
  SkeletonLoader,
  SKELETON_LOADER_CONFIG,
  ThemePicker,
  ThemeStorage,
  CarouselItem,
  Carousel,
  Tag
} from './components';
import { SharedCdkModule } from './shared-cdk-module';
import { SharedMaterialModule } from './shared-material-module';
import { UiModule } from './ui/ui-module';
import { SharedPipesModule } from './shared-pipes-module';
import { LoadingShade } from './components/loading-shade';


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

    Navbar,
    ErrorCode,
    CarouselItem,
    Carousel,
    Banner,
    Confirm,
    LoadingShade,
    ThemePicker,
    PageHeader,
    SkeletonLoader,
    Tag,
  ],
  providers: [
    ThemeStorage,
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

    Navbar,
    ErrorCode,
    CarouselItem,
    Carousel,
    Banner,
    Confirm,
    LoadingShade,
    ThemePicker,
    PageHeader,
    SkeletonLoader,
  ]
})
export class SharedModule { }
