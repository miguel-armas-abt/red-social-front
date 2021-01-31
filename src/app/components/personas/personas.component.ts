import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { FollowService } from '../../services/follow.service';
import { MatDialog } from '@angular/material/dialog';
import { Seguidor } from '../../models/seguidor';
import Swal from 'sweetalert2';
import { ChatmodalComponent } from '../chatmodal/chatmodal.component';
import { MensajeService } from '../../services/mensaje.service';
import { AuthService } from '../../services/auth.service';
import { Mensaje } from '../../models/mensaje';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  usuarios: Usuario[];
  // mensajesEnviados: Mensaje[] = [];
  // mensajesRecibidos: Mensaje[] = [];

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private mensajeService: MensajeService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  enviarMensaje(usuarioDestinoId: string): void {
    let mensajesEnviados = this.mensajeService.obtenerMensajesEnviados(
      this.authService.usuario.sub,
      usuarioDestinoId
    );
 

    /*let mensajesRecibidos = this.mensajeService.obtenerMensajesRecibidos(
      usuarioDestinoId,
      this.authService.usuario.sub
    )*/

    const modalRef = this.dialog.open(ChatmodalComponent, {
      width: '750px',
      data: { msgEnviados: mensajesEnviados, usuarioReceptorId: usuarioDestinoId}
    });





  }

}
