import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mensaje } from '../../models/mensaje';

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
  public modalRef: MatDialogRef<ChatmodalComponent>) { }

  ngOnInit(): void {
    this.mensajesEnviados = this.data.msgEnviados as Mensaje[],
    this.mensajesRecibidos = this.data.msgRecibidos as Mensaje[]
    console.log("Desde el modal");
    console.log(this.mensajesEnviados);
    console.log(this.mensajesRecibidos);
  }

  cancelar(): void{
    this.modalRef.close();
  }

  enviarMensaje() {

  }

}
