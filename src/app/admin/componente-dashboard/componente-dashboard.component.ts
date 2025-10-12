import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ProductosModuleCocinasNuevos } from '../../models/productos/productos.module';
import { ServicioProductosService } from '../../services/servicio-productos.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../componente-registro-productos/editar-producto/editar-producto.component';
import Swal from 'sweetalert2';
import { Producto } from '../../../../../../Angular/app-angular/src/app/Models/producto/producto.module';

@Component({
  selector: 'app-componente-dashboard',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule],
  templateUrl: './componente-dashboard.component.html',
  styleUrl: './componente-dashboard.component.css'
})
export class ComponenteDashboardComponent {

  readonly dialog = inject(MatDialog);
  isLoading = true; // Inicializa el spinner visible
  productos: ProductosModuleCocinasNuevos[] = [];
  errorMessage: string | null = null;

  displayedColumns: string[] = ['nombre', 'descripcion', 'categoria', 'precio', 'acciones'];
  dataSource = new MatTableDataSource<ProductosModuleCocinasNuevos>([]);

  /*  @ViewChild(MatPaginator) paginator!: MatPaginator; */

  // Config paginador
  pageSize = 6;               // productos por página
  currentPage = 0;            // página inicial
  pageSizeOptions = [6, 12, 18];
  pagedProductos: any[] = [];

  constructor(private service: ServicioProductosService) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.isLoading = true; // activamos loading cada vez que vamos a buscar
    this.service.listarProductos().subscribe({
      next: (response) => {
        // Si tu backend devuelve GenericResponse<List<Productos>>:
        if (response.code === 200) {
          setTimeout(() => {
            this.productos = response.data; // 'data' viene del backend
            //this.dataSource = new MatTableDataSource(this.productos);
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
  updateProduct(producto: ProductosModuleCocinasNuevos) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      data: {
        producto: producto,
        // categoria:this.categoriaSeleccionada

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


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteProduct(producto: ProductosModuleCocinasNuevos) {
    Swal.fire({
      title: "Estas seguro de querer borrarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar registro!",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.borrado(producto);
        Swal.fire({
          title: "Eliminado!",
          text: "El producto fue eliminado",
          icon: "success"
        });
      }
    });
  }

  borrado(producto: ProductosModuleCocinasNuevos) {
    this.service.eliminarProducto(producto).subscribe({
      next: (data) => {
        if (data.code === 200) {
          Swal.fire({
            icon: 'success',
            title: `Se eliminó correctamente el producto: ${producto.nombre}`,
            text: data.message
          });
          this.pagedProductos = this.pagedProductos.filter(item => item.id !== producto.id);
          this.cargarProductos();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Ocurrió un error al eliminar el producto',
            text: data.message
          });
        }
      },
      error: (err) => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Error en la conexión con el servidor',
        });
      }
    });

  }
}
