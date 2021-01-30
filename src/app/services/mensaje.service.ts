import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Mensaje } from '../models/mensaje';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService extends CommonService<Mensaje>{

  protected baseEndpoint = 'http://localhost:3800/api/messages';

  constructor(http: HttpClient) { 
    super(http);
  }

  // GET: /messages/{idEmitterUser}/sent/{idReceiverUser}
  public obtenerMensajesEnviados(idEmitterUser: string, idReceiverUser: string ): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.baseEndpoint}/${idEmitterUser}/sent/${idReceiverUser}`);
  }

    // GET: /messages/{idReceiverUser}/received/{idEmitterUser}
    public obtenerMensajesRecibidos(idEmitterUser: string, idReceiverUser: string ): Observable<Mensaje[]> {
      return this.http.get<Mensaje[]>(`${this.baseEndpoint}/${idReceiverUser}/received/${idEmitterUser}`);
    }
}
