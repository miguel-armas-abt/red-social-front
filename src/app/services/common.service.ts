import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { map } from 'rxjs/operators';
import { Generic } from '../models/generic';
import { AuthService } from './auth.service';

// no es necesario el inyectable, ya que es una clase de la que se va a extender
// M representa es un generico de modelo
export abstract class CommonService<M extends Generic> {

  // endpoint de la solicitud
  protected baseEndpoint: string;

  // cabecera de la solicitud
  protected cabeceras: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // las instancias se inyectan mediante constructor
  // HttpClientModule para que el servicio pueda consumir solicitudes HTTP REST
  constructor(protected http: HttpClient) { }

  public listar(): Observable<M[]> {
    // opcion 1: casteo el objeto json a un objeto M[]
     return this.http.get<M[]>(this.baseEndpoint);

    // opcion 2: mapeo el flujo de datos json a un tipo M[]
    /*return this.http.get(this.baseEndpoint).pipe(
      map(models => models as M[])
    );*/
  }

  public obtener(id: string): Observable<M> {
    return this.http.get<M>(`${this.baseEndpoint}/${id}`)
  }

  public crear(model: M): Observable<M> {
    return this.http.post<M>(
      this.baseEndpoint,
      model,
      {headers: this.cabeceras}
    );
  }

  public editar(model: M): Observable<M> {
    return this.http.put<M>(
      `${this.baseEndpoint}/${model._id}`,
      model,
      {headers: this.cabeceras}
    );
  }

}