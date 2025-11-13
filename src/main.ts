import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from '../src/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // <--- IMPORTANTE

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(), // <--- ADICIONE ISTO PARA HABILITAR O HTTP
  ],
});
