import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'ngx-moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import * as moment from 'moment';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastrModule } from 'ngx-toastr';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { CustomDateAdapter } from '@shared/tools/adapters/custom-date-adapter';
import { Guards, Interceptors } from '@shared/tools';
import { PagintorService } from '@shared/services';
import { LayoutsModule } from './layouts/layouts.module';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import {MDBBootstrapModule, WavesModule} from "angular-bootstrap-md";
import { MY_EXTENTION } from '@privateLayout/shared/services/viewer-extentions/IMyExtention';
import { MyExtension } from '@privateLayout/shared/services/viewer-extentions/my-extension';
import { MyExtension1 } from '@privateLayout/shared/services/viewer-extentions/my-extension1';
import { MY_EXTENTION1 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention1';
import { MyExtension2 } from '@privateLayout/shared/services/viewer-extentions/my-extension2';
import { MY_EXTENTION2 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention2';
import { MY_EXTENTION3 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention3';
import { MyExtension3 } from '@privateLayout/shared/services/viewer-extentions/my-extension3';
import { MY_EXTENTION4 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention4';
import { MyExtension4 } from '@privateLayout/shared/services/viewer-extentions/my-extension4';
import { MY_EXTENTION5 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention5';
import { MY_EXTENTION6 } from '@privateLayout/shared/services/viewer-extentions/IMyExtention6';
import { MyExtension5 } from '@privateLayout/shared/services/viewer-extentions/my-extension5';
import { MyExtension6 } from '@privateLayout/shared/services/viewer-extentions/my-extension6';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    NgIdleKeepaliveModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 3000 }),
    BrowserModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      isolate: false,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MDBBootstrapModule.forRoot(),
    MomentModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentModule.forRoot(),
    WavesModule,
    LayoutsModule,
    AppSharedModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    ...Guards,
    ...Interceptors,
    {provide: MY_EXTENTION, useClass: MyExtension},
    {provide: MY_EXTENTION1, useClass: MyExtension1},
    {provide: MY_EXTENTION2, useClass: MyExtension2},
    {provide: MY_EXTENTION3, useClass: MyExtension3},
    {provide: MY_EXTENTION4, useClass: MyExtension4},
    {provide: MY_EXTENTION5, useClass: MyExtension5},
    {provide: MY_EXTENTION6, useClass: MyExtension6},
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PagintorService();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    },
    // MAT_DATE_LOCALE_PROVIDER,
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['YYYY-MM-DD HH:mm:ss.S', 'l', 'LL', moment.ISO_8601]
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY'
        }
      }
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['YYYY-MM-DD HH:mm:ss.S', 'LTS', 'LL', moment.ISO_8601]
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'YYYY'
        }
      }
    }
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
