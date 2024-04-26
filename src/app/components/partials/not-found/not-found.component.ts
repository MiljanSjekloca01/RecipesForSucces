import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(private router: Router){}

  @Input()
  imageUrl: string = "https://cdni.iconscout.com/illustration/premium/thumb/not-found-7621869-6167023.png?f=webp"
  
  @Input()
  title: string = "Not Found";

  @Input()
  visible: boolean = false;

  navigateBack(){
    this.router.navigate(["../"])
  }

}
