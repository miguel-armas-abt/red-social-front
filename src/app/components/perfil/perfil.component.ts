import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Publicacion } from '../../models/publicacion';
import { Comentario } from '../../models/comentario';
import { PublicacionService } from '../../services/publicacion.service';
import { CommentService } from '../../services/comment.service';
import { PublicacionCard } from '../../models/publicacion-card';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuarioActual: Usuario;
  publicaciones: Publicacion[] = [];
  comentarios: string[] = [];
  publicacionesCards: PublicacionCard[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private publicacionService :PublicacionService,
    private comentarioService: CommentService,
    private authService: AuthService) { }

  ngOnInit(): void {
    const usuarioActualId = this.authService.obtenerIdUsuarioActual();

    this.usuarioService.obtener(usuarioActualId).subscribe(usuario => {
      this.usuarioActual = usuario;
    });

    this.publicacionService.obtenerPorUsuario(usuarioActualId).subscribe(publicaciones => {
      publicaciones.forEach(publicacion => {
         let publicacionCard = new PublicacionCard();
         publicacionCard.publicacion = publicacion;

         let comentarios = this.comentarioService.obtenerPorPublicacion(publicacion._id)
             .subscribe(comentarios => publicacionCard.comentarios = comentarios);

         this.publicacionesCards.push(publicacionCard);
      });
    });
    console.log(this.publicacionesCards);
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
      // this.refrescarLista();
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
