import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipes.model';

@Component({
  selector: 'app-recipes',
  templateUrl:'./recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit{ 

  constructor(private recipeService: RecipeService){}

  recipes: Recipe[] = this.recipeService.getRecipes();
  recipesShownNumber: number = 4;
  visibleRecipes = this.recipes.slice(0,this.recipesShownNumber);

  ngOnInit(){
    console.log(this.recipes);
  }

  showMoreRecipes(){
    this.recipesShownNumber += 4;
    this.visibleRecipes = this.recipes.slice(0,this.recipesShownNumber)
  }
}
