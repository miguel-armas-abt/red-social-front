import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout():void{
    this.authService.logout();
    Swal.fire('Logout',`Hola ${this.authService.usuario.name}, has cerrado sesion con exito`, 'success');
    this.router.navigate(['/login']);

  }
}
