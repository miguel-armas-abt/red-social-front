import { Generic } from "./generic";
import { Seguidor } from './seguidor';

export class Usuario implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    id: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    roles: string;
    image: string;
    gettoken:boolean=true;
}
