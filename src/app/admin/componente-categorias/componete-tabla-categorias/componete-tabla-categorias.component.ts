import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ComponeteEditarCategoriasComponent } from '../componete-editar-categorias/componete-editar-categorias.component';
import { MatDialog } from '@angular/material/dialog';
import { ModeloCategorias } from '../../../models/productos/productos.module';
import { ServicioProductosService } from '../../../services/servicio-productos.service';
import { ComponenteSinConexionComponent } from '../../../shared/componente-sin-conexion/componente-sin-conexion.component';
import { OnlineServiceService } from '../../../services/online-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componete-tabla-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
     ComponenteSinConexionComponent],
  templateUrl: './componete-tabla-categorias.component.html',
  styleUrl: './componete-tabla-categorias.component.css'
})
export class ComponeteTablaCategoriasComponent {

  readonly dialog = inject(MatDialog);

  isLoading = true; // Inicializa el spinner visible
  productos: ModeloCategorias[] = [];
  errorMessage: string | null = null;
  // Config paginador
  pageSize = 6;               // productos por página
  currentPage = 0;            // página inicial
  pageSizeOptions = [6, 12, 18];
  pagedProductos: any[] = [];

  displayedColumns: string[] = ['idRegistro', 'nombreCategoria', 'Acciones'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  online = true;

  constructor(private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.validarInternet();
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
      if (status) this.cargarProductos();
    });
  }

  cargarProductos() {
    this.isLoading = true; // activamos loading cada vez que vamos a buscar
    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        // Si tu backend devuelve GenericResponse<List<Productos>>:
        if (response.code === 200) {
          setTimeout(() => {
            this.productos = response.data; // 'data' viene del backend
            //this.dataSource = new MatTableDataSource(this.productos);

            console.log("Mostramos la data de la tabla " + JSON.stringify(this.productos));
            this.currentPage = 0;
            this.updatePage();
            this.isLoading = false; // desactivamos cuando ya cargó
          }, 3000);
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Error al cargar productos.';

        // 👇 Opcional: también mostrar SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });
  }







  updatePage() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    // ✅ Cortamos la lista de acuerdo al paginador
    this.pagedProductos = this.productos.slice(start, end);
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePage();
  }

  //Editar Producto
  updateCategoria(categoria: ModeloCategorias) {
    const dialogRef = this.dialog.open(ComponeteEditarCategoriasComponent, {
      data: {
        categoria: categoria,
      }
    });

    // Espera a que se cierre el diálogo
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'updated') {
        // 👇 Refresca la tabla
        this.cargarProductos();
      }
    });
  }

  deleteCategoria(elemento: any) {

  }

}

export interface PeriodicElement {
  nombreCategoria: string;
  idRegistro: number;
  descripcionCategoria: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { idRegistro: 1, nombreCategoria: 'Hydrogen', descripcionCategoria: "1.0079", symbol: 'H' },
  { idRegistro: 2, nombreCategoria: 'Helium', descripcionCategoria: "4.0026", symbol: 'He' },
  { idRegistro: 3, nombreCategoria: 'Lithium', descripcionCategoria: "6.941", symbol: 'Li' },
  { idRegistro: 4, nombreCategoria: 'Beryllium', descripcionCategoria: "9.0122", symbol: 'Be' },
  { idRegistro: 5, nombreCategoria: 'Boron', descripcionCategoria: "10.811", symbol: 'B' },
  { idRegistro: 6, nombreCategoria: 'Carbon', descripcionCategoria: "12.0107", symbol: 'C' },
  { idRegistro: 7, nombreCategoria: 'Nitrogen', descripcionCategoria: "14.0067", symbol: 'N' },
  { idRegistro: 8, nombreCategoria: 'Oxygen', descripcionCategoria: "15.9994", symbol: 'O' },
  { idRegistro: 9, nombreCategoria: 'Fluorine', descripcionCategoria: "18.9984", symbol: 'F' },
  { idRegistro: 10, nombreCategoria: 'Neon', descripcionCategoria: "20.1797", symbol: 'Ne' },
  { idRegistro: 11, nombreCategoria: 'Sodium', descripcionCategoria: "22.9897", symbol: 'Na' },
  { idRegistro: 12, nombreCategoria: 'Magnesium', descripcionCategoria: "24.305", symbol: 'Mg' },
  { idRegistro: 13, nombreCategoria: 'Aluminum', descripcionCategoria: "26.9815", symbol: 'Al' },
  { idRegistro: 14, nombreCategoria: 'Silicon', descripcionCategoria: "28.0855", symbol: 'Si' },
  { idRegistro: 15, nombreCategoria: 'Phosphorus', descripcionCategoria: "30.9738", symbol: 'P' },
  { idRegistro: 16, nombreCategoria: 'Sulfur', descripcionCategoria: "32.065", symbol: 'S' },
  { idRegistro: 17, nombreCategoria: 'Chlorine', descripcionCategoria: "35.453", symbol: 'Cl' },
  { idRegistro: 18, nombreCategoria: 'Argon', descripcionCategoria: "39.948", symbol: 'Ar' },
  { idRegistro: 19, nombreCategoria: 'Potassium', descripcionCategoria: "39.0983", symbol: 'K' },
  { idRegistro: 20, nombreCategoria: 'Calcium', descripcionCategoria: "40.078", symbol: 'Ca' },
];


