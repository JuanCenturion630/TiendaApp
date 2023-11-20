import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./pages/agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'funcionalidades',
    loadChildren: () => import('./pages/funcionalidades/funcionalidades.module').then( m => m.FuncionalidadesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./pages/crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'ver-productos',
    loadChildren: () => import('./pages/ver-productos/ver-productos.module').then( m => m.VerProductosPageModule)
  },
  {
    path: 'olvide-password',
    loadChildren: () => import('./pages/olvide-password/olvide-password.module').then( m => m.OlvidePasswordPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
