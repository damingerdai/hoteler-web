import { BreakpointObserver } from '@angular/cdk/layout';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

// TODO: 监听屏幕大小
function matSnackBarOptionsFactory(breakpointObserver: BreakpointObserver) {
  const isSmallScreen = breakpointObserver.isMatched('(max-width: 376px)');
  if (isSmallScreen) {
    return {
      duration: 3000,
    };
  }
  return {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  };
}

export const materailProviders = [
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useFactory: matSnackBarOptionsFactory,
    deps: [BreakpointObserver],
  }
];
