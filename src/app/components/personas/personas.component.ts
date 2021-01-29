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

  seguir(followId: string): void {
    const seguidor = new Seguidor();
    const idUsuario: string = "600c913aa09e800248164284"
    seguidor.user = idUsuario;
    seguidor.followed = followId;
    this.followService.crear(seguidor).subscribe(follow => {
      Swal.fire('Usuario seguido: ',
        'Usuario seguido con éxito',
        'success');

      // refrescar lista
      // this.refrescarLista();
      // this.textoNuevaPublicacion = "";
    },
      estado => {
        if (estado.status === 500) {
          const mensaje = estado.error.message as string;
          if (mensaje.indexOf('ConstraintViolationException') > 1) {
            Swal.fire(
              '¡Ha ocurrido algo inesperado!',
              'No se ha podido realizar el seguiminento',
              'error'
            );
          }
        }
      });
  }

}
