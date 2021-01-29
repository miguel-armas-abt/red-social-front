import { Generic } from "./generic";
import { Seguidor } from './seguidor';

export class Usuario {

    // los atributos se mapean del json
    // mismos atributos que en el backend

    _id: string;
    name: string;
    surname: string;
    nickname: string;
    email: string;
    password: string;
    roles: string;
    image: string;
    sub: string;
    gettoken:boolean=true;
}
