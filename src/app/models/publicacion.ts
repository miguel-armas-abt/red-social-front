import { Generic } from './generic';
import { Usuario } from './usuario';
export class Publicacion implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    id: string;
    user: Usuario;
    text: string;
    file: string;
    created_at: string;
}
