import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Comentario } from '../models/comentario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CommonService<Comentario>{

    // endpoint de la solicitud
    protected baseEndpoint = 'http://localhost:3800/api/comments';

  constructor(http: HttpClient) {
    super(http);
   }

   public obtenerPorPublicacion(postId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.baseEndpoint}?postId=${postId}`);
  }
}
