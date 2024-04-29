import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  authMode: string = "login" || "register";



  constructor(private router:Router,activeRoute: ActivatedRoute){
    if(activeRoute.snapshot.url[1].path === "login"){
      this.authMode = "login";
    }else this.authMode = "register";
  }


  onSubmit(form: NgForm){
    if(form.valid){
      console.log(form.value);
      const email = form.value.email;
      const password = form.value.password;
      if(this.authMode === "login"){

      }else if(this.authMode ==="register"){
        const firstName = form.value.firstName;
        const lastName = form.value.lastName;
      }

    }else return
  }


  navigateBack(){
    this.router.navigateByUrl("../")
  }

  changeAuthMode(){
    this.authMode = this.authMode === "login" ? "register" : "login"
    this.router.navigateByUrl("/auth/" + this.authMode)
  }
}
