import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion';
import { PublicacionCard } from '../../models/publicacion-card';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommentService } from '../../services/comment.service';
import { Comentario } from '../../models/comentario';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // todas las publicaciones 
  publicaciones: Publicacion[];
  publicacionesCards: PublicacionCard[] = [];

  nuevoComentario: Comentario;
  comentarios: string[] = [];

  textoNuevaPublicacion = "";
  nuevoComentarioText = "";

  panelOpenState = false;

  // las instancias se inyectan mediante constructor
  // PublicacionService para que el componente pueda consumir los servicios de la API /publicaciones
  constructor(
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService,
    private comentarioService: CommentService,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.refrescarLista();
  }

  refrescarLista(): void {
    // obtengo las publicaciones de forma reactiva
    this.publicacionesCards = [];
    this.publicacionService.listar().subscribe(publicaciones => {
       
      publicaciones.forEach(publicacion => {

         let publicacionCard = new PublicacionCard();
         publicacionCard.publicacion = publicacion;

         let usuario = this.usuarioService.obtener(publicacion.user_id)
             .subscribe(usuario => publicacionCard.usuario = usuario);

         let comentarios = this.comentarioService.obtenerPorPublicacion(publicacion._id)
             .subscribe(comentarios => publicacionCard.comentarios = comentarios);

         this.publicacionesCards.push(publicacionCard);
      });
    });
  }

  publicar(): void {
    const publicacion = new Publicacion();
    // const idUsuario: string = this.authService.usuario._id;
    const idUsuario: string = "600c913aa09e800248164284"
    publicacion.text = this.textoNuevaPublicacion;
    publicacion.user_id = idUsuario;
      
    this.publicacionService.crear(publicacion).subscribe(publicacion => {
      Swal.fire('Publicacion creada: ',
        'Publicacion creada con éxito',
        'success');

      // refrescar lista
      this.refrescarLista();
      this.textoNuevaPublicacion = "";
    },
      estado => {
        if (estado.status === 500) {
          const mensaje = estado.error.message as string;
          if (mensaje.indexOf('ConstraintViolationException') > 1) {
            Swal.fire(
              'Cuidado',
              'No se ha podido realizar la publicación',
              'error'
            );
          }
        }
      });
  }

  comentar(idUsuario: string, idPublicacion: string, cont): void {
    const nuevoComentario = new Comentario();
    // const idUsuario: string = this.authService.usuario._id;
    console.log(idUsuario);
    console.log(idPublicacion);

    nuevoComentario.postId = idPublicacion;
    nuevoComentario.userCommentId = "600c913aa09e800248164284";
    nuevoComentario.textComment = this.comentarios[cont];
     
    this.comentarioService.crear(nuevoComentario).subscribe(comentario => {
      Swal.fire('Comentario enviado: ',
        'Comentario enviado con éxito',
        'success');

      // refrescar lista
      this.refrescarLista();
      this.comentarios[cont] = "";
    },
      estado => {
        if (estado.status === 500) {
          const mensaje = estado.error.message as string;
          if (mensaje.indexOf('ConstraintViolationException') > 1) {
            Swal.fire(
              'Cuidado',
              'No se ha podido realizar el comentario',
              'error'
            );
          }
        }
      });
  }
}