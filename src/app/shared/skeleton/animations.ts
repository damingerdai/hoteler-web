import {
	state,
	style,
	trigger
} from '@angular/animations';

export const stencilFade = trigger('visibilityChanged', [
	state('hide', style({ opacity: 0, display: 'none' })),
	state('show', style({ opacity: 1 }))
])