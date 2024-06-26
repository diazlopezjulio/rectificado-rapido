import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes), provideAnimations(), provideClientHydration(), provideServiceWorker('ngsw-worker.js', {
		enabled: !isDevMode(),
		registrationStrategy: 'registerWhenStable:30000'
	}), provideServiceWorker('ngsw-worker.js', {
		enabled: !isDevMode(),
		registrationStrategy: 'registerWhenStable:30000'
	})]
};
