import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // todas las publicaciones 
  publicaciones: Publicacion[];

  // las instancias se inyectan mediante constructor
  // PublicacionService para que el componente pueda consumir los servicios de la API /publicaciones
  constructor(private service: PublicacionService) { }

  ngOnInit(): void {
    // toda la comunicacion con el backend se inicializa en el ngOnInit

    // obtengo las publicaciones de forma reactiva
    // this.service.listar().subscribe(publicaciones => {
    //   this.publicaciones = publicaciones;
    // });
  }

}