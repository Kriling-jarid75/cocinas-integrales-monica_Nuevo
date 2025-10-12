import { Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';
import { LoginGuard } from './guards/LoginGuard';
import { ComponenteRegistroProductosComponent } from './admin/componente-registro-productos/componente-registro-productos.component';
import { VisualizacionProductosClienteComponent } from './paginaInicial/visualizacion-productos-cliente/visualizacion-productos-cliente.component';
import { PaginaNoEncontrada2Component } from './pagina-no-encontrada-2/pagina-no-encontrada-2.component';

export const routes: Routes = [
  // Público
  { path: '', loadComponent: () => import('./paginaInicial/home/home.component').then(m => m.HomeComponent) },
 /*  { path: 'productos/:categoria', component: VisualizacionProductosClienteComponent }, */
  { path: 'paginaEnConstruccion', component: PaginaNoEncontrada2Component },
  {
    path: 'login',
    loadComponent: () => import('./login/inicio-sesion/inicio-sesion.component').then(m => m.InicioSesionComponent),
    canActivate: [LoginGuard]
  },

  // Admin (privado)
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard],
    data: { rol: 'ADMIN' },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/componente-dashboard/componente-dashboard.component').then(m => m.ComponenteDashboardComponent)  },
      { path: 'productos/registro', loadComponent: () => import('./admin/componente-registro-productos/componente-registro-productos.component').then(m => m.ComponenteRegistroProductosComponent) },
      { path: 'categorias/registro', loadComponent: () => import('./admin/componente-categorias/componente-categorias.component').then(m => m.ComponenteCategoriasComponent) },
    ]
  },

  { path: '**', redirectTo: '' }
];
