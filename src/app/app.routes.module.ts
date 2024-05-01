import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';

// ---- RUTAS ---- //
const routes: Routes = [
  { path: 'inicio', component: InicioComponent }, // Ruta para la página de inicio
  { path: 'login', component: LoginComponent }, // Ruta para el Login
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto, redirige '/' a '/inicio'
  { path: 'registro', component: RegistroComponent }, // Ruta para el Registro
];

// Importación del módulo RouterModule y configuración de las rutas principales
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa y configura las rutas principales
  exports: [RouterModule] // Exporta el módulo RouterModule para su uso en otros módulos
})
export class AppRoutingModule { } // Clase del módulo de enrutamiento de la aplicación

