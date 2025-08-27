import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom, provideAppInitializer } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
// import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import {navConfig} from './shared/interfaces/navConfig'
import {NAV_TOKEN,ENV,TOOLS_TOKEN} from './token'
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './shared/services/Internationalization/custom-paginator-intl';
import { LoadingService } from './shared/services/loading/loading.service';
import {Observable} from 'rxjs'
registerLocaleData(zh);
export function initializeAppFactory(loadingService: LoadingService): () => Observable<any> {
  return () => loadingService.loadCriticalAssets();
}
const navUrl:navConfig[]=[
  {
    name:'home',
    url:'/',
  },
  {
    name:'welcome',
    url:'/welcome',
    enable:false
  },
  {
    name:'newblog',
    url:'/newblog',
  },
  {
    name:'recent',
    url:'/recent',
    enable:false,
  },
  {
    name:'resource',
    url:'/resource',
    enable:false
  },
  {
    name:'tools',
    url:'/tools',
  }
]
const toolsUrl=[
  {
    name:'reflexes',
    url:'/tools/reflexes'
  },
  {
    name:'urlnote',
    url:'/tools/urlnote'
  },
  {
    name:'typing',
    url:'/tools/typing'
  },
  {
    name:'free-cell',
    url:'/tools/free-cell'
  },
  {
    name:'chat',
    url:'/tools/chat'
  }
]
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),  importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),provideRouter(routes,withComponentInputBinding(),withInMemoryScrolling({scrollPositionRestoration:'enabled'})),
    {
      provide:NAV_TOKEN,
      useValue:navUrl
    },
    {
      provide:ENV,
      useValue:'DEV'
    },
    {
      provide:TOOLS_TOKEN,
      useValue:toolsUrl
    },
    {  
      provide:MatPaginatorIntl,
      useClass:CustomMatPaginatorIntl
    },
    LoadingService,
    {
      provide:provideAppInitializer,
      useFactory:initializeAppFactory,
      deps:[LoadingService],
      multi:true
    }
  ]
};
// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideNzI18n(zh_CN), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()]
// };
