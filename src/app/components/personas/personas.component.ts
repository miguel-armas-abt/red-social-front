import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.service.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
