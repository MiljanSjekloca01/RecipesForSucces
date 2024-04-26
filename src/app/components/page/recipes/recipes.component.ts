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

  notFoundVisible = false;

  ngOnInit(){
    console.log(this.recipes);
    this.routeSubscription = this.activeRoute.params.subscribe( param => {
      this.recipesShownNumber = 4;
      this.showMoreRecipes = true;
      this.notFoundVisible = false;
      if(param.tag){
        this.recipes = this.recipeService.getRecipesByTag(param.tag)
        if(this.recipes.length === 0){
          //this.notFoundVisible = true;
        }
      }else if(param.search || param.search === ""){
        this.recipes = this.recipeService.getRecipesBySearch(param.search)
        if(this.recipes.length === 0){
        }
      }
      this.visibleRecipes = this.recipes.slice(0,this.recipesShownNumber);
    })
  }

  onShowMoreRecipes(){
    this.recipesShownNumber += 4;
    this.visibleRecipes = this.recipes.slice(0,this.recipesShownNumber)
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }


}
