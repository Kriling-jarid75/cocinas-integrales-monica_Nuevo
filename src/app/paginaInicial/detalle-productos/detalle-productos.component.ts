import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-detalle-productos',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatTabsModule],
  templateUrl: './detalle-productos.component.html',
  styleUrl: './detalle-productos.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleProductosComponent {

   producto: any;
  categoria: string;

  constructor(
    public dialogRef: MatDialogRef<DetalleProductosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
     this.producto = data.producto;
    this.categoria = data.categoria;
   }


  onImagenError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'icons/no-disponible.png';
  }


  cerrar(): void {
    this.dialogRef.close(); // 👈 puedes devolver algo si quieres
  }

}
