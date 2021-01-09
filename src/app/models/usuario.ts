import { Generic } from "./generic";
import { Seguidor } from './seguidor';

export class Usuario implements Generic{

    // los atributos se mapean del json
    // mismos atributos que en el backend

    id: string;
    name: string;
    surname: string;
    nick: string;
    email: string;
    password: string;
    rol: string;
    image: string;
}
