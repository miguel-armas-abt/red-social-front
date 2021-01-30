import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mensaje } from '../../models/mensaje';
import { MensajeService } from '../../services/mensaje.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chatmodal',
  templateUrl: './chatmodal.component.html',
  styleUrls: ['./chatmodal.component.css']
})
export class ChatmodalComponent implements OnInit {

  mensajesEnviados: Mensaje[];
  mensajesRecibidos: Mensaje[];
  textoNuevoMensaje: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public modalRef: MatDialogRef<ChatmodalComponent>,
  private mensajeService: MensajeService,
  private authService: AuthService) { }

  ngOnInit(): void {
    this.refrescarMensajes();
  }

  cancelar(): void{
    this.modalRef.close();
  }

  enviarMensaje() {
    let usuarioReceptorId = this.mensajesEnviados[0].idReceiverUser;
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
    this.mensajesEnviados = this.data.msgEnviados as Mensaje[];
    this.mensajesRecibidos = this.data.msgRecibidos as Mensaje[];
  }

}
