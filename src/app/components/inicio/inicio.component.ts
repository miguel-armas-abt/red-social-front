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
  comentarios: string[] = [];

  nuevoComentario: Comentario;

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
    this.publicacionesCards = [];
    this.publicacionService.listar().subscribe(publicaciones => {
       
      publicaciones.forEach(publicacion => {

         let publicacionCard = new PublicacionCard();
         publicacionCard.publicacion = publicacion;

         let usuario = this.usuarioService.obtener(publicacion.user_id)
             .subscribe(usuario => publicacionCard.usuario = usuario);

         let comentarios = this.comentarioService.obtenerPorPublicacion(publicacion._id)
             .subscribe(comentarios => {
               let  comments: Comentario[] = [];
               comments = comentarios;
               comments.forEach(comentario => {
                  this.usuarioService.obtener(comentario.userCommentId).subscribe(user => {
                    comentario.userName = user.name;
                  });
               });
               publicacionCard.comentarios = comments;
              });

         this.publicacionesCards.push(publicacionCard);
      });
    });
  }

  publicar(): void {
    const publicacion = new Publicacion();
    const idUsuario: string = this.authService.obtenerIdUsuarioActual();
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
    const idUsuarioComment: string = this.authService.obtenerIdUsuarioActual();
    console.log(idUsuario);
    console.log(idPublicacion);

    nuevoComentario.postId = idPublicacion;
    nuevoComentario.userCommentId = idUsuarioComment;
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