import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mensaje } from '../../models/mensaje';
import { MensajeService } from '../../services/mensaje.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.component.html',
  styleUrls: ['./chatmodal.component.css']
})
export class ChatmodalComponent implements OnInit {

  obsMensajesEnviados: Observable<Mensaje[]>;
  obsMensajesRecibidos: Observable<Mensaje[]>;
  textoNuevoMensaje: string;
  mensajesEnviados: Mensaje[] = [];
  mensajesRecibidos: Mensaje[] = [];
  nombreUsuarioEmisor: string = "";
  nombreUsuarioReceptor: string = "";
  usuarioReceptorId: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<ChatmodalComponent>,
  private mensajeService: MensajeService,
  private authService: AuthService,
  private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.refrescarMensajes();
    this.nombreUsuarioEmisor = this.authService.usuario.name;
    this.usuarioService.obtener(this.usuarioReceptorId).subscribe(usuarioReceptor => {
      this.nombreUsuarioReceptor = usuarioReceptor.name;
      console.log("USUARIO RECEPTOR: ");
      console.log(usuarioReceptor);
    });

  }

  cancelar(): void{
    this.modalRef.close();
  }

  enviarMensaje() {
    // let usuarioReceptorId = this.mensajesEnviados[0].idReceiverUser;
    let usuarioReceptorId = this.usuarioReceptorId;
    let usuarioEmisorId = this.authService.usuario.sub;
    const mensaje = new Mensaje();
    mensaje.idEmitterUser = usuarioEmisorId;
    mensaje.idReceiverUser = usuarioReceptorId;
    mensaje.text = this.textoNuevoMensaje;
    this.mensajeService.crear(mensaje).subscribe(mensaje => {
      Swal.fire('Mensaje enviado: ',
        'Mensaje enviado con éxito',
        'success');

      // refrescar lista
      this.refrescarMensajes();
      this.textoNuevoMensaje = "";
    },
      estado => {
        if (estado.status === 500) {
          const mensaje = estado.error.message as string;
          if (mensaje.indexOf('ConstraintViolationException') > 1) {
            Swal.fire(
              'Cuidado',
              'No se ha podido enviar el mensaje',
              'error'
            );
          }
        }
      });
  }

  refrescarMensajes(): void {
    this.obsMensajesEnviados = this.data.msgEnviados as Observable<Mensaje[]>;
    //this.obsMensajesRecibidos = this.data.msgRecibidos as Observable<Mensaje[]>;

    this.usuarioReceptorId = this.data.usuarioReceptorId as string;
    this.obsMensajesEnviados.subscribe(msgsEnviados => this.mensajesEnviados = msgsEnviados);
    //this.obsMensajesRecibidos.subscribe(msgsRecibidos => this.mensajesRecibidos = msgsRecibidos);
  }
}
