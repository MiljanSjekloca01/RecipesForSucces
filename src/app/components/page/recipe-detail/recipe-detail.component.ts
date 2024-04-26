import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipes.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipeId: string;
  recipe: Recipe;

  constructor(activedRoute: ActivatedRoute,private recipeService: RecipeService){
    activedRoute.params.subscribe( param => {
      if(param.id){
        this.recipeId = param.id
      }
    })
  }

  ngOnInit(){
    this.recipe = this.recipeService.getRecipeById(this.recipeId);
    console.log(this.recipe);
  }



}
