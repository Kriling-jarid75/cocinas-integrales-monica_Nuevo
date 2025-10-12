import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient } from '@angular/common/http';  // 👈 importar esto

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes,
    withInMemoryScrolling({
      anchorScrolling: 'enabled', // Habilita el desplazamiento a anclas
      scrollPositionRestoration: 'enabled', // Restaura la posición del scroll al navegar hacia atrás
    })
  ),
  provideHttpClient(),   // 👈 agregar aquí
  provideServiceWorker('ngsw-worker.js', {
    enabled: !isDevMode(),
    registrationStrategy: 'registerWhenStable:30000'
  }), provideAnimationsAsync()]
};
