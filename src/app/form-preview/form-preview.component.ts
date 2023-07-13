import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent {
  @ViewChild('content') content!: ElementRef;

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

    console.log(formattedGrandTotal);
    return Number(formattedGrandTotal);
  }

  exportToPDF() {
    const content = document.getElementById('pdfContent') as HTMLElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('form_preview.pdf');
    });
  }

}
