import { InjectionToken } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SkeletonLoaderConfigTheme = Record<string, any> | null;

export interface SkeletonLoaderConfig {
  appearance: 'circle' | 'line' | 'custom-content' | '';
  animation: 'progress' | 'progress-dark' | 'pulse' | 'false' | false;
  theme: SkeletonLoaderConfigTheme;
  loadingText: string;
  count: number;
  ariaLabel: string;
}

export const SKELETON_LOADER_CONFIG = new InjectionToken<SkeletonLoaderConfig>('skeleton-loader.config');
