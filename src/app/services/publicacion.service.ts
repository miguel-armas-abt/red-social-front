import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publicacion } from '../models/publicacion';

import { map } from 'rxjs/operators';
import { CommonService } from './common.service';

// la anotacion @Injectable permite inyectar el servicio en los componentes
@Injectable({
  providedIn: 'root'
})
export class PublicacionService extends CommonService<Publicacion>{

  // endpoint de la solicitud
  protected baseEndpoint = 'http://localhost:3800/api/publicaciones';

  // constructor
  constructor(http: HttpClient) {
    super(http);
   }

}