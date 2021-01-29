import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],       // exporto el NavbarComponent
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class UtilsModule { }
