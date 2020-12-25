import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PersonasComponent } from './components/personas/personas.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UtilsModule } from './utils/utils.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PersonasComponent,
    LoginComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   // AppRoutinModule para navegar entre componentes
    UtilsModule,        // UtilsModule contiene utilidades como el navbar
    HttpClientModule    // HttpClientModule para consumir solicitudes HTTP REST
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
