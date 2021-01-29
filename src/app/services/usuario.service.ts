import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

// la anotacion @Injectable permite inyectar el servicio en los componentes
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CommonService<Usuario>{

  // endpoint de la solicitud
  protected baseEndpoint = 'http://localhost:3800/api/users';

    // constructor
    constructor(http: HttpClient) {
      super(http);
     }
}
