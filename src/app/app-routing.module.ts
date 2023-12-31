import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { LoginComponent } from './login/login.component';
import { InvoiceFormComponent } from './invoice-form/invoice-form.component';
import { invoiceGuard } from './guards/invoice.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'invoice', component: InvoiceFormComponent, canActivate: [invoiceGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
