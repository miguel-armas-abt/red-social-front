import { Component, OnInit } from '@angular/core';
import { PublicacionService } from '../../services/publicacion.service';
import { Publicacion } from '../../models/publicacion';
import { PublicacionCard } from '../../models/publicacion-card';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommentService } from '../../services/comment.service';
import { Comentario } from '../../models/comentario';

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


  // las instancias se inyectan mediante constructor
  // PublicacionService para que el componente pueda consumir los servicios de la API /publicaciones
  constructor(
    private publicacionService: PublicacionService,
    private usuarioService: UsuarioService,
    private comentarioService: CommentService
    ) { }

  ngOnInit(): void {
    // toda la comunicacion con el backend se inicializa en el ngOnInit

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

}