import { Component, Input } from "@angular/core";

@Component({
    selector:"star-rating",
    template:`
    <mat-icon *ngFor="let star of [1, 2, 3, 4, 5]" 
    [ngStyle]="{ 'color': (star <= starRating) ? filledStarColor : starColor }">star</mat-icon>
    `,
    styles:".filled { color: darkred; }"
})

export class StarRatingComponent{

    @Input()
    starRating: number = 0;

    @Input()
    filledStarColor: string = "darkred";

    @Input()
    starColor: string = "black";

}