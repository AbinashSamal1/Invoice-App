import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

class Product {
  name!: string;
  price!: number;
  qty!: number;
}

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent {


  form!: FormGroup;
  last: boolean = true
  Date = new Date().toISOString().substring(0, 10);
  showPreview: boolean = false;
  showForm: boolean = true;

  subtotal: number = 0;
  taxRate: number = 0.18; // Assuming 18% tax rate
  tax: number = 0;
  total: number = 0;


  constructor(
    private fb: FormBuilder, private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      currentDate: [this.Date],
      date: ['', Validators.required],
      invoiceNo: ['', Validators.required],
      services: this.fb.array([]),
    });

    this.addServiceDetailsRow();

    this.form.valueChanges.subscribe(() => {
      this.updateTotalValues();
    });

    this.form.valueChanges.subscribe((value) => {
      console.log('Form value:', value);
    });

    // Subscribe to form statusChanges
    this.form.statusChanges.subscribe((status) => {
      console.log('Form status:', status);
    });
  }

  get services(): FormArray {
    return this.form.get('services') as FormArray;
  }

  addServiceDetailsRow() {
    const row = this.fb.group({
      service: ['', Validators.required],
      qty: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    });
    this.services.push(row);
  }

  removeServiceDetailsRow(index: number) {
    this.services.removeAt(index);
  }

  preview() {
    const formData = this.form.value;
    this.showForm = false; // Set showForm to false to hide the Invoice form
    this.showPreview = true; // Set showPreview to true to show the form-preview component
    console.log(formData);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  hasError(control: AbstractControl | null): any {
    return control?.invalid && (control?.dirty || control?.touched);
  }

  isFormInvalid(): boolean {
    return this.form.invalid || this.services.controls.some((control) => control.invalid);
  }
  getSubTotal(): number {
    let subtotal = 0;
    const servicesArray = this.form.get('services') as FormArray;
    for (const service of servicesArray.controls) {
      const qty = service.get('qty')?.value || 0;
      const price = service.get('price')?.value || 0;
      subtotal += qty * price;
    }
    return subtotal;
  }
  updateTotalValues() {
    this.subtotal = this.getSubTotal();
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }
}
