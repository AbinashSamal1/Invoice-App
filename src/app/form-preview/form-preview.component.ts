import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import jspdf from 'jspdf';
import domtoimage from 'dom-to-image'


@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent {

  @Input() formData: any;

  getGST(): number {
    // Calculate GST based on the subtotal
    const gstPercentage = 0.18; // Assuming an 18% GST rate
    const gstAmount = this.getSubTotal() * gstPercentage;

    // Format the GST amount with compulsory two decimal places
    const formattedGST = gstAmount.toFixed(2);

    return Number(formattedGST);
  }

  getSubTotal(): number {
    // Calculate the subtotal based on the values in the service details rows
    let subtotal = 0;
    for (const service of this.formData.services) {
      subtotal += service.qty * service.price;
    }

    // Format the subtotal with compulsory two decimal places
    const formattedSubtotal = subtotal.toFixed(2);

    return Number(formattedSubtotal);
  }

  getGrandTotal(): number {
    // Calculate grand total including GST
    const grandTotal = this.getSubTotal() + this.getGST();

    // Format the grand total with compulsory two decimal places and leading zeros
    const formattedGrandTotal = grandTotal.toFixed(2).padStart(7, '0');

    return Number(formattedGrandTotal);
  }

  convertToPDF() {
    const data = document.getElementById('printable-content')!;

    domtoimage.toPng(data, { quality: 1, width: data.scrollWidth, height: data.scrollHeight }).then((url: any) => {
      const pdf = new jspdf('p', 'mm', 'a4');
      const pdfWidth = 210; // A4 page width in mm
      const pdfHeight = (data.scrollHeight * pdfWidth) / data.scrollWidth;
      pdf.addImage(url, 'PNG', 0, 0, pdfWidth, pdfHeight, '', 'FAST');
      pdf.save('new-file.pdf');
    }).catch((error: any) => {
      console.error('Error converting to PNG:', error);
    });
  }
  
}
