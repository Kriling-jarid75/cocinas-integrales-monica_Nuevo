import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-viewe-dialog-componente',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './pdf-viewe-dialog-componente.component.html',
  styleUrl: './pdf-viewe-dialog-componente.component.css'
})
export class PdfVieweDialogComponenteComponent {

  pdfUrl!: SafeResourceUrl;

  constructor(
    public dialogRef: MatDialogRef<PdfVieweDialogComponenteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string, title: string },
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // Sanitiza la URL para que Angular confíe en ella y permita cargarla en el iframe
    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
  }

  onClose(): void {
    this.dialogRef.close();
  }

}
