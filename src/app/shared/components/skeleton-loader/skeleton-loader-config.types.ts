import { InjectionToken } from '@angular/core';

export type SkeletonLoaderConfigTheme = {
  // This is required since ngStyle is using `any` as well
  // More details in https://angular.io/api/common/NgStyle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
} | null;

export interface SkeletonLoaderConfig {
  appearance: 'circle' | 'line' | 'custom-content' | '';
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
  theme: SkeletonLoaderConfigTheme;
  loadingText: string;
  count: number;
  ariaLabel: string;
}

export const SKELETON_LOADER_CONFIG = new InjectionToken<SkeletonLoaderConfig>('skeleton-loader.config');
