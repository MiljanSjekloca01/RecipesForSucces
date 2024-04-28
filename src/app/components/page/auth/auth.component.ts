import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  constructor(private router:Router){}


  navigateBack(){
    this.router.navigateByUrl("../")
  }

  changeMode(){
    
  }
}
