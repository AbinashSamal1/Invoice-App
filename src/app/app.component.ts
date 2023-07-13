import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


class Product {
  name!: string;
  price!: number;
  qty!: number;
}
class Invoice {
  customerName!: string;
  address!: string;
  contactNo!: number;
  email!: string;

  products: Product[] = [];
  additionalDetails!: string;
  constructor() {
    // Initially one empty product row we will show 
    this.products.push(new Product());
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form!: FormGroup;
  last: boolean = true
  Date = new Date().toISOString().substring(0, 10);
  showPreview: boolean = false
  showForm: boolean = true;


  constructor(
    private fb: FormBuilder, private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      currentDate: [this.Date],
      date: ['', Validators.required],
      services: this.fb.array([]),
    });

    this.addServiceDetailsRow();
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

  getSubTotal(): number {
    // Calculate the subtotal based on the values in the service details rows
    let subtotal = 0;
    for (const row of this.services.controls) {
      const qty = row.get('qty')?.value;
      const price = row.get('price')?.value;
      subtotal += qty * price;
    }
    return subtotal;
  }

  getGST(): number {
    // Calculate GST based on the subtotal
    const gstPercentage = 0.18; // 18% GST rate
    return this.getSubTotal() * gstPercentage;
  }

  getGrandTotal(): number {
    // Calculate grand total including GST
    return this.getSubTotal() + this.getGST();
  }
  preview() {
    const formData = this.form.value;
    this.showForm = false;
    this.showPreview = true
    console.log(formData)
  }

}
