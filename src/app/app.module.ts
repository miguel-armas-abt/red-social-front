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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Appmodule2Component } from './components/appmodule2/appmodule2.component';
import { interceptorProvider } from './interceptors/token-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import { ChatmodalComponent } from './components/chatmodal/chatmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PersonasComponent,
    LoginComponent,
    PerfilComponent,
    Appmodule2Component,
    ChatmodalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   // AppRoutinModule para navegar entre componentes
    UtilsModule,        // UtilsModule contiene utilidades como el navbar
    HttpClientModule, // HttpClientModule para consumir solicitudes HTTP REST
    FontAwesomeModule,   //iconos 
    FormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule,
    MatTableModule
    
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
