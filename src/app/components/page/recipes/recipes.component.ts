import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipes.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl:'./recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit,OnDestroy{ 

  constructor(private recipeService: RecipeService,private activeRoute: ActivatedRoute){}

  recipes: Recipe[] = [];
  recipesShownNumber: number = 4;
  routeSubscription: Subscription;

  ngOnInit(){

    this.routeSubscription = this.activeRoute.params.subscribe( param => {
      this.recipesShownNumber = 4;
      if(param.tag){
        this.recipes = this.recipeService.getRecipesByTag(param.tag)
      }else if(param.search || param.search === ""){
        this.recipes = this.recipeService.getRecipesBySearch(param.search)    
      }else{
        this.recipes = this.recipeService.getRecipes();
      }
    })
  }

  onShowMoreRecipes(){
    this.recipesShownNumber += 4;
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  storeRecipes(){
    this.recipeService.storeRecipes();
  }

  calculateAverageRating(ratings: number[]){
    console.log("lets see");
    if(ratings.length === 1){
      return ratings[0];
    }
    return Math.round((ratings.reduce( (acc,current) => acc + current,0)) / ratings.length);
  }


}
