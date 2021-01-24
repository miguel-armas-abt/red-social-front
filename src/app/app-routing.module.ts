import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import {Appmodule2Component} from './components/appmodule2/appmodule2.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent },
  { path: 'appmodule2', component: Appmodule2Component, children : [
    { path: '', component: InicioComponent, outlet: 'cuerpo' },
    { path: 'inicio', component: InicioComponent, outlet: 'cuerpo' },  
    { path: 'personas', component: PersonasComponent, outlet: 'cuerpo' },
    { path: 'perfil', component: PerfilComponent, outlet: 'cuerpo' }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
