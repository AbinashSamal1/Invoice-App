import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { DatePipe } from '@angular/common';
import { DateTransformPipe } from './date-transform.pipe';
import { NgxPrintModule } from 'ngx-print';
import { LoginComponent } from './login/login.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPreviewComponent,
    DateTransformPipe,
    LoginComponent,
    InvoiceFormComponent,
    PreviewFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, ReactiveFormsModule, FormsModule, NgxPrintModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
