import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GeneralInterceptorService } from '@core/interceptors';
import { DashboardModule } from '@modules/dashboard/dashboard.module';
import { LoginModule } from '@modules/login/login.module';
import { FooterModule } from '@shared/footer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalConfirmModule } from '@core/modal-confirm';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    NgxSpinnerModule,
    ModalConfirmModule,
    LoginModule,
    DashboardModule,
    FooterModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
