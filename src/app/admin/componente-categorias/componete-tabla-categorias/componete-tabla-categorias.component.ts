import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModeloCategorias } from '../../../models/productos/productos.module';
import { ComponenteSinConexionComponent } from "../../../shared/componente-sin-conexion/componente-sin-conexion.component";
import { OnlineServiceService } from '../../../services/online-service.service';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import Swal from 'sweetalert2';
import { API_RESPONSE_CODES } from '../../../shared/codigosDeRespuesta/codigosDeRespuesta';
import { MatSort } from '@angular/material/sort';
import { ComponeteEditarCategoriasComponent } from '../componete-editar-categorias/componete-editar-categorias.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-componete-tabla-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ComponenteSinConexionComponent
  ],
  templateUrl: './componete-tabla-categorias.component.html',
  styleUrl: './componete-tabla-categorias.component.css'
})

export class ComponeteTablaCategoriasComponent {


  displayedColumns: string[] = ['idRegistro', 'nombreCategoria', 'Acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<ModeloCategorias>([]);
  readonly dialog = inject(MatDialog);
  online = true;
  isLoading = true;

  constructor(
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService
  ) { }


  ngOnInit() {
    this.validarInternet();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
      if (status) this.cargarCategorias();
    });

  }
  cargarCategorias() {
    this.isLoading = true;
    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          this.dataSource.data = response.data;
          console.log("Mostramos el valor " + JSON.stringify(this.dataSource.data));
          this.isLoading = false;
        }

        if (response.code === API_RESPONSE_CODES.NO_CONTENT) {
          Swal.fire({
            icon: 'info',
            title: 'No hay categorias registradas',
          });
          this.dataSource.data = [];
          this.isLoading = false;
        }
      },
      error: () => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  // EDITAR
  updateCategoria(categoria: ModeloCategorias) {
    const dialogRef = this.dialog.open(ComponeteEditarCategoriasComponent, {
      data: { categoria }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') this.cargarCategorias();
    });

  }

  // ELIMINAR
  deleteCategoria(categoria: ModeloCategorias) {
    Swal.fire({
      title: "¿Estás seguro de querer borrarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, borrar registro!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) this.borrado(categoria);
    });
  }

  borrado(categoria: ModeloCategorias) {
    this.isLoading = true;
    this.service.eliminarCategoria(categoria).subscribe({
      next: (data) => {
        if (data.code === API_RESPONSE_CODES.SUCCESS) {
          Swal.fire({
            icon: 'success',
            title: `Se eliminó correctamente la categoría: ${categoria.nombreCategoria}`,
            text: data.message
          });

         

          this.cargarCategorias();


        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al eliminar la categoría',
            text: data.message
          });
          this.isLoading = false;
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
        this.isLoading = false;
      }
    });
  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
