import { Usuario } from './usuario';
import { Publicacion } from './publicacion';
import { Generic } from './generic';
export class Comentario implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    _id: string;
    textComment: string;
    commentDate: string;
    userCommentId: string;
    postId: string;
}
