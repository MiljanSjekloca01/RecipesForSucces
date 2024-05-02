import { Component, Input } from "@angular/core";

@Component({
    selector:"star-rating",
    template:`
    <mat-icon *ngFor="let star of [1, 2, 3, 4, 5]" 
    [ngClass]="{ 'filled': star <= starRating }">star</mat-icon>
    `,
    styles:".filled { color: darkred; }"
})

export class StarRatingComponent{

    @Input()
    starRating: number = 0;
}