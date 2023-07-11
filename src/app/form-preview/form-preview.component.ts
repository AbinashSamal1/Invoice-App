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
    return this.getSubTotal() * gstPercentage;
  }

  getSubTotal(): number {
    // Calculate the subtotal based on the values in the service details rows
    let subtotal = 0;
    for (const service of this.formData.services) {
      subtotal += service.qty * service.price;
    }
    return subtotal;
  }

  getGrandTotal(): number {
    // Calculate grand total including GST
    return this.getSubTotal() + this.getGST();
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
