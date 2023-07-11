import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { DatePipe } from '@angular/common';
import { DateTransformPipe } from './date-transform.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormPreviewComponent,
    DateTransformPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, ReactiveFormsModule, FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
