import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario : Usuario;
  constructor( private auth:AuthService, private router:Router) { 
    this.usuario= new Usuario();
  }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      console.log("eee",this.auth.isAuthenticated())
      Swal.fire('Login',`Hola ${this.auth.usuario.name} ya estas autenticado`,'info');
      this.router.navigate(['/appmodule2']);
    }
  }

  login(){
    console.log(this.usuario)
    if(this.usuario.email==null||this.usuario.password==null){
      Swal.fire('Error login', 'Usuario o contraseña vacias!', 'error');
      return;
    }
    this.auth.login(this.usuario).subscribe(
      res=>{
        console.log(res)
        // localStorage.setItem('token',res.token)
        this.auth.guardarToken(res.token);
        this.auth.guardarUsuario(res.token);
        this.router.navigate(['/appmodule2'])
      },
        err=>{
        if(err.status == 404 ){
          Swal.fire('Error Login', 'Usuario o contraseña incorrectas', 'error')
        }
      }
    )
  }
}
