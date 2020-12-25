import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PerfilComponent } from './components/perfil/perfil.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'inicio'},
  {path: 'login', component: LoginComponent },
  {path: 'inicio', component: InicioComponent },
  {path: 'personas', component: PersonasComponent },
  {path: 'perfil', component: PerfilComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
