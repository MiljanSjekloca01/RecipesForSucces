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

  recipes: Recipe[] = this.recipeService.getRecipes();
  recipesShownNumber: number = 4;
  visibleRecipes = this.recipes.slice(0,this.recipesShownNumber);
  showMoreRecipes = true;
  routeSubscription: Subscription

  ngOnInit(){
    console.log(this.recipes);
    this.routeSubscription = this.activeRoute.params.subscribe( param => {
      this.recipesShownNumber = 4;
      this.showMoreRecipes = true;
      if(param.tag){
        this.recipes = this.recipeService.getRecipesByTag(param.tag)
      }else if(param.search || param.search === ""){
        this.recipes = this.recipeService.getRecipesBySearch(param.search)
      }
      this.visibleRecipes = this.recipes.slice(0,this.recipesShownNumber);
      this.shouldMoreRecipesButtonBeDisplayed();
    })
  }

  onShowMoreRecipes(){
    this.recipesShownNumber += 4;
    this.visibleRecipes = this.recipes.slice(0,this.recipesShownNumber)
    this.shouldMoreRecipesButtonBeDisplayed()
  }

  shouldMoreRecipesButtonBeDisplayed(){
    if(this.recipes.length <= this.recipesShownNumber){
      this.showMoreRecipes = false;
    }
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }


}
