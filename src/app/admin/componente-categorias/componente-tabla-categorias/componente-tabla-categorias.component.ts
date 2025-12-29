import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ModeloCategorias } from '../../../models/productos/productos.module';
import { MatDialog } from '@angular/material/dialog';
import { OnlineServiceService } from '../../../services/online-service.service';
import { ServicioProductosService } from '../../../services/servicio-general.service';
import { API_RESPONSE_CODES } from '../../../shared/codigosDeRespuesta/codigosDeRespuesta';
import Swal from 'sweetalert2';
import { ComponeteEditarCategoriasComponent } from '../componete-editar-categorias/componete-editar-categorias.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ComponenteSinConexionComponent } from "../../../shared/componente-sin-conexion/componente-sin-conexion.component";
import { CommonModule } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';



@Component({
  selector: 'app-componente-tabla-categorias',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    ComponenteSinConexionComponent,
    CommonModule,
    MatCheckboxModule],
  templateUrl: './componente-tabla-categorias.component.html',
  styleUrl: './componente-tabla-categorias.component.css'
})
export class ComponenteTablaCategoriasComponent {
  /* displayedColumns: string[] = ['position', 'name', 'weight', 'symbol']; */

  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  dato = 'Esta categoría está asignada a un producto. Debe eliminar el producto relacionado.';

  displayedColumns: string[] = ['idRegistro', 'nombreCategoria', 'Acciones', 'EliminacionMasiva'];
  /* data: ModeloCategorias[] = []; */
  dataSource = new MatTableDataSource<ModeloCategorias>([]);
  selection = new SelectionModel<ModeloCategorias>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  online = true;
  isLoading = true;

  cantidadSeleccionados = 0;
  mostrarBotonEliminarMasivo = false;

  constructor(
    private service: ServicioProductosService,
    private serviceSinConexion: OnlineServiceService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.validarInternet();
  }

  validarInternet() {
    this.serviceSinConexion.online$.subscribe(status => {
      this.online = status;
      if (status) this.cargarCategorias();
    });
  }

   // Opcional: Actualizar el contador de seleccionados cada vez que cambia la selección
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // Suscribirse a los cambios de selección para actualizar las variables de contador y visibilidad
    this.selection.changed.subscribe(() => {
      this.cantidadSeleccionados = this.selection.selected.length;
      // Actualizamos la visibilidad del botón cada vez que la selección cambia
      // El botón solo debe mostrarse si hay elementos seleccionados Y si todos los seleccionables están marcados
      this.mostrarBotonEliminarMasivo = this.selection.hasValue() && this.isAllSelected();
    });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarCategorias() {
    this.isLoading = true;
    this.service.obtenerCategorias().subscribe({
      next: (response) => {
        if (response.code === API_RESPONSE_CODES.SUCCESS) {
          setTimeout(() => {
            this.showRecords(response.data);
            console.log("Mostramos la data " + JSON.stringify(response.data));

            this.isLoading = false;
          }, 1200);
        }

        if (response.code === API_RESPONSE_CODES.NO_CONTENT) {
          Swal.fire({ icon: 'info', title: 'No hay categorías registradas' });
          this.refreshSolicitudes();
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

  //PAGINADOR
  showRecords(data: any) {
    if (data != null) {
      this.dataSource = new MatTableDataSource<ModeloCategorias>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      this.refreshSolicitudes();
    }
  }

  refreshSolicitudes(): void {
    const data: any = '';
    this.dataSource = new MatTableDataSource<ModeloCategorias>(data);
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
    this.service.eliminarCategoria(categoria.idCategoria).subscribe({
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

    /** Si el número de elementos seleccionados coincide con el número total de filas *habilitadas*. */
  isAllSelected() {
    // Primero, filtramos solo los registros que están habilitados (no están 'enUso')
    const numRows = this.dataSource.data.filter(row => !row.enUso).length;
    const numSelected = this.selection.selected.length;
    // Comprobamos si todos los habilitados están seleccionados
    return numSelected === numRows;
  }

 /** Selecciona todas las filas habilitadas si no están todas seleccionadas; de lo contrario, borra la selección. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    // Iteramos solo sobre los datos que NO están 'enUso' y los seleccionamos.
    this.dataSource.data.forEach(row => {
      if (!row.enUso) {
        this.selection.select(row);
      }
    });
  }

 // Define la función que manejará el clic del nuevo botón masivo

 eliminarCategoriasMasivamente(){
   const categoriasSeleccionadas = this.selection.selected;
    console.log("Eliminando categorías:", categoriasSeleccionadas);

   Swal.fire({
      title: "¿Estás seguro de eliminar todas las categorias?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlas !",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) this.eliminarTodas(categoriasSeleccionadas);
    });
 }


  eliminarTodas(categoriasSeleccionadas: ModeloCategorias[]) {

    //const idsSeleccionados = categoriasSeleccionadas.map(c => c.idCategoria);


    console.log("Eliminando categorías:", categoriasSeleccionadas);
    // Aquí puedes añadir tu lógica de Swal y llamada al servicio para la eliminación masiva.
    // Por ejemplo:
    this.service.eliminarVariasCategorias(categoriasSeleccionadas).subscribe({
      next: (data) => {
        if (data.code === API_RESPONSE_CODES.SUCCESS) {
          Swal.fire({
            icon: 'success',
            title: `Se eliminaron todas las categorias`,
            text: data.message
          });

          this.mostrarBotonEliminarMasivo = false;
          this.cargarCategorias();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al eliminar todas las categorias',
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

  /** Devuelve la etiqueta de aria-label para el encabezado/fila. */
  checkboxLabel(row?: ModeloCategorias): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.idCategoria}`;
  }

  // Puedes usar this.selection.selected para ver los elementos elegidos.
  obtenerSeleccionados() {
    console.log(this.selection.selected);
  }


  /*  */


}
