import { Generic } from './generic';
import { Usuario } from './usuario';
export class Publicacion implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    _id: string;
    user_id: string;
    text: string;
    file: string;
    created_at: string;
}
    