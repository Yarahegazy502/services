import { HttpClient, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { interceptorProviders } from './core/interceptors/interceptor-index';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { Router, provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    // provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom
      (
        TranslateModule.forRoot(
          {
            loader:
            {
              provide: TranslateLoader,
              useFactory: createTranslateLoader,
              deps: [HttpClient, Router]
            },
            defaultLanguage: 'en'
          })
      ), interceptorProviders,
    provideAnimationsAsync(),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,
      }),
    ),
    provideRouter(routes, withComponentInputBinding()),
    MessageService
  ]
};
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
