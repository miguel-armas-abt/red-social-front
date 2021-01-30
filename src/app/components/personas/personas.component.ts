import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FollowService } from '../../services/follow.service';
import { Seguidor } from '../../models/seguidor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  usuarios: Usuario[];

  constructor(
    private usuarioService: UsuarioService,
    private followService: FollowService
    ) { }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

}
