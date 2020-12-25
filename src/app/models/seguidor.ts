import { Generic } from './generic';
import { Usuario } from './usuario';
export class Seguidor implements Generic{
    
    // los atributos se mapean del json
    // mismos atributos que en el backend
    
    id: string;
    user: Usuario;
    followed: Usuario;
}
