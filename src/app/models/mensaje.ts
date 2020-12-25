import { Generic } from './generic';
import { Usuario } from './usuario';
export class Mensaje implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    id: string;
    emmiter: Usuario;
    receiver: Usuario;
    text: string;
    created_at: string;
}
