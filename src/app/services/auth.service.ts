import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;
  constructor(private http: HttpClient) { }

  login(user: Usuario): Observable<any> {

    const urlEndpoint = 'http://localhost:3800/api/login';
    return this.http.post<any>(urlEndpoint,user);
    
  }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario')!= null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token')!= null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  guardarToken(accesstoken: string):void{

    let payload = this.obtenerDatosToken(accesstoken);

    this._usuario = new Usuario();
    this._usuario.name = payload.name;
    this._usuario.surname = payload.surname;
    this._usuario.nickname = payload.nickname;
    this._usuario.email = payload.email;
    this._usuario.password = payload.password;
    this._usuario.image = payload.image;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('users',JSON.stringify(this._usuario));
  }

  guardarUsuario(accesstoken: string):void{
    this._token = accesstoken;
    sessionStorage.setItem('token',accesstoken);

  }

  obtenerDatosToken(accesstoken: string): any{
    if(accesstoken != null){
      return JSON.parse(atob(accesstoken.split(".")[1]))
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.obtenerDatosToken(this.token);
    console.log(payload)
    if(payload != null && payload.name && payload.name.length>0){
      return true;
    }
    return false;
  }

  logout(): void{
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
  }
  
}

