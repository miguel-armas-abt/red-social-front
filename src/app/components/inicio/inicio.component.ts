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
  comentario: string;
  userCommentId: string;
  postId: string;

  textoNuevaPublicacion = "";

  panelOpenState = false;

  // las instancias se inyectan mediante constructor
  // PublicacionService para que el componente pueda consumir los servicios de la API /publicaciones
  constructor(
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService,
    private comentarioService: CommentService
    ) { }

  ngOnInit(): void {
    this.refrescarLista();
  }


  onComentar(publicacionCard: PublicacionCard): void {
    this.nuevoComentario = new Comentario();
    this.nuevoComentario.textComment = this.comentario;
    this.nuevoComentario.postId = publicacionCard.publicacion.id;
    this.nuevoComentario.userCommentId = publicacionCard.usuario.id;
    console.log("se está llamando a onComentar: " + this.nuevoComentario.textComment 
    + " \n" + this.nuevoComentario.postId + "\n" + this.nuevoComentario.userCommentId);
    this.comentarioService.crear(this.nuevoComentario).subscribe(comment =>
      {console.log("Nuevo comentario: " + comment);}
    );
  }

  publicar(): void {
    const publicacion = new Publicacion();
    // const idUsuario: string = this.authService.usuario.id;
    const idUsuario: string = "600c913aa09e800248164284"
    publicacion.text = this.textoNuevaPublicacion;
    publicacion.user_id = idUsuario;
    console.log(publicacion);
  
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

  refrescarLista(): void {
    // obtengo las publicaciones de forma reactiva
    this.publicacionService.listar().subscribe(publicaciones => {
       
      publicaciones.forEach(publicacion => {

         let publicacionCard = new PublicacionCard();
         publicacionCard.publicacion = publicacion;

         let usuario = this.usuarioService.obtener(publicacion.user_id)
             .subscribe(usuario => publicacionCard.usuario = usuario);

         let comentarios = this.comentarioService.obtenerPorPublicacion(publicacion.id)
             .subscribe(comentarios => publicacionCard.comentarios = comentarios);

         console.log(publicacionCard);
         this.publicacionesCards.push(publicacionCard);
      });
    });
  }

  comentar(): void {}
}