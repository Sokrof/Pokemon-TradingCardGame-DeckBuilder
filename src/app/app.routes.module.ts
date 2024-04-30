import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent }, // Ruta para la página de inicio
  { path: 'login', component: LoginComponent }, // Ruta para el LoginComponent
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // Ruta por defecto, redirige '/' a '/inicio'
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
