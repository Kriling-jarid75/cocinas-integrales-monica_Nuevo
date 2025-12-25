import { Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';
import { LoginGuard } from './guards/LoginGuard';
import { PaginaNoEncontrada2Component } from './shared/pagina-no-encontrada-2/pagina-no-encontrada-2.component';
import { PaginaNoEncontradaComponent } from './shared/pagina-no-encontrada/pagina-no-encontrada.component';

export const routes: Routes = [
  // Público
  {
    path: '', loadComponent: () =>
      import('./paginaInicial/home/home.component').then(m => m.HomeComponent),
    canActivate: [LoginGuard]

  },
  { path: 'paginaEnConstruccion', component: PaginaNoEncontrada2Component },
  {
    path: 'login', loadComponent: () =>
      import('./shared/inicio-sesion-admins/inicio-sesion-admins.component').
        then(m => m.InicioSesionAdminsComponent),
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
      { path: 'dashboard', loadComponent: () => import('./admin/componente-dashboard/componente-dashboard.component').then(m => m.ComponenteDashboardComponent) },
      { path: 'productos/registro', loadComponent: () => import('./admin/componente-registro-productos/componente-registro-productos.component').then(m => m.ComponenteRegistroProductosComponent) },
      { path: 'categorias/registro', loadComponent: () => import('./admin/componente-categorias/componente-categorias.component').then(m => m.ComponenteCategoriasComponent) },
      { path: 'categorias/listar', loadComponent: () => import('./admin/componente-categorias/componente-tabla-categorias/componente-tabla-categorias.component').then(m => m.ComponenteTablaCategoriasComponent) },
      { path: 'miPerfil', loadComponent: () => import('./admin/componente-mi-perfil/componente-mi-perfil.component').then(m => m.ComponenteMiPerfilComponent) },

    ]
  },

  { path: '**', component: PaginaNoEncontradaComponent }
];
