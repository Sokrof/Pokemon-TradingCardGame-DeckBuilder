import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './_core/footer/footer.component';
import { NavComponent } from './_core/nav/nav.component';
import { LoginComponent } from './components/login/login.component';
-LoginComponent
import { RegistroComponent } from './components/registro/registro.component';
-RegistroComponent
import { TitlePageComponent } from 'src/shared/title-page/title-page.component';
-TitlePageComponent

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NavComponent,
    FooterComponent,
    TitlePageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
