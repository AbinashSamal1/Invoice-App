import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {

  showButton = true;
  @Input() formData: any = {};
  totalQuantity!: number;
  @ViewChild("content", { static: false }) content!: ElementRef;

  constructor() { }
  ngOnInit(): void { }

  calculateTotalQuantity(): number {
    let totalQuantity = 0;
    for (const item of this.formData.services) {
      totalQuantity += parseInt(item.qty, 10); // Parse the quantity as an integer
    }
    return totalQuantity;
  }

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

  // new

  gPDF() {
    const pageWidth = 210; // A4 size width in points (1 point = 1/72 inch)

    const contentElement: any = document.getElementById('printable-content');
    const contentWidth = contentElement.offsetWidth;
    const contentHeight = contentElement.offsetHeight;

    // Calculate the required height of the content
    const requiredHeight = (contentHeight / contentWidth) * pageWidth;

    // Create a new jsPDF instance with the adjusted page height
    const pdf = new jsPDF('p', 'px', [pageWidth, requiredHeight]);

    // Convert the HTML element to a canvas and add it to the PDF with auto scaling
    pdf.html(contentElement, {
      x: 0,
      y: 0,
      html2canvas: { scale: contentWidth / pageWidth },
      callback: (pdf) => {
        // Save the PDF with a file name
        pdf.save('invoice.pdf');
      }
    });
  }

  // another approach

  async downloadPdf(): Promise<void> {
    const element: any = document.getElementById('printable-content');
    const pdfDoc = new jsPDF();

    // Convert the HTML content to an image using html2canvas and dom-to-image
    const pdfWidth = 210;
    const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;

    // Convert the HTML content to an image using html2canvas and dom-to-image
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Add the image to the PDF with calculated dimensions
    pdfDoc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdfDoc.save('Techriff-Invoice.pdf');
  }


  // another method
  async downPdf(): Promise<void> {
    const pdf = new jsPDF();

    const element: any = document.getElementById('printable-content');
    // Get the printable content element

    // Convert the HTML content to a canvas
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Add the canvas image to the PDF
      pdf.addImage(imgData, 'PNG', 0, 0, 210, pdf.internal.pageSize.getHeight(), 'FAST');

      // Save the PDF
      pdf.save('techriff_invoice.pdf');
    });

  }

}