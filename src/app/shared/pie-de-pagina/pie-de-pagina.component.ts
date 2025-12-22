import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PdfVieweDialogComponenteComponent } from '../../paginaInicial/pdf-viewe-dialog-componente/pdf-viewe-dialog-componente.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-pie-de-pagina',
  standalone: true,
  imports: [],
  templateUrl: './pie-de-pagina.component.html',
  styleUrl: './pie-de-pagina.component.css'
})
export class PieDePaginaComponent {


  readonly dialog = inject(MatDialog);

  


  openPdfDialog(): void {
    const pdfSourceUrl = 'documents/CV_Profesional_KrilingJarid.pdf'; // Reemplaza con tu URL

    this.dialog.open(PdfVieweDialogComponenteComponent, {
      width: '800px', // Define el ancho del diálogo
      height: '600px', // Define el alto del diálogo
      data: {
        url: pdfSourceUrl,
        title: 'Vista Previa del Documento'
      }
    });
  }


  get obtenerFechaDelSistema() {
    let fecha = formatDate(new Date(), 'dd-MM-yyyy', 'en-MX')

    console.log(fecha);

    return fecha;
  }




}
