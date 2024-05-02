import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipes.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe;
  clickedStarIndex: number;
  ratingText: string;
  comment: string = "";

  constructor(activedRoute: ActivatedRoute,private recipeService: RecipeService){
    activedRoute.params.subscribe( param => {
      if(param.id){
        this.recipe = this.recipeService.getRecipeById(param.id);
      }
    })
  }

  ngOnInit(){
    console.log(this.recipe);
  }

  onSubmit(rating: number,comment: string){
    if(rating && comment){
      this.recipeService.createComment(this.recipe.id,rating,comment);
    }else if(rating && !comment){
      console.log("Samo rating");
    }else{
      console.log("Samo komentar");
    }

    //doraditi
    this.clickedStarIndex = 0;
    this.comment = "";
  }
  
  onStarClicked(star:number){
    this.clickedStarIndex = star;
   const ratingTexts = {
    1: "Bad recipe !",
    2: "Didn't like it",
    3: "It was good",
    4: "Great recipe",
    5: "Loved it !"
  };
  this.ratingText = ratingTexts[star];
  }





}
