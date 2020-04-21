import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg;

  id;
  password;

  constructor(private router: Router) { }

   profesor:any = [];

  ngOnInit(): void {
    
  }


  verifyInput(event){
    console.log(this.id)
    console.log(event)
    let s:String = event
    let c = Number.parseInt(s.charAt(s.length-1))
    c++
    setTimeout(() => {
      if(!c)this.id = this.id.substring(0, this.id.length-1)
    }, 50);
  }

  submit(){
    this.errorMsg = null

    if(!this.id){
      this.errorMsg = "Ingrese su ID para continuar"
      return;
    }
    if(!this.password){
      this.errorMsg = "Ingrese su contraseña para continuar"
      return;
    }

    // Obtener el usuario en la BD de ITSON
    this.router.navigate(["home"])
  }
}
