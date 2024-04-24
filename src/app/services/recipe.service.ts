import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "../shared/models/recipes.model";
import { sample_recipes } from "../data";


@Injectable({providedIn:"root"})
export class RecipeService {
    private recipesChanged = new Subject<Recipe[]>

    private recipes: Recipe[] = sample_recipes;


    getRecipes(){
        return this.recipes.slice();
    }
}