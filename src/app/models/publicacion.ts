import { Generic } from './generic';
import { Usuario } from './usuario';
import { Comentario } from './comentario';
import { Reaccion } from './reaccion';
export class Publicacion implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    id: string;
    user: Usuario;
    text: string;
    file: string;
    comentarios: Comentario[];
    reacciones: Reaccion[];
    created_at: string;
}
    